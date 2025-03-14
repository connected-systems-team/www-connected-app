'use client'; // This service uses client-only features

// Dependencies - Types
import { WebSocketEvent } from '@structure/source/api/web-sockets/types/WebSocketMessage';
import { WebSocketHook } from '@project/source/modules/connected/types/FlowTypes';
import {
    PortScanInput,
    PortScanResult,
    PortScanStatusUpdate,
    PortState,
} from '@project/source/modules/connected/types/PortTypes';

// Dependencies - API
import { ApolloClient } from '@apollo/client';
import { PortScanCreateDocument } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - Services
import { WebSocketHandler } from './WebSocketHandler';
import { StepProcessor } from './StepProcessor';
import { FlowProcessor } from './FlowProcessor';
import { PollingService } from './PollingService';

// Dependencies - Utilities
import { getPortStateDescription } from '@project/source/modules/connected/utilities/PortUtilities';

// PortCheckerService configuration interface
export interface PortCheckerServiceOptions {
    apolloClient: ApolloClient<object>;
    webSocket: WebSocketHook;
    onStatusUpdate?: (update: PortScanStatusUpdate) => void;
    onResult?: (result: PortScanResult) => void;
    pollingInterval?: number;
}

/**
 * Service for managing port checking functionality with robust WebSocket and fallback polling support
 */
export class PortCheckerService {
    private apolloClient: ApolloClient<object>;
    private webSocket: WebSocketHook;
    private onStatusUpdate: (update: PortScanStatusUpdate) => void;
    private onResult: (result: PortScanResult) => void;
    private pollingInterval: number;

    // State references
    private currentExecutionId: string | undefined;
    private isActive: boolean = false;
    private usingFallbackPolling: boolean = false;
    private lastWebSocketMessageTime: number = 0;

    // Timeouts and intervals
    private webSocketTimeoutId: NodeJS.Timeout | undefined;
    private globalTimeoutId: NodeJS.Timeout | undefined; // Global timeout for the entire request
    private messageHandler: (() => void) | undefined;

    // Service modules
    private webSocketHandler: WebSocketHandler;
    private stepProcessor: StepProcessor;
    private flowProcessor: FlowProcessor;
    private pollingService: PollingService;

    // Input data reference for error recovery
    private lastScanInput: PortScanInput | null = null;

    constructor(options: PortCheckerServiceOptions) {
        this.apolloClient = options.apolloClient;
        this.webSocket = options.webSocket;
        this.onStatusUpdate = options.onStatusUpdate || (() => {});
        this.onResult = options.onResult || (() => {});
        this.pollingInterval = options.pollingInterval || 2000;

        // Initialize service modules
        this.stepProcessor = new StepProcessor(this.onStatusUpdate, this.onResult);

        this.flowProcessor = new FlowProcessor(this.onStatusUpdate, this.onResult, this.stepProcessor);

        this.pollingService = new PollingService(
            this.apolloClient,
            this.onStatusUpdate,
            this.flowProcessor,
            this.stepProcessor,
            this.pollingInterval,
        );

        this.webSocketHandler = new WebSocketHandler(
            (update) => {
                // Process status update

                // Check if this is a final error message for recovery
                if(update.type === 'error' && update.isFinal) {
                    // If we have last scan input, generate a system error result
                    if(this.lastScanInput) {
                        // Cancel the global timeout to prevent additional messages
                        if(this.globalTimeoutId) {
                            clearTimeout(this.globalTimeoutId);
                            this.globalTimeoutId = undefined;
                        }

                        // Check for host resolution errors
                        const isHostResolutionError =
                            update.message &&
                            (update.message.includes('Failed to resolve host') ||
                                update.message.includes('hostname could not be found'));

                        // Process final error update

                        this.onResult({
                            host: this.lastScanInput.host,
                            port: this.lastScanInput.port,
                            state: 'unknown',
                            region: this.lastScanInput.region,
                            timestamp: new Date(),
                            executionId: this.currentExecutionId,
                            systemError: true,
                            // Include the error message for host resolution errors
                            errorMessage: isHostResolutionError ? 'Failed to resolve host.' : undefined,
                        });
                    }
                }

                // Pass the update to the parent handler
                this.onStatusUpdate(update);
            },
            (stepExecution) => {
                console.log('WebSocketHandler: Processing step execution', {
                    stepId: stepExecution.stepId,
                    status: stepExecution.status,
                    actionType: stepExecution.actionType,
                    hasOutput: !!stepExecution.output,
                    output:
                        stepExecution.output && typeof stepExecution.output === 'object'
                            ? JSON.stringify(stepExecution.output)
                            : stepExecution.output,
                });

                const isComplete = this.stepProcessor.processStepExecution(stepExecution);
                console.log('WebSocketHandler: Step execution complete?', isComplete);

                if(isComplete) {
                    console.log('WebSocketHandler: Stopping port check');
                    this.stopChecking();
                }
            },
            () => this.pollPortScan(),
        );

        // Add WebSocket message handler
        this.setupWebSocketHandler();
    }

