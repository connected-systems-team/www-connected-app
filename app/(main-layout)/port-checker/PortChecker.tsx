'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { PortCheckForm } from '@project/app/(main-layout)/port-checker/PortCheckForm';
import { CommonPorts } from '@project/app/(main-layout)/port-checker/CommonPorts';
import { YourPublicIpAddress } from '@project/app/(main-layout)/port-checker/YourPublicIpAddress';
import { PortCheckStatusAnimatedList } from './PortCheckStatusAnimatedList';
import { About } from '@project/app/(main-layout)/port-checker/About';

// Dependencies - Hooks
import { useWebSocket } from '@structure/source/api/web-sockets/hooks/useWebSocket';

// Dependencies - Types
import { WebSocketEvent } from '@structure/source/api/web-sockets/types/WebSocketMessage';
import { TaskResultInterface } from '@project/source/api/web-sockets/TaskResultInterface';
import { TaskAssigned, TaskCheckedIn, TaskRunning } from '@project/source/api/web-sockets/UserWebSocketEvents';

// Dependencies - API
import { useMutation, useApolloClient } from '@apollo/client';
import { TaskCreatePortScanDocument, TaskPortScanDocument } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - Utilities
import {
    getRegionEmojiUsingRegionIdentifier,
    alphanumericStringToNumber,
} from '@project/app/(main-layout)/port-checker/Region';

