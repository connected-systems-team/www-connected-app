'use client'; // This service uses client-only features

// Dependencies - Types
import { FlowExecution, FlowStepExecution } from '@project/source/api/GraphQlGeneratedCode';
import {
    WebSocketViaSharedWorkerContextInterface,
    WebSocketMessageEventInterface,
} from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';
import { SharedWorkerBaseMessageInterface } from '@structure/source/api/web-sockets/shared-worker/types/SharedWorkerTypes';
import { WebSocketConnectionState } from '@structure/source/api/web-sockets/shared-worker/types/WebSocketSharedWorkerTypes';

// Server Type - FlowWebSocketMessageType
export enum FlowWebSocketMessageType {
    FlowExecution = 'FlowExecution',
    FlowStepExecution = 'FlowStepExecution',
}

// Server Type - FlowExecutionWebSocketMessageInterface
export interface FlowExecutionWebSocketMessageInterface extends SharedWorkerBaseMessageInterface {
    origin: string; // The worker the message is coming from
    type: FlowWebSocketMessageType.FlowExecution;
    arguments: [FlowExecution, ...unknown[]];
}

// Server Type - FlowStepExecutionWebSocketMessageInterface
export interface FlowStepExecutionWebSocketMessageInterface extends SharedWorkerBaseMessageInterface {
    origin: string; // The worker the message is coming from
    type: FlowWebSocketMessageType.FlowStepExecution;
    arguments: [FlowStepExecution, ...unknown[]];
}

// Server Type - FlowWebSocketMessageInterface
export type FlowWebSocketMessageInterface =
    | FlowExecutionWebSocketMessageInterface
    | FlowStepExecutionWebSocketMessageInterface;

// Class - FlowWebSocketService
export class FlowWebSocketService {
    private flowExecutionId?: string;
    private webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface;
    private messageHandlerUnsubscribe: (() => void) | null = null;
    private onMessage: (event: WebSocketMessageEventInterface) => boolean;

    constructor(
        webSocketProvider: WebSocketViaSharedWorkerContextInterface,
        onMessage: (event: WebSocketMessageEventInterface) => boolean,
    ) {
        this.webSocketViaSharedWorker = webSocketProvider;
        this.onMessage = onMessage;
    }

    // Function to set the flow execution ID that this service is tracking
    public setFlowExecutionId(flowExecutionId: string) {
        this.flowExecutionId = flowExecutionId;
    }

    // Function to get the flow execution ID that this service is tracking
    public getFlowExecutionId(): string | undefined {
        return this.flowExecutionId;
    }

    // Function to register the WebSocket message handler
    public registerMessageHandler(): void {
        console.log('!!!! registerMessageHandler - FlowWebSocketService - Registering message handler');

        // Unregister any existing handler
        // this.unregisterMessageHandler();

        // Register new handler
        this.messageHandlerUnsubscribe = this.webSocketViaSharedWorker.onWebSocketMessage((event) => {
            console.log('FlowWebSocketService - Message received:', event);
            return this.onMessage(event);
        });
    }

    // Function to unregister the WebSocket message handler
    public unregisterMessageHandler(): void {
        console.log('!!!! unregisterMessageHandler - FlowWebSocketService - Unregistering message handler');

        if(this.messageHandlerUnsubscribe) {
            // this.messageHandlerUnsubscribe();
            // this.messageHandlerUnsubscribe = null;
        }
    }

    // Function to send a WebSocket message
    public sendMessage(data: unknown): void {
        this.webSocketViaSharedWorker.sendWebSocketMessage(data);
    }

    // Function to check if the WebSocket is currently connected
    public isWebSocketConnected(): boolean {
        return (
            this.webSocketViaSharedWorker.webSocketConnectionInformation.state === WebSocketConnectionState.Connected
        );
    }

    // Function to dispose of all resources used by the service
    public dispose(): void {
        console.log('DISPOSE - FlowWebSocketService - Disposing of resources');

        // this.unregisterMessageHandler();
        this.flowExecutionId = undefined;
    }
}

// Export - Default
export default FlowWebSocketService;
