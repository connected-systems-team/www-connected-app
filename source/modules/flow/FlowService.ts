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

// Type - FlowStepExecutionInterface
// Typed version of the server type FlowStepExecution
export interface FlowStepExecutionInterface<TFlowStepInput, TFlowStepOutput> extends FlowStepExecutionGraphQlInterface {
    input?: TFlowStepInput;
    output?: TFlowStepOutput;
}

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
export interface FlowServiceEventHandlersInterface<TFlowExecutionResult> {
    // Flow Execution events
    onFlowExecutionUpdate?: (flowExecutionResult: TFlowExecutionResult) => void;
    onFlowExecutionComplete?: (flowExecutionResult: TFlowExecutionResult) => void;
    onFlowExecutionError?: (flowExecutionError: FlowExecutionErrorInterface) => void;

    // Flow Step Execution events
    onFlowStepExecutionUpdate?: (flowStepExecution: FlowStepExecutionGraphQlInterface) => void;
    onFlowStepExecutionComplete?: (flowStepExecution: FlowStepExecutionGraphQlInterface) => void;
    onFlowStepExecutionError?: (flowStepExecution: FlowStepExecutionGraphQlInterface) => void;
}

// Type - FlowServiceOptionsInterface
export interface FlowServiceOptionsInterface {
    timeoutInMilliseconds?: number;
    pollingIntervalInMilliseconds?: number;
    fallbackToPolling?: boolean;
}

// Abstract Class - FlowService
export abstract class FlowService<TFlowInput, TFlowStepInput, TFlowStepOutput, TFlowResult> {
    // Service status and state
    protected input?: TFlowInput;
    protected flowExecutionId?: string;
    protected status: FlowServiceStatusType;
    protected stepResults: Array<FlowStepExecutionInterface<TFlowStepInput, TFlowStepOutput>>;

    // Event handlers
    protected eventHandlers: FlowServiceEventHandlersInterface<TFlowResult>;

    // Options
    protected timeoutInMilliseconds: number;
    protected pollingIntervalInMilliseconds: number;
    protected fallbackToPolling: boolean;

    // Services
    protected webSocketService: FlowWebSocketService;
    protected pollingService: FlowPollingService;

