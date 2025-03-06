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
    private pendingResults: Set<string> = new Set(); // Track regions we're waiting for

    // Timeouts and intervals
    private webSocketTimeoutId: NodeJS.Timeout | undefined;
    private messageHandler: (() => void) | undefined;

    // Service modules
    private webSocketHandler: WebSocketHandler;
    private stepProcessor: StepProcessor;
    private flowProcessor: FlowProcessor;
    private pollingService: PollingService;

    constructor(options: PortCheckerServiceOptions) {
        this.apolloClient = options.apolloClient;
        this.webSocket = options.webSocket;
        this.onStatusUpdate = options.onStatusUpdate || (() => {});
        this.onResult = options.onResult || (() => {});
        this.pollingInterval = options.pollingInterval || 2000;

        // Initialize service modules
        this.stepProcessor = new StepProcessor(this.onStatusUpdate, this.onResult, this.pendingResults);

        this.flowProcessor = new FlowProcessor(
            this.onStatusUpdate,
            this.onResult,
            this.stepProcessor,
            this.pendingResults,
        );

        this.pollingService = new PollingService(
            this.apolloClient,
            this.onStatusUpdate,
            this.flowProcessor,
            this.stepProcessor,
            this.pollingInterval,
        );

        this.webSocketHandler = new WebSocketHandler(
            this.onStatusUpdate,
            (stepExecution) => {
                const isComplete = this.stepProcessor.processStepExecution(stepExecution);
                if(isComplete) {
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
        this.pollingService.pollPortScan(this.currentExecutionId, this.isActive);
    }

    /**
     * Clean up all timeouts and intervals
     */
    private cleanupTimeouts(): void {
        if(this.webSocketTimeoutId) {
            clearInterval(this.webSocketTimeoutId);
            this.webSocketTimeoutId = undefined;
        }

        this.pollingService.cleanup();
        this.usingFallbackPolling = false;
    }

    /**
     * Start checking a port
     */
    public async checkPort(input: PortScanInput): Promise<void> {
        // Reset state
        this.cleanupTimeouts();
        this.currentExecutionId = undefined;
        this.isActive = true;
        this.usingFallbackPolling = false;
        this.lastWebSocketMessageTime = Date.now();
        this.pendingResults.clear();
        this.pendingResults.add(input.region);

        // Update processors with execution ID
        this.stepProcessor.setExecutionId(undefined);
        this.flowProcessor.setExecutionId(undefined);

        // No need for initial status update as we now set it in the PortChecker component

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
        this.cleanupTimeouts();
        this.isActive = false;
        this.currentExecutionId = undefined;
        this.pendingResults.clear();
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
    }
}

// Export - Default
export default PortCheckerService;
