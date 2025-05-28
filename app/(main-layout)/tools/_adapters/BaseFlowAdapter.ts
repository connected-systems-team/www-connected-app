'use client'; // This adapter uses client-only features

// Dependencies - Types
import { FlowExecutionErrorInterface } from '@project/app/_modules/flow/FlowService';
import { FlowExecution as FlowExecutionGraphQlInterface } from '@project/app/_api/graphql/GraphQlGeneratedCode';
import { ToolResultItemBase } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Utilities
import { FlowErrorHandler, FlowErrorResult } from '@project/app/(main-layout)/tools/_adapters/FlowErrorHandler';

// Generic flow service interface
export interface BaseFlowService<TInput, TOutput> {
    executeFlow(input: TInput): Promise<void>;
    readonly outputType?: TOutput; // TOutput is used implicitly in the flow execution callbacks
    dispose(): void;
}

// Flow service constructor interface
export interface FlowServiceConstructor<TInput, TOutput, TFlowService extends BaseFlowService<TInput, TOutput>> {
    new (
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        callbacks: {
            onFlowExecutionComplete: (flowExecution: FlowExecutionGraphQlInterface) => void;
            onFlowExecutionError: (
                error: FlowExecutionErrorInterface,
                flowExecution?: FlowExecutionGraphQlInterface,
            ) => void;
        },
    ): TFlowService;
}

// Abstract base class for flow adapters
export abstract class BaseFlowAdapter<
    TInput,
    TOutput,
    TResultItem extends ToolResultItemBase,
    TFlowService extends BaseFlowService<TInput, TOutput>,
> {
    protected flowService: TFlowService;
    protected flowInput?: TInput;
    protected onResultItem: (result: TResultItem) => void;

    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        FlowServiceClass: FlowServiceConstructor<TInput, TOutput, TFlowService>,
        onResultItem: (result: TResultItem) => void,
    ) {
        // Set the event handler
        this.onResultItem = onResultItem;

        // Create the flow service with bound callbacks
        this.flowService = new FlowServiceClass(webSocketViaSharedWorker, {
            onFlowExecutionComplete: this.onFlowExecutionComplete.bind(this),
            onFlowExecutionError: this.onFlowExecutionError.bind(this),
        });
    }

    // Function to execute a flow with the given input
    protected async executeFlow(input: TInput): Promise<void> {
        // Store the input for reference
        this.flowInput = input;

        // Create and send initial status item
        const initialItem = this.createInitialStatusItem(input);
        this.onResultItem(initialItem);

        // Execute the flow (error handling is done via callbacks)
        await this.flowService.executeFlow(input);
    }

    // Function to handle successful flow execution
    protected onFlowExecutionComplete(flowExecution: FlowExecutionGraphQlInterface): void {
        console.log(`${this.getAdapterName()} - Flow execution completed:`, flowExecution);

        // Extract output and input
        const output = flowExecution.output;
        const input = flowExecution.input;

        if(!output) {
            console.error(`${this.getAdapterName()} - No output in flow execution:`, flowExecution);
            this.handleError('No output received from flow execution.');
            return;
        }

        if(!input) {
            console.error(`${this.getAdapterName()} - No input in flow execution:`, flowExecution);
            this.handleError('No input found in flow execution.');
            return;
        }

        // Process the output using tool-specific logic
        this.processFlowOutput(output, input);
    }

    // Function to handle flow execution errors
    protected onFlowExecutionError(
        error: FlowExecutionErrorInterface,
        flowExecution?: FlowExecutionGraphQlInterface,
    ): void {
        FlowErrorHandler.logError(this.getAdapterName(), error, flowExecution);

        // If we have output in the flow execution, try to process it
        if(flowExecution?.output) {
            console.log(`${this.getAdapterName()} - Using flow execution output for error handling`);
            this.onFlowExecutionComplete(flowExecution);
            return;
        }

        // 1. Try tool-specific error handling first
        const toolSpecificResult = this.processToolSpecificError(error);
        if(toolSpecificResult) {
            this.handleError(toolSpecificResult.message, toolSpecificResult.errorCode);
            return;
        }

        // 2. Fall back to shared generic error handling
        const genericResult = FlowErrorHandler.processError(error);
        this.handleError(genericResult.message, genericResult.errorCode);
    }

    // Function to handle errors by creating an error result item
    protected handleError(message: string, errorCode?: string): void {
        if(!this.flowInput) {
            console.error(`${this.getAdapterName()} - Cannot handle error: no flow input available`);
            return;
        }

        const errorItem = this.createErrorStatusItem(this.flowInput, message, errorCode);
        this.onResultItem(errorItem);
    }

    // Function to Dispose of resources
    public dispose(): void {
        this.flowService.dispose();
    }

    // Abstract methods that must be implemented by concrete adapters

    // Function to get the name of this adapter for logging purposes
    protected abstract getAdapterName(): string;

    // Function to create initial status item when flow starts
    protected abstract createInitialStatusItem(input: TInput): TResultItem;

    // Function to create error status item when flow fails
    protected abstract createErrorStatusItem(input: TInput, message: string, errorCode?: string): TResultItem;

    // Function to process successful flow output and create final result items
    protected abstract processFlowOutput(output: TOutput, input: TInput): void;

    // Function to process tool-specific errors (optional override)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected processToolSpecificError(error: FlowExecutionErrorInterface): FlowErrorResult | null {
        // Default implementation returns null (no tool-specific handling)
        // Concrete adapters can override this to handle domain-specific errors
        return null;
    }
}
