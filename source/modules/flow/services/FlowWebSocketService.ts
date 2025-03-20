'use client'; // This service uses client-only features

// Dependencies - Types
import {
    WebSocketViaSharedWorkerContextInterface,
    WebSocketMessageEventInterface,
} from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';
import { WebSocketConnectionState } from '@structure/source/api/web-sockets/shared-worker/types/WebSocketSharedWorkerTypes';

// Class - FlowWebSocketService
export class FlowWebSocketService {
    private flowExecutionId?: string;
    private webSocketProvider: WebSocketViaSharedWorkerContextInterface;
    private messageHandlerUnsubscribe: (() => void) | null = null;
    private messageHandlerFunction: (event: WebSocketMessageEventInterface) => boolean;

    constructor(
        webSocketProvider: WebSocketViaSharedWorkerContextInterface,
        onMessage: (event: WebSocketMessageEventInterface) => boolean,
    ) {
        this.webSocketProvider = webSocketProvider;
        this.messageHandlerFunction = onMessage;
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
        // Unregister any existing handler
        this.unregisterMessageHandler();

        // Register new handler
        this.messageHandlerUnsubscribe = this.webSocketProvider.onWebSocketMessage((event) => {
            return this.messageHandlerFunction(event);
        });
    }

    // Function to unregister the WebSocket message handler
    public unregisterMessageHandler(): void {
        if(this.messageHandlerUnsubscribe) {
            this.messageHandlerUnsubscribe();
            this.messageHandlerUnsubscribe = null;
        }
    }

    // Function to send a WebSocket message
    public sendMessage(data: unknown): void {
        this.webSocketProvider.sendWebSocketMessage(data);
    }

    // Function to check if the WebSocket is currently connected
    public isWebSocketConnected(): boolean {
        return this.webSocketProvider.webSocketConnectionInformation.state === WebSocketConnectionState.Connected;
    }

    // Function to dispose of all resources used by the service
    public dispose(): void {
        this.unregisterMessageHandler();
        this.flowExecutionId = undefined;
    }
}

// Export - Default
export default FlowWebSocketService;