    /**
     * Set up the WebSocket message handler
     */
    private setupWebSocketHandler(): void {
        if(this.messageHandler) {
            // Remove existing handler if present
            this.messageHandler();
        }

        this.messageHandler = this.webSocket.addMessageHandler((event: WebSocketEvent) => {
            // If we're using fallback polling but received a WebSocket message, stop polling
            if(this.handleWebSocketMessage(event) && this.usingFallbackPolling) {
                this.usingFallbackPolling = false;
                this.pollingService.cleanup();
            }
        });
    }

    /**
     * Handle WebSocket messages
     */
    private handleWebSocketMessage(event: WebSocketEvent): boolean {
        if(!this.isActive || !this.currentExecutionId) {
            return false;
        }

        const wasProcessed = this.webSocketHandler.handleWebSocketMessage(event, this.currentExecutionId);

        if(wasProcessed) {
            // Update last message time
            this.lastWebSocketMessageTime = Date.now();
        }

        return wasProcessed;
    }

    /**
     * Poll for port scan results using GraphQL
     */
    private pollPortScan(): void {
        console.log('PortCheckerService: Starting polling', {
            executionId: this.currentExecutionId,
            isActive: this.isActive,
        });
        this.pollingService
            .pollPortScan(this.currentExecutionId, this.isActive)
            .then((isComplete) => {
                console.log('PortCheckerService: Polling returned', { isComplete });
                if(isComplete) {
                    // If polling detected a complete state, stop the port checker
                    console.log('PortCheckerService: Polling completed, stopping port check');
                    this.stopChecking();
                }
            })
            .catch((error) => {
                console.error('PortCheckerService: Error in polling', error);
            });
    }

    /**
     * Clean up all timeouts and intervals
     */
    private cleanupTimeouts(): void {
        console.log('PortCheckerService: Cleaning up timeouts', {
            hasWebSocketTimeout: !!this.webSocketTimeoutId,
            hasGlobalTimeout: !!this.globalTimeoutId,
            isActive: this.isActive,
        });

        if(this.webSocketTimeoutId) {
            clearInterval(this.webSocketTimeoutId);
            this.webSocketTimeoutId = undefined;
        }

        if(this.globalTimeoutId) {
            clearTimeout(this.globalTimeoutId);
            this.globalTimeoutId = undefined;
        }

        this.pollingService.cleanup();
        this.usingFallbackPolling = false;
    }

