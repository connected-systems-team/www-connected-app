'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowExecution as FlowExecutionGraphQlInterface,
    FlowStepExecution as FlowStepExecutionGraphQlInterface,
    FlowStepExecutionStatus as FlowStepExecutionStatusGraphQlType,
} from '@project/source/api/GraphQlGeneratedCode';
import {
    WebSocketViaSharedWorkerContextInterface,
    WebSocketMessageEventInterface,
} from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Services
import { FlowWebSocketService } from '@project/source/modules/flow/services/FlowWebSocketService';
import { FlowPollingService } from '@project/source/modules/flow/services/FlowPollingService';

// Dependencies - Utilities
import {
    isFlowWebSocketEventMessage,
    isFlowExecutionWebSocketMessage,
    isFlowStepExecutionWebSocketMessage,
} from '@project/source/modules/flow/services/utilities/FlowWebSocketServiceUtilities';

// Type - FlowServiceStatusType (extends from FlowExecutionStatus in GraphQL)
// The status of the flow service, used to track the state of the flow execution
export enum FlowServiceStatusType {
    NotStarted = 'NotStarted',
    Starting = 'Starting',
    Running = 'Running',
    Success = 'Success',
    Failed = 'Failed',
    Canceled = 'Canceled',
    TimedOut = 'TimedOut',
}

// Server Type - FlowExecutionErrorInterface
export interface FlowExecutionErrorInterface {
    code?: string;
    name?: string;
    message: string;
    createdAt: Date;
}

// Server Type - FlowStepExecutionErrorInterface
export interface FlowStepExecutionErrorInterface extends FlowExecutionErrorInterface {}

// Type - FlowInputValidationResultInterface
// Standard validation result interface for flow services
export interface FlowInputValidationResultInterface {
    isValid: boolean;
    error?: {
        code: string;
        message: string;
    };
}

// Type - FlowServiceErrors
// Standard error definitions for flow services
export const FlowServiceErrors = {
    // General flow errors
    FlowCanceled: {
        code: 'FlowCanceled',
        message: 'Flow execution was canceled.',
    },
    FlowTimedOut: {
        code: 'FlowTimedOut',
        message: 'Flow execution timed out.',
    },
    FlowError: {
        code: 'FlowError',
        message: 'An error occurred during flow execution.',
    },

    // Communication errors
    WebSocketError: {
        code: 'WebSocketError',
        message: 'WebSocket communication error.',
    },
    PollingError: {
        code: 'PollingError',
        message: 'Error polling for flow updates.',
    },
    NetworkConnectionError: {
        code: 'NetworkConnectionError',
        message: 'Network connection error. Please check your Internet connection.',
    },

    // API errors
    ApiError: {
        code: 'ApiError',
        message: 'API request failed.',
    },
    GraphQlError: {
        code: 'GraphQlError',
        message: 'GraphQL query failed.',
    },

    // Execution errors
    ExecutionFailed: {
        code: 'ExecutionFailed',
        message: 'Flow execution failed.',
    },
    StepExecutionFailed: {
        code: 'StepExecutionFailed',
        message: 'Flow step execution failed.',
    },

    // Validation errors
    ValidationError: {
        code: 'ValidationError',
        message: 'Input validation failed.',
    },
} as const;

// Type - FlowServiceEventHandlersInterface
export interface FlowServiceEventHandlersInterface<TFlowInput, TFlowOutput> {
    // Flow Execution events
    onFlowExecutionUpdate?: (flowExecutionResult: FlowExecutionInterface<TFlowInput, TFlowOutput>) => void;
    onFlowExecutionComplete?: (flowExecutionResult: FlowExecutionInterface<TFlowInput, TFlowOutput>) => void;
    onFlowExecutionError?: (
        flowExecutionError: FlowExecutionErrorInterface,
        flowExecution?: FlowExecutionInterface<TFlowInput, TFlowOutput>,
    ) => void;

