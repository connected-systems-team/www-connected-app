// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import { WebSocketEvent } from '@project/source/api/sockets/WebSocketMessage';

// Type - WebSocket message handler
type WebSocketMessageHandler = (event: WebSocketEvent) => void;

// Hook - useWebSocket
export function useWebSocket() {
    // State
    const [isConnected, setIsConnected] = React.useState(false);

    // References
    const webSocketReference = React.useRef<WebSocket | null>(null);
    const messageHandlersReference = React.useRef<WebSocketMessageHandler[]>([]);
    const reconnectAttempts = React.useRef(0);
    const reconnectTimerReference = React.useRef<NodeJS.Timeout>();
    const isCleaningUpReference = React.useRef(false);

    // Function to create and configure a new WebSocket connection
    const connectWebSocket = React.useCallback(function () {
        // Don't create new connections during cleanup
        if(isCleaningUpReference.current) {
            return;
        }

        // Check if we already have an active connection
        if(
            webSocketReference.current?.readyState === WebSocket.OPEN ||
            webSocketReference.current?.readyState === WebSocket.CONNECTING
        ) {
            // console.log('WebSocket connection already exists');
            return;
        }

        // Close any existing connection
        if(webSocketReference.current) {
            webSocketReference.current.close();
            webSocketReference.current = null;
        }

        // console.log('Creating new WebSocket');
        const webSocket = new WebSocket('wss://api.connected.app/ws/user/connect');

        // Only set the reference if we're not cleaning up
        if(!isCleaningUpReference.current) {
            webSocketReference.current = webSocket;
        }

        // Function to handle the WebSocket onopen event
        webSocket.onopen = function () {
            if(!isCleaningUpReference.current) {
                console.log('WebSocket connected to api.connected.app');
                setIsConnected(true);
                reconnectAttempts.current = 0;
            }
            else {
                // If we're cleaning up, close the connection immediately
                webSocket.close();
            }
        };

        // Function to handle the WebSocket onclose event
        webSocket.onclose = function () {
            // console.log('WebSocket disconnected');
            setIsConnected(false);

            // Calculate reconnection delay using exponential backoff
            // Starts at 1s, doubles each attempt (1s, 2s, 4s, 8s...), caps at 30s
            const backoffDelay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
            // console.log(`Attempting to reconnect in ${backoffDelay}ms`);

            // Schedule reconnection attempt
            reconnectTimerReference.current = setTimeout(function () {
                reconnectAttempts.current += 1;
                connectWebSocket();
            }, backoffDelay);
        };

        // Function to handle the WebSocket onmessage event
        webSocket.onmessage = function (event) {
            // Parse the WebSocket message
            const webSocketEvent = JSON.parse(event.data) as WebSocketEvent;
            console.log('WebSocket message received:', webSocketEvent);

            // Call each message handler
            messageHandlersReference.current.forEach(function (handler) {
                handler(webSocketEvent);
            });
        };
    }, []);

    // Effect to connect to the WebSocket on mount
    React.useEffect(
        function () {
            isCleaningUpReference.current = false;
            connectWebSocket();

            // On unmount
            return function () {
                isCleaningUpReference.current = true;

                // Clear any pending reconnection attempts
                if(reconnectTimerReference.current) {
                    clearTimeout(reconnectTimerReference.current);
                }
                // Close the WebSocket connection if it exists
                if(webSocketReference.current) {
                    webSocketReference.current.close();
                    webSocketReference.current = null;
                }

                setIsConnected(false);
            };
        },
        [connectWebSocket],
    );

    // Function to add message handlers with cleanup
    function addMessageHandler(handler: WebSocketMessageHandler) {
        // Add the handler to the list
        messageHandlersReference.current.push(handler);

        // Return cleanup function to remove the handler
        return function () {
            messageHandlersReference.current = messageHandlersReference.current.filter(function (h) {
                return h !== handler;
            });
        };
    }

    // Return the hook's interface
    return {
        isConnected,
        addMessageHandler,
    };
}