    /**
     * Start checking a port
     */
    public async checkPort(input: PortScanInput): Promise<void> {
        // Store input for error recovery
        this.lastScanInput = { ...input };

        // Reset state
        this.cleanupTimeouts();
        this.currentExecutionId = undefined;
        this.isActive = true;
        this.usingFallbackPolling = false;
        this.lastWebSocketMessageTime = Date.now();

        // Update processors with execution ID
        this.stepProcessor.setExecutionId(undefined);
        this.flowProcessor.setExecutionId(undefined);

        // No need for initial status update as we now set it in the PortChecker component

        // Set up global timeout for the entire request (15 seconds)
        this.globalTimeoutId = setTimeout(() => {
            console.log('PortCheckerService: Global timeout triggered', {
                isActive: this.isActive,
                executionId: this.currentExecutionId,
                hasInput: !!this.lastScanInput,
                inputHost: this.lastScanInput?.host,
                inputPort: this.lastScanInput?.port,
            });

            // Only trigger timeout if we're still active
            if(this.isActive) {
                // Send timeout result
                if(this.lastScanInput) {
                    console.log('PortCheckerService: Sending timeout result');
                    this.onResult({
                        host: this.lastScanInput.host,
                        port: this.lastScanInput.port,
                        state: 'unknown',
                        region: this.lastScanInput.region,
                        timestamp: new Date(),
                        executionId: this.currentExecutionId,
                        timeout: true,
                    });
                }

                // Clean up and stop
                this.stopChecking();
            }
            else {
                console.log('PortCheckerService: Not sending timeout result - service not active');
            }
        }, 15000); // 15 second timeout

        try {
            // Create port scan via GraphQL
            const result = await this.apolloClient.mutate({
                mutation: PortScanCreateDocument,
                variables: {
                    input: {
                        host: input.host,
                        ports: [input.port.toString()],
                        region: input.region,
                    },
                },
            });

            // Check for GraphQL errors
            if(result.errors && result.errors.length > 0 && result.errors[0]) {
                // Extract the error message from the first error
                const errorMessage = result.errors[0].message || 'Failed to create port scan';

                // Cancel the global timeout to prevent additional messages
                if(this.globalTimeoutId) {
                    clearTimeout(this.globalTimeoutId);
                    this.globalTimeoutId = undefined;
                }

                // Send the error as a result
                this.onResult({
                    host: input.host,
                    port: input.port,
                    state: 'unknown',
                    region: input.region,
                    timestamp: new Date(),
                    systemError: true,
                    errorMessage: errorMessage,
                });

                // Clean up and stop
                this.stopChecking();
                return;
            }

            // Set execution ID
            this.currentExecutionId = result.data?.portScanCreate;

            if(!this.currentExecutionId) {
                throw new Error('No execution ID received from mutation');
            }

            // Update processors with execution ID
            this.stepProcessor.setExecutionId(this.currentExecutionId);
            this.flowProcessor.setExecutionId(this.currentExecutionId);

            // Set up WebSocket timeout to switch to polling if needed
            this.setupWebSocketTimeout();

            // Start polling immediately if WebSocket is not connected
            if(!this.webSocket.isConnected) {
                this.usingFallbackPolling = true;
                // Skip status update for backup connection method
                // We want to keep the UI clean with just initial message and final result
                this.pollPortScan();
            }

            // Reset last message time
            this.lastWebSocketMessageTime = Date.now();
        }
        catch(error) {
            // Cancel the global timeout to prevent additional messages
            if(this.globalTimeoutId) {
                clearTimeout(this.globalTimeoutId);
                this.globalTimeoutId = undefined;
            }

            // Handle critical errors
            this.onStatusUpdate({
                message: 'Failed to start port check',
                isFinal: true,
                timestamp: new Date(),
                type: 'error',
            });
            this.stopChecking();
        }
    }

    /**
     * Set up the WebSocket timeout to monitor for inactivity
     */
    private setupWebSocketTimeout(): void {
        this.webSocketTimeoutId = setInterval(() => {
            const now = Date.now();
            const timeSinceLastMessage = now - this.lastWebSocketMessageTime;

            // If we haven't received a message in 5 seconds, start polling
            if(timeSinceLastMessage >= 5000 && this.isActive && this.currentExecutionId && !this.usingFallbackPolling) {
                clearInterval(this.webSocketTimeoutId);
                this.usingFallbackPolling = true;
                this.pollPortScan();
            }
        }, 1000);
    }

    /**
     * Stop checking and clean up resources
     */
    public stopChecking(): void {
        console.log('PortCheckerService: Stopping port check', {
            isActive: this.isActive,
            executionId: this.currentExecutionId,
            usingFallbackPolling: this.usingFallbackPolling,
        });

        this.cleanupTimeouts();
        this.isActive = false;
        this.currentExecutionId = undefined;
        // Don't clear lastScanInput as we might need it for error recovery
    }

    /**
     * Get a user-friendly description for a port state
     */
    public static getPortStateDescription(state: PortState): string {
        return getPortStateDescription(state);
    }

    /**
     * Cleanup resources when the service is no longer needed
     */
    public dispose(): void {
        this.stopChecking();
        if(this.messageHandler) {
            this.messageHandler();
            this.messageHandler = undefined;
        }

        // Clear scan input when fully disposing the service
        this.lastScanInput = null;
    }
}

// Export - Default
export default PortCheckerService;
