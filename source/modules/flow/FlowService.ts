'use client'; // This service uses client-only features

// Dependencies - Types
import { FlowExecution, FlowStepExecution } from '@project/source/api/GraphQlGeneratedCode';
import {
    FlowServiceStatusType,
    FlowStepUpdateType,
    FlowStepUpdateInterface,
    FlowStepUpdateDataInterface,
    FlowStepResultInterface,
    FlowErrorInterface,
    FlowError,
    isFlowWebSocketEventMessage,
    isFlowExecutionMessage,
    isFlowStepExecutionMessage,
} from '@project/source/modules/flow/types/FlowTypes';
import {
    WebSocketViaSharedWorkerContextInterface,
    WebSocketMessageEventInterface,
} from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Services
import { FlowWebSocketService } from '@project/source/modules/flow/services/FlowWebSocketService';
import { FlowPollingService } from '@project/source/modules/flow/services/FlowPollingService';

// Type - FlowServiceEventHandlersInterface
// The event handlers for the flow service
export interface FlowServiceEventHandlersInterface<TFlowResult> {
    onFlowStepUpdate?: (update: FlowStepUpdateInterface) => void;
    onFlowComplete?: (result: TFlowResult) => void;
    onFlowError?: (error: FlowErrorInterface) => void;
}

// Type - FlowServiceOptionsInterface
// The options for the FlowService class
export interface FlowServiceOptionsInterface {
    timeoutInMilliseconds?: number;
    pollingIntervalInMilliseconds?: number;
    fallbackToPolling?: boolean;
}

// Abstract Class - FlowService
export abstract class FlowService<TFlowInput, TFlowStepInput, TFlowStepOutput, TFlowResult> {
    // Service status and state
    protected flowInput?: TFlowInput;
    protected flowExecutionId?: string;
    protected flowStatus: FlowServiceStatusType;
    protected flowStepResults: Array<FlowStepResultInterface<TFlowStepInput, TFlowStepOutput>>;

    // Configuration
    protected options: FlowServiceOptionsInterface;
    protected eventHandlers: FlowServiceEventHandlersInterface<TFlowResult>;

    // Services
    protected webSocketService: FlowWebSocketService;
    protected pollingService: FlowPollingService;

    // Cleanup references
    protected timeout?: NodeJS.Timeout;

    constructor(
        webSocketProvider: WebSocketViaSharedWorkerContextInterface,
        options: FlowServiceOptionsInterface,
        eventHandlers: FlowServiceEventHandlersInterface<TFlowResult>,
    ) {
        this.flowStatus = FlowServiceStatusType.NotStarted;
        this.options = {
            timeoutInMilliseconds: 20000, // Default 20 seconds timeout
            pollingIntervalInMilliseconds: 1500, // Default 1.5 seconds polling interval
            fallbackToPolling: true, // Default to support fallback to polling
            ...options,
        };
        this.eventHandlers = eventHandlers;
        this.flowStepResults = [];

        // Initialize WebSocket service
        this.webSocketService = new FlowWebSocketService(webSocketProvider, this.handleWebSocketMessage.bind(this));

        // Initialize polling service
        this.pollingService = new FlowPollingService({
            pollingIntervalInMilliseconds: this.options.pollingIntervalInMilliseconds,
            onPollResult: this.processFlowExecution.bind(this),
            onPollError: (error: Error) => this.handleError(error, FlowError.PollingError.code),
        });
    }