// Component - PortChecker
export interface PortCheckerInterface {
    publicIpAddress?: string;
}
export function PortChecker(properties: PortCheckerInterface) {
    // State
    const [checkingPort, setCheckingPort] = React.useState<boolean>(false);
    const [portCheckStatusTextArray, setPortCheckStatusTextArray] = React.useState<string[]>([]);
    const [usingFallbackPolling, setUsingFallbackPolling] = React.useState<boolean>(false);
    const [completedRegions, setCompletedRegions] = React.useState<Set<string>>(new Set());

    // Hooks
    const webSocket = useWebSocket();

    // Hooks - API
    const apolloClient = useApolloClient();
    const [taskCreatePortScanMutation] = useMutation(TaskCreatePortScanDocument);

    // References - Port Check Form
    const portCheckFormSubmitButtonReference = React.useRef<ButtonElementType>(null);
    const portCheckFormRemoteAddressFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRemotePortFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRegionFormInputReference = React.useRef<FormInputReferenceInterface>(null);

    // References
    const currentTaskCreatePortScanIdReference = React.useRef<string | undefined>(undefined);
    const websocketTimeoutReference = React.useRef<NodeJS.Timeout>();
    const fallbackTimeoutReference = React.useRef<NodeJS.Timeout>();
    const lastWebSocketMessageTimeReference = React.useRef<number>(0);
    const isCheckingPortReference = React.useRef<boolean>(false);
    const mutationCompletedReference = React.useRef<boolean>(false);
    const queuedMessagesReference = React.useRef<WebSocketEvent[]>([]);

    // Function to clean up all timeouts
    function cleanupTimeouts() {
        if(websocketTimeoutReference.current) clearInterval(websocketTimeoutReference.current);
        if(fallbackTimeoutReference.current) clearTimeout(fallbackTimeoutReference.current);
        setUsingFallbackPolling(false); // Reset fallback state
    }

    // Function to poll task port scan
    async function pollTaskPortScan() {
        // If we're not checking the port, don't poll
        if(!currentTaskCreatePortScanIdReference.current) {
            console.log('No task ID to poll');
            return;
        }

        console.log('Polling task:', currentTaskCreatePortScanIdReference.current);

        try {
            // Query the task from the GraphQL API
            const taskPortScanQueryResult = await apolloClient.query({
                query: TaskPortScanDocument,
                variables: {
                    input: {
                        taskId: currentTaskCreatePortScanIdReference.current,
                    },
                },
                fetchPolicy: 'no-cache',
            });
            const task = taskPortScanQueryResult.data.task;

            // Check if we received task data
            if(!task) {
                // If we didn't receive task data, continue polling
                console.log('No task data received');
                if(checkingPort) {
                    fallbackTimeoutReference.current = setTimeout(pollTaskPortScan, 2000);
                }
                return;
            }

            console.log('Poll result:', task.state, task.results?.[0]?.result[0]);

            // If the task is succeeded or errored, handle the result
            if(task.state === 'Succeeded' || task.results?.[0]?.result[0]?.error) {
                handleTaskCheckedIn(task.results[0] as TaskResultInterface);
                cleanupTimeouts();
                setCheckingPort(false);
                isCheckingPortReference.current = false;
                setUsingFallbackPolling(false);
            }
            // If the task is still running, continue polling
            else if(checkingPort) {
                // Continue polling if we're still checking
                fallbackTimeoutReference.current = setTimeout(pollTaskPortScan, 2000);
            }
        }
        catch(error) {
            console.error('Polling error:', error);
            if(checkingPort) {
                fallbackTimeoutReference.current = setTimeout(pollTaskPortScan, 2000);
            }
        }
    }

    // Function to process queued messages
    function processQueuedMessages() {
        while(queuedMessagesReference.current.length > 0) {
            const event = queuedMessagesReference.current.shift();
            if(event) handleWebSocketMessage(event);
        }
    }

    // Function to handle task checked in
    const handleTaskCheckedIn = React.useCallback(
        function (result: TaskResultInterface) {
            console.log('result', result);

            let isFinal = false;

            const portScanResult = result.result[0];
            if(!portScanResult) {
                console.error('Missing port scan result:', result);
                return;
            }

            const host = portScanResult.error?.host ?? portScanResult.hostName;
            const port = portScanResult.error?.port ?? portScanResult.ports[0]?.port;
            const regionIdentifier = result.region?.name ?? '';
            const gridNodeId = result.gridNodeId ?? '';

            // Sanity check
            if(!port || !host) {
                console.error('Missing port or host in result:', portScanResult);
                return;
            }

            // Handle error case
            if(portScanResult.error) {
                setPortCheckStatusTextArray(function (previousPortCheckStatusTextArray) {
                    return [
                        ...previousPortCheckStatusTextArray,
                        `Server ${getRegionEmojiUsingRegionIdentifier(regionIdentifier)} #${alphanumericStringToNumber(
                            gridNodeId,
                        )} reports: ${portScanResult.error.message}`,
                    ];
                });

                // Add final summary if this was the last region
                if(completedRegions.size >= 2) {
                    isFinal = true;
                    setPortCheckStatusTextArray(function (previousPortCheckStatusTextArray) {
                        return [...previousPortCheckStatusTextArray, `Port ${port} is closed on ${host}.`];
                    });
                }
            }
            // Port is open
            else if(portScanResult.ports[0]?.state === 'open') {
                isFinal = true;
                setPortCheckStatusTextArray(function (previousPortCheckStatusTextArray) {
                    return [...previousPortCheckStatusTextArray, `Port ${port} is open on ${host}.`];
                });
            }
            // Port is filtered
            else if(portScanResult.ports[0]?.state === 'filtered') {
                isFinal = true;
                setPortCheckStatusTextArray(function (previousPortCheckStatusTextArray) {
                    return [...previousPortCheckStatusTextArray, `Port ${port} is closed on ${host}.`];
                });
            }

            // Add this region to completed regions
            setCompletedRegions(function (previousCompletedRegions) {
                return new Set(previousCompletedRegions).add(regionIdentifier);
            });

            // Cleanup if this was the last region
            if(isFinal) {
                cleanupTimeouts();
                setCheckingPort(false);
                isCheckingPortReference.current = false;
                setUsingFallbackPolling(false);
                setCompletedRegions(new Set()); // Reset for next check
            }
        },
        [completedRegions.size],
    );

    // Function to handle WebSocket message
    const handleWebSocketMessage = React.useCallback(
        function (event: WebSocketEvent) {
            console.log('[WebSocket] Received message:', event.type);

            // Get taskId based on event type
            let taskId: string | undefined;
            switch(event.type) {
                case 'taskAssigned':
                    taskId = (event as TaskAssigned).taskId;
                    break;
                case 'taskRunning':
                    taskId = (event as TaskRunning).taskId;
                    break;
                case 'taskCheckedIn':
                    taskId = (event as TaskCheckedIn).taskId;
                    break;
            }

            console.log('[WebSocket] Message for task:', taskId);

            // If we get a WebSocket message for our task while polling, stop polling
            if(taskId === currentTaskCreatePortScanIdReference.current && usingFallbackPolling) {
                console.log('[WebSocket] Received message while polling, stopping polling');
                setUsingFallbackPolling(false);
                if(fallbackTimeoutReference.current) {
                    clearTimeout(fallbackTimeoutReference.current);
                }
            }

            // Update last message time for our task
            if(taskId === currentTaskCreatePortScanIdReference.current) {
                console.log('[WebSocket] Updating last message time for our task');
                lastWebSocketMessageTimeReference.current = Date.now();
            }

            // If we don't have a current task ID, ignore the message
            if(!currentTaskCreatePortScanIdReference.current) {
                console.log('[WebSocket] No current task ID, ignoring message');
                return;
            }

            // Only clear timeout if the message is for our current task
            if(taskId === currentTaskCreatePortScanIdReference.current) {
                if(websocketTimeoutReference.current) {
                    console.log('[WebSocket] Clearing timeout for matching task ID');
                    clearTimeout(websocketTimeoutReference.current);
                }
            }
            else {
                console.log('[WebSocket] Message for different task, keeping timeout');
            }

            // Handle the event based on type
            switch(event.type) {
                // Task assigned
                case 'taskAssigned':
                    const assignedEvent = event as TaskAssigned;
                    if(assignedEvent.taskId === currentTaskCreatePortScanIdReference.current) {
                        setPortCheckStatusTextArray(function (previousPortCheckStatusTextArray) {
                            return [
                                ...previousPortCheckStatusTextArray,
                                `Server ${getRegionEmojiUsingRegionIdentifier(
                                    assignedEvent.region,
                                )} #${alphanumericStringToNumber(assignedEvent.nodeId)} assigned...`,
                            ];
                        });
                    }
                    break;
                // Task running
                case 'taskRunning':
                    const runningEvent = event as TaskRunning;
                    if(runningEvent.taskId === currentTaskCreatePortScanIdReference.current) {
                        setPortCheckStatusTextArray(function (previousPortCheckStatusTextArray) {
                            return [
                                ...previousPortCheckStatusTextArray,
                                `Server ${getRegionEmojiUsingRegionIdentifier(
                                    runningEvent.region,
                                )} #${alphanumericStringToNumber(runningEvent.nodeId)} checking port...`,
                            ];
                        });
                    }
                    break;
                // Task checked in
                case 'taskCheckedIn':
                    const checkedInEvent = event as TaskCheckedIn;
                    if(checkedInEvent.taskId === currentTaskCreatePortScanIdReference.current) {
                        handleTaskCheckedIn(checkedInEvent.result);
                    }
                    break;
            }
        },
        [handleTaskCheckedIn, usingFallbackPolling],
    );

    // Function to check the port
    async function checkPort(
        remoteAddress: string,
        remotePort: number,
        regionIdentifier: string = 'north-america', // Default to North America
        regionDisplayName: string = 'North America', // Default to North America
    ) {
        // Reset state
        mutationCompletedReference.current = false;
        queuedMessagesReference.current = [];

        // Cleanup any existing timeouts and reset fallback state
        cleanupTimeouts();
        setUsingFallbackPolling(false);
        currentTaskCreatePortScanIdReference.current = undefined;
        lastWebSocketMessageTimeReference.current = Date.now();

        // Set checking port state
        setCheckingPort(true);
        isCheckingPortReference.current = true;

        // Reset completed regions
        setCompletedRegions(new Set());

        console.log('Checking port:', { remoteAddress, remotePort, regionIdentifier });

        // Initialize status text
        setPortCheckStatusTextArray([`Checking port ${remotePort} on ${remoteAddress} from ${regionDisplayName}...`]);

        // Set up timeouts
        const checkWebSocketTimeout = setInterval(function () {
            const now = Date.now();
            const timeSinceLastMessage = now - lastWebSocketMessageTimeReference.current;

            console.log('Time since last message:', timeSinceLastMessage, {
                checkingPort: isCheckingPortReference.current,
                taskId: currentTaskCreatePortScanIdReference.current,
                usingFallback: usingFallbackPolling,
            });

            // If we haven't received a message in 5 seconds, start polling every second
            if(
                timeSinceLastMessage >= 5000 &&
                isCheckingPortReference.current &&
                currentTaskCreatePortScanIdReference.current &&
                !usingFallbackPolling
            ) {
                console.log('Starting fallback polling after 5s of no messages');
                clearInterval(checkWebSocketTimeout);
                setUsingFallbackPolling(true);
                pollTaskPortScan();
            }
        }, 1000);

        websocketTimeoutReference.current = checkWebSocketTimeout;

        try {
            // Create the task to check the port with the GraphQL API
            const result = await taskCreatePortScanMutation({
                variables: {
                    input: {
                        host: remoteAddress,
                        ports: [remotePort.toString()],
                        regions: [regionIdentifier],
                    },
                },
            });

            console.log('Task created:', result.data);
            console.log('Setting taskId to:', result.data?.taskCreatePortScan[0]?.id);

            // Set mutation completed and process any queued messages
            mutationCompletedReference.current = true;
            processQueuedMessages();

            // Set the task ID and start polling if WebSocket isn't working
            currentTaskCreatePortScanIdReference.current = result.data?.taskCreatePortScan[0]?.id;

            // If we don't have a task ID, stop checking
            if(!currentTaskCreatePortScanIdReference.current) {
                console.error('No task ID received from mutation');
                setPortCheckStatusTextArray(function (previousPortCheckStatusTextArray) {
                    return [...previousPortCheckStatusTextArray, 'Failed to start port check.'];
                });
                setCheckingPort(false);
                cleanupTimeouts();

                // If we don't have a task ID, start polling immediately
                return;
            }

            if(!webSocket.isConnected) {
                // If WebSocket isn't connected, start polling immediately
                console.log('WebSocket not connected, starting polling immediately');
                setUsingFallbackPolling(true);
                setPortCheckStatusTextArray((prev) => [...prev, 'Using backup method...']);
                pollTaskPortScan();
            }

            // Reset last message time after successful mutation
            lastWebSocketMessageTimeReference.current = Date.now();
        }
        catch(error) {
            console.error('Mutation error:', error);
            setPortCheckStatusTextArray((prev) => [...prev, 'Failed to start port check.']);
            setCheckingPort(false);
            isCheckingPortReference.current = false;
            cleanupTimeouts();
        }
    }

    // Effect to handle WebSocket messages
    React.useEffect(
        function () {
            // Function to add message handler
            const removeHandler = webSocket.addMessageHandler(function (event: WebSocketEvent) {
                if(!mutationCompletedReference.current) {
                    queuedMessagesReference.current.push(event);
                    return;
                }
                handleWebSocketMessage(event);
            });

            // On unmount, remove the handler
            return function () {
                removeHandler();
            };
        },
        [webSocket, usingFallbackPolling, handleWebSocketMessage],
    );

    // Render the component
    return (
        <div className="flex flex-col md:flex-row">
            <div>
                <YourPublicIpAddress publicIpAddress={properties.publicIpAddress ?? ''} />

                <PortCheckForm
                    publicIpAddress={properties.publicIpAddress ?? ''}
                    remoteAddressFormInputReference={portCheckFormRemoteAddressFormInputReference}
                    remotePortFormInputReference={portCheckFormRemotePortFormInputReference}
                    regionFormInputReference={portCheckFormRegionFormInputReference}
                    buttonReference={portCheckFormSubmitButtonReference}
                    checkingPort={checkingPort}
                    checkPort={checkPort}
                />

                <PortCheckStatusAnimatedList portCheckStatusTextArray={portCheckStatusTextArray} />

                <About />
            </div>

            <CommonPorts
                portSelected={function (port) {
                    // Set the port in the form input
                    portCheckFormRemotePortFormInputReference.current?.setValue(port.toString());

                    // Immediately check the port if not already checking
                    if(!checkingPort) {
                        portCheckFormSubmitButtonReference.current?.click();
                    }
                }}
            />
        </div>
    );
}

// Export - Default
export default PortChecker;