    // Flow Step Execution events
    onFlowStepExecutionUpdate?: (flowStepExecution: FlowStepExecutionGraphQlInterface) => void;
    onFlowStepExecutionComplete?: (flowStepExecution: FlowStepExecutionGraphQlInterface) => void;
    onFlowStepExecutionError?: (flowStepExecution: FlowStepExecutionGraphQlInterface) => void;
}

// Type - FlowServiceOptionsInterface
export interface FlowServiceOptionsInterface {
    timeoutInMilliseconds?: number;
    pollingIntervalInMilliseconds?: number;
    webSocketInactivityTimeoutInMilliseconds?: number;
    fallbackToPolling?: boolean;
    forcePolling?: boolean; // Force polling and do not use WebSockets
}

// Type - FlowExecutionInterface
// Typed version of the server type FlowExecution
export interface FlowExecutionInterface<TFlowExecutionInput, TFlowExecutionOutput>
    extends FlowExecutionGraphQlInterface {
    input?: TFlowExecutionInput;
    output?: TFlowExecutionOutput;
}

// Type - FlowStepExecutionInterface
// Typed version of the server type FlowExecution
export interface FlowStepExecutionInterface extends FlowStepExecutionGraphQlInterface {
    input?: Record<string, unknown>;
    output?: Record<string, unknown>;
}

// Abstract Class - FlowService
export abstract class FlowService<TFlowInput, TFlowOutput> {
    // Service status and state
    protected input?: TFlowInput;
    protected flowExecutionId?: string;
    protected status: FlowServiceStatusType;
    protected stepResults: Array<FlowStepExecutionInterface>;
    protected lastWebSocketMessageReceivedAt?: Date;

    // Event handlers
    protected eventHandlers: FlowServiceEventHandlersInterface<TFlowInput, TFlowOutput>;

    // Options
    protected fallbackToPolling: boolean;
    protected forcePolling: boolean;
    protected pollingIntervalInMilliseconds: number;
    protected webSocketInactivityTimeoutInMilliseconds: number;
    protected timeoutInMilliseconds: number;

    // Services
    protected webSocketService: FlowWebSocketService;
    protected pollingService: FlowPollingService;