    // Cleanup references
    protected timeout?: NodeJS.Timeout;

    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        eventHandlers: FlowServiceEventHandlersInterface<TFlowResult>,
        options?: FlowServiceOptionsInterface,
    ) {
        this.status = FlowServiceStatusType.NotStarted;
        this.stepResults = [];

        // Event handlers
        this.eventHandlers = eventHandlers;

        // Options
        this.timeoutInMilliseconds = options?.timeoutInMilliseconds || 20000;
        this.pollingIntervalInMilliseconds = options?.pollingIntervalInMilliseconds || 1500;
        this.fallbackToPolling = options?.fallbackToPolling || true;

        // Initialize WebSocket service
        this.webSocketService = new FlowWebSocketService(
            webSocketViaSharedWorker,
            this.handleWebSocketMessage.bind(this),
        );

        // Initialize polling service
        this.pollingService = new FlowPollingService({
            pollingIntervalInMilliseconds: this.pollingIntervalInMilliseconds,
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

            // Re-throw to allow concrete implementations to handle specific errors
            throw error;
        }
    }

    // Function that creates a flow execution and returns the flow execution ID
    protected abstract createFlowExecution(input: TFlowInput): Promise<string>;

    // Function to start the WebSocket and polling services
    protected startServices(flowExecutionId: string) {
        // Set execution ID in services
        this.webSocketService.setFlowExecutionId(flowExecutionId);
        this.pollingService.setFlowExecutionId(flowExecutionId);

        // Start WebSocket handler
        this.webSocketService.registerMessageHandler();

        // Start polling if configured to do so
        if(this.fallbackToPolling && !this.webSocketService.isWebSocketConnected()) {
            this.pollingService.startPolling();
        }

        // Set up timeout monitor
        this.setupTimeoutMonitor(this.timeoutInMilliseconds);
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

                // Optionally, call the error handler
                this.eventHandlers.onFlowExecutionError?.({
                    message: FlowServiceErrors.FlowTimedOut.message,
                    code: FlowServiceErrors.FlowTimedOut.code,
                    createdAt: new Date(),
                });
            }
        }, timeoutInMilliseconds);
    }

    // Function to handle a WebSocket message
    protected handleWebSocketMessage(event: WebSocketMessageEventInterface): boolean {
        // Default implementation can be overridden by concrete classes
        try {
            // Use the new event message type guard for cleaner code
            if(isFlowWebSocketEventMessage(event)) {
                // Handle Flow execution message
                if(isFlowExecutionWebSocketMessage(event.data)) {
                    const flowExecution = event.data.arguments[0];

                    if(this.flowExecutionId === flowExecution.id) {
                        this.processFlowExecution(flowExecution);
                        return true;
                    }
                }

                // Handle Flow step execution message
                if(isFlowStepExecutionWebSocketMessage(event.data)) {
                    const flowStepExecution = event.data.arguments[0];

                    if(this.flowExecutionId === flowStepExecution.flowExecutionId) {
                        if(this.shouldProcessFlowStep(flowStepExecution)) {
                            this.processFlowStepExecution(flowStepExecution);
                            return true;
                        }
                    }
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
        // Update the flow status
        this.status = flowExecution.status as unknown as FlowServiceStatusType;

        // Process all step executions
        this.processFlowStepExecutions(flowExecution);

        // If the flow is complete, finish processing
        if(
            this.status === FlowServiceStatusType.Success ||
            this.status === FlowServiceStatusType.Failed ||
            this.status === FlowServiceStatusType.Canceled
        ) {
            // Clean up resources
            this.cleanupFlowResources();

            // If the flow is successful, process the completion
            if(this.status === FlowServiceStatusType.Success) {
                // Process successful completion
                const result = this.processFlowCompletion(flowExecution);

                // Call the completion handler if provided
                this.eventHandlers.onFlowExecutionComplete?.(result);
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
        // If the flow is already not started or completed, do nothing
        if(
            this.status === FlowServiceStatusType.NotStarted ||
            this.status === FlowServiceStatusType.Success ||
            this.status === FlowServiceStatusType.Failed ||
            this.status === FlowServiceStatusType.Canceled
        ) {
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
    public isFlowExecuting(): boolean {
        return this.status === FlowServiceStatusType.Starting || this.status === FlowServiceStatusType.Running;
    }

    // Function to clean up resources when a flow is complete
    protected cleanupFlowResources(): void {
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
        // Default implementation sends a generic error message
        const errorMessage = this.extractErrorMessageFromExecution(flowExecution);

        this.eventHandlers.onFlowExecutionError?.({
            message: errorMessage,
            code: FlowServiceErrors.FlowError.code,
            createdAt: new Date(),
        });
    }

    // Function to extract an error message from a flow execution
    protected extractErrorMessageFromExecution(flowExecution: FlowExecutionGraphQlInterface): string {
        // Default error message
        let errorMessage = 'Flow execution failed.';

        // Try to extract errors from the flow execution
        if(flowExecution.errors && Array.isArray(flowExecution.errors) && flowExecution.errors.length > 0) {
            // Get the first error
            const firstError = flowExecution.errors[0];

            if(typeof firstError === 'string') {
                errorMessage = firstError;
            }
            else if(firstError && typeof firstError === 'object' && 'message' in firstError) {
                errorMessage = firstError.message as string;
            }
        }

        return errorMessage;
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
            input: stepExecution.input as TFlowStepInput,
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

    // Function to process the flow completion with a default implementation
    protected processFlowCompletion(flowExecution: FlowExecutionGraphQlInterface): TFlowResult {
        // This is a simple default implementation that returns a basic result
        // Derived classes should override this for specialized processing

        if(!this.input || !this.flowExecutionId) {
            throw new Error('Flow input or execution ID not found');
        }

        // Create a minimal result with basic info that all flow results should have
        const result = {
            flowExecutionId: flowExecution.id,
            createdAt: new Date(),
            // Use the flowInput for additional fields (will be type-checked by TypeScript)
            ...this.input,
        } as unknown as TFlowResult;

        return result;
    }

    // Function to process the flow step output
    protected processFlowStep(flowStep: FlowStepExecutionGraphQlInterface): TFlowStepOutput | undefined {
        // Default implementation just returns the output cast to the expected type
        if(!flowStep.output) {
            return undefined;
        }

        try {
            return flowStep.output as TFlowStepOutput;
        }
        catch(error) {
            console.error('Error processing flow step output', error);
            return undefined;
        }
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

        // Call the error handler if available
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

        // Optionally call the error handler
        this.eventHandlers.onFlowExecutionError?.({
            message: error.message,
            code: code || FlowServiceErrors.FlowError.code,
            createdAt: new Date(),
        });
    }
}

// Export - Default
export default FlowService;
