// Dependencies - Types
import { WebSocketMessageEventInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';
import {
    FlowWebSocketMessageType,
    FlowWebSocketMessageInterface,
    FlowExecutionWebSocketMessageInterface,
    FlowStepExecutionWebSocketMessageInterface,
} from '@project/app/_modules/flow/services/FlowWebSocketService';

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
export function isFlowExecutionWebSocketMessage(message: unknown): message is FlowExecutionWebSocketMessageInterface {
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
export function isFlowStepExecutionWebSocketMessage(
    message: unknown,
): message is FlowStepExecutionWebSocketMessageInterface {
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