    // Cleanup references
    protected webSocketInactivityTimeout?: NodeJS.Timeout;
    protected timeout?: NodeJS.Timeout;

    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        eventHandlers: FlowServiceEventHandlersInterface<TFlowInput, TFlowOutput>,
        options?: FlowServiceOptionsInterface,
    ) {
        this.status = FlowServiceStatusType.NotStarted;
        this.stepResults = [];

        // Event handlers
        this.eventHandlers = eventHandlers;

        // Options
        this.timeoutInMilliseconds = options?.timeoutInMilliseconds || 20000;
        this.pollingIntervalInMilliseconds = options?.pollingIntervalInMilliseconds || 1250;
        this.webSocketInactivityTimeoutInMilliseconds = options?.webSocketInactivityTimeoutInMilliseconds || 2500;
        this.fallbackToPolling = options?.fallbackToPolling ?? true;
        this.forcePolling = options?.forcePolling ?? false;
        // this.forcePolling = true; // Testing

        // Initialize WebSocket service
        this.webSocketService = new FlowWebSocketService(
            webSocketViaSharedWorker,
            this.handleWebSocketMessage.bind(this),
        );

        // Initialize polling service
        this.pollingService = new FlowPollingService(this.pollingIntervalInMilliseconds, {
            onPollResult: this.processFlowExecution.bind(this),
            onPollError: (error: Error) => this.handleError(error, FlowServiceErrors.PollingError.code),
        });
    }

    // Function to execute a flow with the provided input
    // Handles common flow initialization, state management, and service setup
    public async executeFlow(input: TFlowInput): Promise<void> {
        try {
            // Validate input before proceeding
            const validation = this.validateInput(input);
            if(!validation.isValid && validation.error) {
                // If validation fails, handle the error and don't proceed
                this.handleValidationError(validation.error.code, validation.error.message);
                return;
            }

            // Store the flow input
            this.input = input;

            // Reset state
            this.stepResults = [];
            this.status = FlowServiceStatusType.Starting;

            // Call the concrete implementation to initialize the specific flow
            this.flowExecutionId = await this.createFlowExecution(input);

            // Update status
            this.status = FlowServiceStatusType.Running;

            // Start the services (WebSocket and/or polling)
            this.startServices(this.flowExecutionId);
        }
        catch(error) {
            // Handle initialization error
            this.handleError(
                error instanceof Error ? error : new Error('Unknown error while starting flow execution.'),
                FlowServiceErrors.ExecutionFailed.code,
            );

            // Re-throw to allow implementations to handle specific errors
            throw error;
        }
    }

    // Function that creates a flow execution and returns the flow execution ID
    protected abstract createFlowExecution(input: TFlowInput): Promise<string>;

    // Function to start the WebSocket and polling services
    protected startServices(flowExecutionId: string) {
        // Set execution ID in services

        // If force polling is not enabled, configure the WebSocket service
        if(!this.forcePolling) {
            this.webSocketService.setFlowExecutionId(flowExecutionId);
            this.webSocketService.registerMessageHandler();
        }

        // Set execution ID in polling service
        this.pollingService.setFlowExecutionId(flowExecutionId);

        // Start polling if configured to do so
        const isWebSocketConnected = this.webSocketService.isWebSocketConnected();
        // console.log('[FlowService] WebSocket connected status:', isWebSocketConnected);

        // Use polling if forced, or fallback to polling if WebSocket is not connected
        if(this.forcePolling || (this.fallbackToPolling && !isWebSocketConnected)) {
            console.log('[FlowService] Starting polling service', this.forcePolling ? 'by force' : 'as fallback');
            this.pollingService.startPolling();
        }
        else if(this.fallbackToPolling && isWebSocketConnected) {
            // console.log('[FlowService] Using WebSocket with inactivity fallback');
            this.setupWebSocketInactivityTimeout();
        }
        else {
            console.log('[FlowService] Using WebSocket only, polling not started');
        }

        // Set up timeout monitor
        this.setupTimeoutMonitor(this.timeoutInMilliseconds);
    }

    // Function to setup a timeout for detecting inactive WebSocket connections
    protected setupWebSocketInactivityTimeout() {
        // Clear any existing inactivity timeout
        this.clearWebSocketInactivityTimeout();

        // Set up a timeout to check WebSocket activity
        this.webSocketInactivityTimeout = setTimeout(() => {
            if(!this.lastWebSocketMessageReceivedAt) {
                // Initial case: We haven't received any messages yet
                console.log(
                    `[FlowService] No WebSocket messages received in last ${this.webSocketInactivityTimeoutInMilliseconds}ms, starting polling`,
                );
                this.pollingService.startPolling();
            }
            else {
                const millisecondsSinceLastWebSocketMessage =
                    new Date().getTime() - this.lastWebSocketMessageReceivedAt.getTime();

                // Check if the WebSocket has been inactive for too long
                if(millisecondsSinceLastWebSocketMessage >= this.webSocketInactivityTimeoutInMilliseconds) {
                    console.log(
                        `[FlowService] WebSocket inactive for ${millisecondsSinceLastWebSocketMessage}ms, starting polling as fallback`,
                    );
                    this.pollingService.startPolling();
                }
                // Activity detected, set another timeout to keep monitoring
                else {
                    this.setupWebSocketInactivityTimeout();
                }
            }
        }, this.webSocketInactivityTimeoutInMilliseconds);
    }

    // Function to clear the WebSocket inactivity timeout
    protected clearWebSocketInactivityTimeout() {
        if(this.webSocketInactivityTimeout) {
            clearTimeout(this.webSocketInactivityTimeout);
            this.webSocketInactivityTimeout = undefined;
        }
    }

    // Function to setup a timeout monitor to automatically fail the flow after a specified time
    protected setupTimeoutMonitor(timeoutInMilliseconds: number) {
        // Clear any existing timeout
        this.clearTimeoutMonitor();

        // Set up new timeout
        this.timeout = setTimeout(() => {
            // Only process timeout if we're still active
            if(this.status === FlowServiceStatusType.Running || this.status === FlowServiceStatusType.Starting) {
                // Update status
                this.status = FlowServiceStatusType.TimedOut;

                // Clean up resources
                this.cleanupFlowResources();

                // Optionally, call the error handler - only with error, no flow execution
                this.eventHandlers.onFlowExecutionError?.({
                    message: FlowServiceErrors.FlowTimedOut.message,
                    code: FlowServiceErrors.FlowTimedOut.code,
                    createdAt: new Date(),
                });
            }
        }, timeoutInMilliseconds);
    }

    // Function to handle a WebSocket message
    private handleWebSocketMessage(event: WebSocketMessageEventInterface): boolean {
        // console.log('FlowService.ts(handleWebSocketMessage) WebSocket message received', event);

        try {
            // Use the new event message type guard for cleaner code
            if(isFlowWebSocketEventMessage(event)) {
                // console.log('isFlowWebSocketEventMessage', event);
                let isForCurrentFlow = false;

                // Handle Flow execution message
                if(isFlowExecutionWebSocketMessage(event.data)) {
                    // console.log('isFlowExecutionWebSocketMessage', event.data);
                    const flowExecution = event.data.arguments[0];

                    // Make sure the flow execution ID matches
                    // This is important to avoid processing messages from other flows
                    // console.log('Flow execution ID', this.flowExecutionId, 'vs', flowExecution.id);
                    if(this.flowExecutionId === flowExecution.id) {
                        this.processFlowExecution(flowExecution);
                        isForCurrentFlow = true;
                    }
                }

                // Handle Flow step execution message
                if(isFlowStepExecutionWebSocketMessage(event.data)) {
                    const flowStepExecution = event.data.arguments[0];

                    // Check if this step belongs to our flow execution
                    if(this.flowExecutionId === flowStepExecution.flowExecutionId) {
                        isForCurrentFlow = true;

                        // Ignore step executions if the flow is already complete
                        if(this.isInTerminalState()) {
                            return false;
                        }

                        // Process the step if we should
                        if(this.shouldProcessFlowStep(flowStepExecution)) {
                            this.processFlowStepExecution(flowStepExecution);
                        }
                    }
                }

                // If this message is for our flow, update the timestamp and handle polling
                if(isForCurrentFlow) {
                    // Update timestamp of last received message
                    this.lastWebSocketMessageReceivedAt = new Date();

                    // If polling is active, stop it since WebSocket is working
                    if(this.pollingService && this.pollingService.isPolling()) {
                        console.log('[FlowService] Received WebSocket message, stopping active polling');
                        this.pollingService.stopPolling();
                    }

                    // Reset WebSocket inactivity timeout since we received a message
                    // Only reset the timeout if we are not in a terminal state
                    if(!this.isInTerminalState()) {
                        this.setupWebSocketInactivityTimeout();
                    }

                    return true;
                }
            }
        }
        catch(error) {
            console.error('Error handling WebSocket message', error);
        }

        return false;
    }

    // Function to process a flow execution
    protected processFlowExecution(flowExecution: FlowExecutionGraphQlInterface): void {
        // console.log('[FlowService].processFlowExecution() flowExecution.output', flowExecution.output);

        // Check if we've already completed this flow (in a terminal state)
        if(this.isInTerminalState()) {
            console.warn(
                `[FlowService] Already completed flow with status: ${this.status}, ignoring duplicate completion (a poll or WebSocket result came in right after another)`,
            );
            return;
        }

        // Update the flow status
        this.status = flowExecution.status as unknown as FlowServiceStatusType;

        // Process all step executions
        this.processFlowStepExecutions(flowExecution);

        // If the flow is in a terminal state complete, finish processing
        if(this.isInTerminalState()) {
            // Clean up resources (this will stop polling and WebSockets)
            this.cleanupFlowResources();

            // Check if we're processing a Success status
            if(this.status === FlowServiceStatusType.Success) {
                // Get a typed version of the flow execution
                const typedFlowExecution = this.createTypedFlowExecution(flowExecution);
                // console.log('[FlowService] Calling completion handler with result:', result);

                // Call the completion handler if provided
                this.eventHandlers.onFlowExecutionComplete?.(typedFlowExecution);
            }
            // If the flow is failed, handle the failure
            else if(this.status === FlowServiceStatusType.Failed) {
                // Process failure
                this.handleFlowFailure(flowExecution);
            }
        }
    }

    // Function to process all step executions in a flow
    protected processFlowStepExecutions(flowExecution: FlowExecutionGraphQlInterface): void {
        if(flowExecution.stepExecutions && flowExecution.stepExecutions.length > 0) {
            for(const flowStep of flowExecution.stepExecutions) {
                // Only process steps we care about
                if(this.shouldProcessFlowStep(flowStep)) {
                    this.processFlowStepExecution(flowStep);
                }
            }
        }
    }

    // Function to stop the currently executing flow
    public stopExecution() {
        // If the flow is already not started or in a terminal state, do nothing
        if(this.status === FlowServiceStatusType.NotStarted || this.isInTerminalState()) {
            return;
        }

        // Update the flow status
        this.status = FlowServiceStatusType.Canceled;

        // Clean up resources
        this.cleanupFlowResources();

        // Optionally call the error handler
        this.eventHandlers.onFlowExecutionError?.({
            message: FlowServiceErrors.FlowCanceled.message,
            code: FlowServiceErrors.FlowCanceled.code,
            createdAt: new Date(),
        });
    }

    // Function to dispose of all resources used by the service
    public dispose() {
        console.log('[FlowService] Disposing of resources');

        // Clean up all resources
        this.cleanupFlowResources();

        // Fully dispose of services
        this.pollingService.dispose();
        this.webSocketService.dispose();

        // Reset state
        this.status = FlowServiceStatusType.NotStarted;
        this.flowExecutionId = undefined;
        this.stepResults = [];
    }

    // Function to check if a flow is currently executing
    public isExecuting(): boolean {
        return this.status === FlowServiceStatusType.Starting || this.status === FlowServiceStatusType.Running;
    }

    // Function to check if a flow is in a terminal state
    public isInTerminalState(): boolean {
        return (
            this.status === FlowServiceStatusType.Success ||
            this.status === FlowServiceStatusType.Failed ||
            this.status === FlowServiceStatusType.Canceled ||
            this.status === FlowServiceStatusType.TimedOut
        );
    }

    // Function to clean up resources when a flow is complete
    protected cleanupFlowResources(): void {
        this.clearWebSocketInactivityTimeout();
        this.clearTimeoutMonitor();
        this.pollingService.stopPolling();
        this.webSocketService.unregisterMessageHandler();
    }

    // Function to clear the timeout monitor
    protected clearTimeoutMonitor() {
        if(this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }
    }

    // Function to handle flow failure - should be overridden by subclasses
    protected handleFlowFailure(flowExecution: FlowExecutionGraphQlInterface): void {
        // Get a typed version of the flow execution
        const typedFlowExecution = this.createTypedFlowExecution(flowExecution);

        // Extract an error message from the flow execution
        let errorMessage = 'Flow execution failed.';
        if(flowExecution.errors && Array.isArray(flowExecution.errors) && flowExecution.errors.length > 0) {
            const firstError = flowExecution.errors[0];
            if(typeof firstError === 'string') {
                errorMessage = firstError;
            }
            else if(firstError && typeof firstError === 'object' && 'message' in firstError) {
                errorMessage = firstError.message as string;
            }
        }

        // Create an error object
        const error: FlowExecutionErrorInterface = {
            message: errorMessage,
            code: FlowServiceErrors.FlowError.code,
            createdAt: new Date(),
        };

        // Call the error handler with both the error and the typed flow execution
        this.eventHandlers.onFlowExecutionError?.(error, typedFlowExecution);
    }

    // Function to process a flow step execution
    protected processFlowStepExecution(stepExecution: FlowStepExecutionGraphQlInterface): boolean {
        // Skip if we don't have input (shouldn't happen)
        if(!this.input) {
            return false;
        }

        // Process the step to extract result data
        const stepOutput = this.processFlowStep(stepExecution);

        // Store the result for later use
        this.stepResults.push({
            id: stepExecution.id,
            flowExecutionId: stepExecution.flowExecutionId,
            stepId: stepExecution.stepId,
            actionType: stepExecution.actionType,
            attempt: stepExecution.attempt || 1, // Default to 1 if not provided
            status: stepExecution.status,
            flowExecution: stepExecution.flowExecution,
            input: stepExecution.input,
            output: stepOutput,
            updatedAt: stepExecution.updatedAt ? new Date(stepExecution.updatedAt) : new Date(),
            createdAt: new Date(stepExecution.createdAt),
            errors: stepExecution.errors,
        });

        // Send step update based on status
        switch(stepExecution.status) {
            case FlowStepExecutionStatusGraphQlType.Success:
                this.eventHandlers.onFlowStepExecutionComplete?.(stepExecution);
                return true;
            case FlowStepExecutionStatusGraphQlType.Failed:
                this.eventHandlers.onFlowStepExecutionError?.(stepExecution);
                return true;
            case FlowStepExecutionStatusGraphQlType.Running:
                this.eventHandlers.onFlowStepExecutionUpdate?.(stepExecution);
                break;
        }

        return false;
    }

    // Function to determine if a flow step should be processed
    protected shouldProcessFlowStep(flowStep: FlowStepExecutionGraphQlInterface): boolean {
        if(flowStep) {
        }

        // Default implementation processes all steps
        return true;
    }

    // Function to process the flow step output
    protected processFlowStep(flowStep: FlowStepExecutionGraphQlInterface): Record<string, unknown> | undefined {
        // Default implementation just returns the output
        if(!flowStep.output) {
            return undefined;
        }

        return flowStep.output;
    }

    // Function to create a typed flow execution
    protected createTypedFlowExecution(
        flowExecution: FlowExecutionGraphQlInterface,
    ): FlowExecutionInterface<TFlowInput, TFlowOutput> {
        if(!this.input || !this.flowExecutionId) {
            throw new Error('Flow input or execution ID not found.');
        }

        // Create a result with the typed input and output
        const result = {
            ...flowExecution,
            input: this.input as unknown as TFlowInput,
            output: flowExecution.output as unknown as TFlowOutput,
        } as unknown as FlowExecutionInterface<TFlowInput, TFlowOutput>;

        return result;
    }

    // Function to validate the input before executing a flow
    // Default implementation returns valid (no validation)
    // Child classes can override this method to add custom validations
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected validateInput(input: TFlowInput): FlowInputValidationResultInterface {
        // Default implementation - all inputs are valid
        return { isValid: true };
    }

    // Function to handle validation errors
    protected handleValidationError(errorCode: string, errorMessage: string): void {
        // Update status
        this.status = FlowServiceStatusType.Failed;

        // Call the error handler if available - only with error, no flow execution
        this.eventHandlers.onFlowExecutionError?.({
            code: errorCode,
            message: errorMessage,
            createdAt: new Date(),
        });
    }

    // Function to handle errors from the flow execution
    protected handleError(error: Error, code?: string) {
        console.error(`FlowService error (${code || 'UNKNOWN'})`, error);

        // Update status
        this.status = FlowServiceStatusType.Failed;

        // Clean up resources
        this.cleanupFlowResources();

        // Optionally call the error handler - only with error, no flow execution
        this.eventHandlers.onFlowExecutionError?.({
            message: error.message,
            code: code || FlowServiceErrors.FlowError.code,
            createdAt: new Date(),
        });
    }
}

// Export - Default
export default FlowService;