    // Function to execute a flow with the provided input
    // Handles common flow initialization, state management, and service setup
    public async executeFlow(input: TFlowInput): Promise<void> {
        try {
            // Store the flow input
            this.flowInput = input;

            // Reset state
            this.flowStepResults = [];
            this.flowStatus = FlowServiceStatusType.Starting;

            // Call the concrete implementation to initialize the specific flow
            this.flowExecutionId = await this.createFlowExecution(input);

            // Update status
            this.flowStatus = FlowServiceStatusType.Running;

            // Start the services (WebSocket and/or polling)
            this.startServices(this.flowExecutionId);
        }
        catch(error) {
            // Handle initialization error
            this.handleError(
                error instanceof Error ? error : new Error('Unknown error while starting flow execution.'),
                FlowError.ExecutionFailed.code,
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
        if(this.options.fallbackToPolling && !this.webSocketService.isWebSocketConnected()) {
            this.pollingService.startPolling();
        }

        // Set up timeout monitor
        this.setupTimeoutMonitor();
    }

    // Function to setup a timeout monitor to automatically fail the flow after a specified time
    protected setupTimeoutMonitor(timeoutInMilliseconds: number = this.options.timeoutInMilliseconds || 60000) {
        // Clear any existing timeout
        this.clearTimeoutMonitor();

        // Set up new timeout
        this.timeout = setTimeout(() => {
            // Only process timeout if we're still active
            if(
                this.flowStatus === FlowServiceStatusType.Running ||
                this.flowStatus === FlowServiceStatusType.Starting
            ) {
                // Update status
                this.flowStatus = FlowServiceStatusType.TimedOut;

                // Clean up resources
                this.cleanupFlowResources();

                // Notify of timeout
                this.sendFlowStepUpdate(FlowStepUpdateType.Error, { message: FlowError.FlowTimeout.message });

                // Optionally, call the error handler
                if(this.eventHandlers.onFlowError) {
                    this.eventHandlers.onFlowError({
                        message: FlowError.FlowTimeout.message,
                        code: FlowError.FlowTimeout.code,
                        createdAt: new Date(),
                    });
                }
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
                if(isFlowExecutionMessage(event.data)) {
                    const flowExecution = event.data.arguments[0];

                    if(this.flowExecutionId === flowExecution.id) {
                        this.processFlowExecution(flowExecution);
                        return true;
                    }
                }

                // Handle Flow step execution message
                if(isFlowStepExecutionMessage(event.data)) {
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
    protected processFlowExecution(flowExecution: FlowExecution): void {
        // Update the flow status
        this.flowStatus = flowExecution.status as unknown as FlowServiceStatusType;

        // Process all step executions
        this.processFlowStepExecutions(flowExecution);

        // If the flow is complete, finish processing
        if(
            this.flowStatus === FlowServiceStatusType.Success ||
            this.flowStatus === FlowServiceStatusType.Failed ||
            this.flowStatus === FlowServiceStatusType.Canceled
        ) {
            // Clean up resources
            this.cleanupFlowResources();

            // If the flow is successful, process the completion
            if(this.flowStatus === FlowServiceStatusType.Success) {
                // Process successful completion
                const result = this.processFlowCompletion(flowExecution);

                // Call the completion handler if provided
                if(this.eventHandlers.onFlowComplete) {
                    this.eventHandlers.onFlowComplete(result);
                }
            }
            // If the flow is failed, handle the failure
            else if(this.flowStatus === FlowServiceStatusType.Failed) {
                // Process failure
                this.handleFlowFailure(flowExecution);
            }
        }
    }

    // Function to process all step executions in a flow
    protected processFlowStepExecutions(flowExecution: FlowExecution): void {
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
            this.flowStatus === FlowServiceStatusType.NotStarted ||
            this.flowStatus === FlowServiceStatusType.Success ||
            this.flowStatus === FlowServiceStatusType.Failed ||
            this.flowStatus === FlowServiceStatusType.Canceled
        ) {
            return;
        }

        // Update the flow status
        this.flowStatus = FlowServiceStatusType.Canceled;

        // Clean up resources
        this.cleanupFlowResources();

        // Notify of cancellation
        this.sendFlowStepUpdate(FlowStepUpdateType.Warning, { message: FlowError.FlowCanceled.message });

        // Optionally call the error handler
        if(this.eventHandlers.onFlowError) {
            this.eventHandlers.onFlowError({
                message: FlowError.FlowCanceled.message,
                code: FlowError.FlowCanceled.code,
                createdAt: new Date(),
            });
        }
    }

    // Function to dispose of all resources used by the service
    public dispose() {
        // Clean up all resources
        this.cleanupFlowResources();

        // Fully dispose of services
        this.pollingService.dispose();
        this.webSocketService.dispose();

        // Reset state
        this.flowStatus = FlowServiceStatusType.NotStarted;
        this.flowExecutionId = undefined;
        this.flowStepResults = [];
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
    protected handleFlowFailure(flowExecution: FlowExecution): void {
        // Default implementation sends a generic error message
        const errorMessage = this.extractErrorMessageFromExecution(flowExecution);
        this.sendFlowStepUpdate(FlowStepUpdateType.Error, { message: errorMessage });

        if(this.eventHandlers.onFlowError) {
            this.eventHandlers.onFlowError({
                message: errorMessage,
                code: FlowError.FlowError.code,
                createdAt: new Date(),
            });
        }
    }

    // Function to extract an error message from a flow execution
    protected extractErrorMessageFromExecution(flowExecution: FlowExecution): string {
        // Default error message
        let errorMessage = 'Flow execution failed';

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
    protected processFlowStepExecution(stepExecution: FlowStepExecution): boolean {
        // Skip if we don't have input (shouldn't happen)
        if(!this.flowInput) {
            return false;
        }

        // Process the step to extract result data
        const stepOutput = this.processFlowStep(stepExecution);

        // Store the result for later use
        this.flowStepResults.push({
            flowStepId: stepExecution.stepId,
            actionType: stepExecution.actionType,
            status: stepExecution.status,
            input: stepExecution.input as TFlowStepInput,
            output: stepOutput,
            errors: stepExecution.errors,
            createdAt: new Date(stepExecution.createdAt),
        });

        // Send step update based on status
        switch(stepExecution.status) {
            case 'Success':
                this.sendFlowStepUpdate(FlowStepUpdateType.Success, {
                    message: `Flow step ${stepExecution.actionType} completed`,
                });
                return true;
            case 'Failed':
                // Try to extract error message
                let errorMessage = 'Flow step failed';
                if(stepExecution.errors) {
                    try {
                        const errors = Array.isArray(stepExecution.errors)
                            ? stepExecution.errors
                            : [stepExecution.errors];

                        if(errors.length > 0 && errors[0].message) {
                            errorMessage = errors[0].message;
                        }
                    }
                    catch(error) {
                        console.error('Error parsing step execution errors', error);
                    }
                }

                this.sendFlowStepUpdate(FlowStepUpdateType.Error, { message: errorMessage });
                return true;
            case 'Running':
                this.sendFlowStepUpdate(FlowStepUpdateType.Information, {
                    message: `Processing flow step ${stepExecution.actionType}`,
                });
                break;
        }

        return false;
    }

    // Function to determine if a flow step should be processed
    protected shouldProcessFlowStep(flowStep: FlowStepExecution): boolean {
        if(flowStep) {
        }

        // Default implementation processes all steps
        return true;
    }

    // Function to process the flow completion with a default implementation
    protected processFlowCompletion(flowExecution: FlowExecution): TFlowResult {
        // This is a simple default implementation that returns a basic result
        // Derived classes should override this for specialized processing

        if(!this.flowInput || !this.flowExecutionId) {
            throw new Error('Flow input or execution ID not found');
        }

        // Create a minimal result with basic info that all flow results should have
        const result = {
            flowExecutionId: flowExecution.id,
            createdAt: new Date(),
            // Use the flowInput for additional fields (will be type-checked by TypeScript)
            ...this.flowInput,
        } as unknown as TFlowResult;

        return result;
    }

    // Function to process the flow step output
    protected processFlowStep(flowStep: FlowStepExecution): TFlowStepOutput | undefined {
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

    // Function to send a flow step update to registered handlers
    protected sendFlowStepUpdate(type: FlowStepUpdateType, data: FlowStepUpdateDataInterface = {}) {
        const update: FlowStepUpdateInterface = {
            type,
            data,
            createdAt: new Date(),
        };

        if(this.eventHandlers.onFlowStepUpdate) {
            this.eventHandlers.onFlowStepUpdate(update);
        }
    }

    // Function to handle errors from the flow execution
    protected handleError(error: Error, code?: string) {
        console.error(`FlowService error (${code || 'UNKNOWN'})`, error);

        // Update status
        this.flowStatus = FlowServiceStatusType.Failed;

        // Clean up resources
        this.cleanupFlowResources();

        // Notify of error
        this.sendFlowStepUpdate(FlowStepUpdateType.Error, { message: `Error: ${error.message}` });

        // Optionally call the error handler
        if(this.eventHandlers.onFlowError) {
            this.eventHandlers.onFlowError({
                message: error.message,
                code: code || FlowError.FlowError.code,
                data: { originalError: error },
                createdAt: new Date(),
            });
        }
    }
}

// Export - Default
export default FlowService;
