'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Provider
import { useSharedWebSocketContext } from '@structure/source/api/web-sockets/SharedWebSocketProvider';

// Components
import { Button } from '@structure/source/common/buttons/Button';

// Component - WebSocketTestPage
export function WebSocketTestPage() {
    // Hooks - WebSocket
    const webSocket = useSharedWebSocketContext();

    // Effects
    React.useEffect(
        function () {
            // Request the client connections when the component mounts
            webSocket.requestSharedWorkerServerClientConnections();
        },
        [webSocket.requestSharedWorkerServerClientConnections],
    );

    // Render the component
    return (
        <div className="container py-8">
            <h1 className="mb-6 text-2xl font-bold">WebSocket Testing Dashboard</h1>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <p>Web Socket Supported?</p>
                <p>{webSocket.isSupported ? 'Yes' : 'No'}</p>

                <p>Web Socket Connected?</p>
                <p>{webSocket.isConnected ? 'Yes' : 'No'}</p>

                <p>Client ID</p>
                <p>{webSocket.clientId}</p>
            </div>

            <div className="mb-6">
                <div className="mb-4 flex items-center gap-4">
                    <h2 className="text-xl font-bold">Connected Clients</h2>
                    <Button onClick={webSocket.requestSharedWorkerServerClientConnections}>Refresh</Button>
                </div>

                <div className="overflow-hidden rounded-md border">
                    <table className="w-full">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="p-3 text-left">Client ID</th>
                                <th className="p-3 text-left">Connected Since</th>
                                <th className="p-3 text-left">Last Active</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {webSocket.sharedWorkerServerClientConnections.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-3 text-center">
                                        No clients connected
                                    </td>
                                </tr>
                            ) : (
                                webSocket.sharedWorkerServerClientConnections.map(function (client) {
                                    const connectedTime = new Date(client.firstConnected).toLocaleString();
                                    const lastActiveTime = new Date(client.lastActive).toLocaleString();
                                    const isCurrentClient = client.id === webSocket.clientId;

                                    return (
                                        <tr
                                            key={client.id}
                                            className={isCurrentClient ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                                        >
                                            <td className="p-3">
                                                {client.id}{' '}
                                                {isCurrentClient && (
                                                    <span className="text-blue-600 dark:text-blue-400">(You)</span>
                                                )}
                                            </td>
                                            <td className="p-3">{connectedTime}</td>
                                            <td className="p-3">{lastActiveTime}</td>
                                            <td className="p-3">
                                                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-green-500"></span>
                                                Active
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// Export - Default
export default WebSocketTestPage;
