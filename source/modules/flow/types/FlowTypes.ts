// Dependencies - GraphQL Types
import { FlowExecution, FlowStepExecution, FlowStepExecutionStatus } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - WebSocket Types
import { SharedWorkerBaseMessageInterface } from '@structure/source/api/web-sockets/shared-worker/types/SharedWorkerTypes';
import { WebSocketMessageEventInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Type - FlowExecutionStatusType
// The status of the flow execution
export enum FlowServiceStatusType {
    NotStarted = 'NotStarted',
    Starting = 'Starting',
    Running = 'Running',
    Success = 'Success',
    Failed = 'Failed',
    Canceled = 'Canceled',
    TimedOut = 'TimedOut',
}

// Type - FlowStepUpdateType
// The status of the flow step execution
export enum FlowStepUpdateType {
    Information = 'Information',
    Success = 'Success',
    Warning = 'Warning',
    Error = 'Error',
}

// Type - FlowWebSocketMessageType
// WebSocket message types for flow executions
export enum FlowWebSocketMessageType {
    FlowExecution = 'FlowExecution',
    FlowStepExecution = 'FlowStepExecution',
}

// Type - FlowStepUpdateDataInterface
// Base interface for data in a flow step update
export interface FlowStepUpdateDataInterface {
    message?: string;
    [key: string]: unknown;
}

// Type - FlowStepUpdateInterface
// The status of the flow step execution
export interface FlowStepUpdateInterface {
    type: FlowStepUpdateType;
    data: FlowStepUpdateDataInterface;
    createdAt: Date;
}

// Type - FlowErrorInterface
// The error information for the flow execution
export interface FlowErrorInterface {
    message: string;
    code?: string;
    data?: Record<string, unknown>;
    createdAt: Date;
}

// Type - FlowStepResultInterface
// The result of a flow step execution
export interface FlowStepResultInterface<TFlowStepInput, TFlowStepOutput> {
    flowStepId: string;
    actionType: string;
    status: FlowStepExecutionStatus;
    input?: TFlowStepInput;
    output?: TFlowStepOutput;
    errors?: FlowStepExecution['errors'];
    createdAt: Date;
}

// Type - FlowExecutionResultInterface
// The result of a flow execution
export interface FlowExecutionMessageInterface extends SharedWorkerBaseMessageInterface {
    type: FlowWebSocketMessageType.FlowExecution;
    arguments: [FlowExecution, ...unknown[]];
}

// Type - FlowStepExecutionMessageInterface
// The result of a flow step execution
export interface FlowStepExecutionMessageInterface extends SharedWorkerBaseMessageInterface {
    type: FlowWebSocketMessageType.FlowStepExecution;
    arguments: [FlowStepExecution, ...unknown[]];
}

// Type - FlowWebSocketMessageInterface
// The result of a flow execution or flow step execution
export type FlowWebSocketMessageInterface = FlowExecutionMessageInterface | FlowStepExecutionMessageInterface;

// Function to check if a WebSocket message event contains a Flow message
export function isFlowWebSocketEventMessage(
    event: WebSocketMessageEventInterface,
): event is WebSocketMessageEventInterface & { data: FlowWebSocketMessageInterface } {
    return isFlowWebSocketMessage(event.data);
}

// Function to check if a message is a FlowWebSocketMessage
export function isFlowWebSocketMessage(message: unknown): message is FlowWebSocketMessageInterface {
    if(typeof message !== 'object' || message === null || !('type' in message)) {
        return false;
    }

    const typedMessage = message as { type: string };
    return (
        typedMessage.type === FlowWebSocketMessageType.FlowExecution ||
        typedMessage.type === FlowWebSocketMessageType.FlowStepExecution
    );
}

// Function to check if a message is a FlowExecutionMessage
export function isFlowExecutionMessage(message: unknown): message is FlowExecutionMessageInterface {
    if(!isFlowWebSocketMessage(message)) {
        return false;
    }

    return (
        message.type === FlowWebSocketMessageType.FlowExecution &&
        'arguments' in message &&
        Array.isArray(message.arguments) &&
        message.arguments.length > 0
    );
}

// Function to check if a message is a FlowStepExecutionMessage
export function isFlowStepExecutionMessage(message: unknown): message is FlowStepExecutionMessageInterface {
    if(!isFlowWebSocketMessage(message)) {
        return false;
    }

    return (
        message.type === FlowWebSocketMessageType.FlowStepExecution &&
        'arguments' in message &&
        Array.isArray(message.arguments) &&
        message.arguments.length > 0
    );
}

// Type - FlowError
// Standard error definitions for flow services
export const FlowError = {
    // General flow errors
    FlowCanceled: {
        code: 'FlowCanceled',
        message: 'Flow execution was canceled',
    },
    FlowTimeout: {
        code: 'FlowTimeout',
        message: 'Flow execution timed out',
    },
    FlowError: {
        code: 'FlowError',
        message: 'An error occurred during flow execution',
    },

    // Communication errors
    WebSocketError: {
        code: 'WebSocketError',
        message: 'WebSocket communication error',
    },
    PollingError: {
        code: 'PollingError',
        message: 'Error polling for flow updates',
    },

    // API errors
    ApiError: {
        code: 'ApiError',
        message: 'API request failed',
    },
    GraphQlError: {
        code: 'GraphQlError',
        message: 'GraphQL query failed',
    },

    // Execution errors
    ExecutionFailed: {
        code: 'ExecutionFailed',
        message: 'Flow execution failed',
    },
    StepExecutionFailed: {
        code: 'StepExecutionFailed',
        message: 'Flow step execution failed',
    },

    // Domain-specific errors
    HostResolutionError: {
        code: 'HostResolutionError',
        message: 'Failed to resolve host',
    },
    HostDownError: {
        code: 'HostDownError',
        message: 'Host is down or not responding',
    },
    ConnectionError: {
        code: 'ConnectionError',
        message: 'Connection error',
    },
} as const;
