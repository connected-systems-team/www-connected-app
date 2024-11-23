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

// Dependencies - Types
import { TaskResultInterface } from '@project/source/api/sockets/TaskResultInterface';
import { WebSocketEvent } from '@project/source/api/sockets/WebSocketMessage';
import { TaskAssigned, TaskCheckedIn, TaskRunning } from '@project/source/api/sockets/UserWebSocketEvents';

// Dependencies - Hooks
import { useWebSocket } from '@project/source/api/sockets/hooks/useWebSocket';

// Dependencies - API
import { useMutation, useApolloClient } from '@apollo/client';
import { TaskCreatePortScanDocument, TaskPortScanDocument } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - Utilities
import { getRegionEmoji, alphanumericStringToNumber } from '@project/app/(main-layout)/port-checker/Region';

// Component - PortChecker
export interface PortCheckerInterface {
    publicIpAddress?: string;
}
export function PortChecker(properties: PortCheckerInterface) {
    // State
    const [checkingPort, setCheckingPort] = React.useState<boolean>(false);
    const [portCheckStatusTextArray, setPortCheckStatusTextArray] = React.useState<string[]>([]);
    const [usingFallback, setUsingFallback] = React.useState<boolean>(false);

    // Hooks
    const apolloClient = useApolloClient();
    const [taskCreatePortScanMutation] = useMutation(TaskCreatePortScanDocument);

    // Add WebSocket hook
    const { isConnected, addMessageHandler } = useWebSocket();

    // References
    const buttonReference = React.useRef<ButtonElementType>(null);
    const remoteAddressFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const remotePortFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const regionFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const currentTaskCreatePortScanIdReference = React.useRef<string | undefined>(undefined);
    const currentTaskCreatePortScanGroupIdReference = React.useRef<string | null | undefined>(undefined);
    const websocketTimeoutReference = React.useRef<NodeJS.Timeout>();
    const fallbackTimeoutReference = React.useRef<NodeJS.Timeout>();
    const totalTimeoutReference = React.useRef<NodeJS.Timeout>();

    // Function to clean up all timeouts
    function cleanupTimeouts() {
        if(websocketTimeoutReference.current) clearTimeout(websocketTimeoutReference.current);
        if(fallbackTimeoutReference.current) clearTimeout(fallbackTimeoutReference.current);
        if(totalTimeoutReference.current) clearTimeout(totalTimeoutReference.current);
    }

    // Function to poll task port scan
    async function pollTaskPortScan() {
        if(!currentTaskCreatePortScanIdReference.current) {
            console.log('No task ID to poll');
            return;
        }

        console.log('Polling task:', currentTaskCreatePortScanIdReference.current);

        try {
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
            if(!task) {
                console.log('No task data received');
                if(usingFallback) {
                    fallbackTimeoutReference.current = setTimeout(pollTaskPortScan, 2000);
                }
                return;
            }

            console.log('Poll result:', task.state, task.results?.[0]?.result[0]);

            if(task.state === 'Succeeded' || task.results?.[0]?.result[0]?.error) {
                handleTaskResult(task.results[0] as TaskResultInterface);
                setCheckingPort(false);
                cleanupTimeouts();
            }
            else if(usingFallback && checkingPort) {
                // Continue polling if we're in fallback mode and still checking
                fallbackTimeoutReference.current = setTimeout(pollTaskPortScan, 2000);
            }
        }
        catch(error) {
            console.error('Polling error:', error);
            if(usingFallback && checkingPort) {
                fallbackTimeoutReference.current = setTimeout(pollTaskPortScan, 2000);
            }
        }
    }

    // Effect to handle WebSocket messages
    React.useEffect(
        function () {
            const removeHandler = addMessageHandler((event: WebSocketEvent) => {
                if(!currentTaskCreatePortScanIdReference.current) return;

                // Clear websocket timeout since we received a message
                if(websocketTimeoutReference.current) {
                    clearTimeout(websocketTimeoutReference.current);
                }

                switch(event.type) {
                    case 'taskAssigned':
                        const assignedEvent = event as TaskAssigned;
                        if(assignedEvent.taskId === currentTaskCreatePortScanIdReference.current) {
                            setPortCheckStatusTextArray((previous) => [
                                ...previous,
                                `Server ${getRegionEmoji(assignedEvent.region)} #${alphanumericStringToNumber(
                                    assignedEvent.nodeId,
                                )} assigned...`,
                            ]);
                        }
                        break;

                    case 'taskRunning':
                        const runningEvent = event as TaskRunning;
                        if(runningEvent.taskId === currentTaskCreatePortScanIdReference.current) {
                            setPortCheckStatusTextArray((previous) => [
                                ...previous,
                                `Server ${getRegionEmoji(runningEvent.region)} #${alphanumericStringToNumber(
                                    runningEvent.nodeId,
                                )} checking port...`,
                            ]);
                        }
                        break;

                    case 'taskCheckedIn':
                        const checkedInEvent = event as TaskCheckedIn;
                        if(checkedInEvent.taskId === currentTaskCreatePortScanIdReference.current) {
                            handleTaskResult(checkedInEvent.result);
                            setCheckingPort(false);
                        }
                        break;
                }
            });

            return () => {
                removeHandler();
                cleanupTimeouts();
            };
        },
        [addMessageHandler],
    );

    // Add helper function to handle task results
    function handleTaskResult(result: TaskResultInterface) {
        const portScanResult = result.result[0];
        const port = portScanResult.ports[0]?.port;
        const host = portScanResult.hostName;

        if(portScanResult.error?.message === 'Failed to resolve host.') {
            setPortCheckStatusTextArray((prev) => [...prev, 'Failed to resolve host.']);
            return;
        }

        const isOpen = portScanResult.ports[0]?.state === 'open';
        setPortCheckStatusTextArray((prev) => [...prev, `Port ${port} is ${isOpen ? 'open' : 'closed'} on ${host}.`]);
    }

    // Function to check the port
    async function checkPort(
        remoteAddress: string,
        remotePort: number,
        regionIdentifier: string = 'north-america',
        regionDisplayName: string = 'North America',
    ) {
        cleanupTimeouts();
        setUsingFallback(false);
        setCheckingPort(true);
        currentTaskCreatePortScanIdReference.current = undefined;

        console.log('remoteAddress', remoteAddress, 'remotePort', remotePort, 'region', regionIdentifier);

        setPortCheckStatusTextArray([`Checking port ${remotePort} on ${remoteAddress} from ${regionDisplayName}...`]);

        // Set up timeouts
        websocketTimeoutReference.current = setTimeout(() => {
            console.log('WebSocket timeout reached, switching to polling...');
            if(checkingPort && currentTaskCreatePortScanIdReference.current) {
                console.log('Starting fallback polling for task:', currentTaskCreatePortScanIdReference.current);
                setUsingFallback(true);
                setPortCheckStatusTextArray((prev) => [...prev, 'Switching to backup method...']);
                pollTaskPortScan();
            }
        }, 5000);

        // Total timeout
        totalTimeoutReference.current = setTimeout(() => {
            console.log('Total timeout reached');
            if(checkingPort) {
                setPortCheckStatusTextArray((prev) => [...prev, 'Port check timed out after 20 seconds.']);
                setCheckingPort(false);
                setUsingFallback(false);
                cleanupTimeouts();
            }
        }, 20000);

        // Perform the mutation
        try {
            const result = await taskCreatePortScanMutation({
                variables: {
                    input: {
                        host: remoteAddress,
                        ports: [remotePort.toString()],
                        regions: [regionIdentifier],
                    },
                },
            });

            console.log('Mutation completed:', result.data);

            // Set the task ID and start polling if WebSocket isn't working
            currentTaskCreatePortScanIdReference.current = result.data?.taskCreatePortScan[0]?.id;
            currentTaskCreatePortScanGroupIdReference.current = result.data?.taskCreatePortScan[0]?.groupdId;

            if(!currentTaskCreatePortScanIdReference.current) {
                console.error('No task ID received from mutation');
                setPortCheckStatusTextArray((prev) => [...prev, 'Failed to start port check.']);
                setCheckingPort(false);
                cleanupTimeouts();
            }
            else if(!isConnected) {
                // If WebSocket isn't connected, start polling immediately
                console.log('WebSocket not connected, starting polling immediately');
                setUsingFallback(true);
                setPortCheckStatusTextArray((prev) => [...prev, 'Using backup method...']);
                pollTaskPortScan();
            }
        }
        catch(error) {
            console.error('Mutation error:', error);
            setPortCheckStatusTextArray((prev) => [...prev, 'Failed to start port check.']);
            setCheckingPort(false);
            cleanupTimeouts();
        }
    }

    // Render the component
    return (
        <div className="flex flex-col md:flex-row">
            <div>
                <YourPublicIpAddress publicIpAddress={properties.publicIpAddress ?? ''} />

                <PortCheckForm
                    remoteAddressFormInputReference={remoteAddressFormInputReference}
                    remotePortFormInputReference={remotePortFormInputReference}
                    regionFormInputReference={regionFormInputReference}
                    buttonReference={buttonReference}
                    checkingPort={checkingPort}
                    checkPort={checkPort}
                />

                <PortCheckStatusAnimatedList portCheckStatusTextArray={portCheckStatusTextArray} />

                <About />
            </div>

            <CommonPorts
                portSelected={function (port) {
                    // Set the port in the form input
                    remotePortFormInputReference.current?.setValue(port.toString());

                    // Immediately check the port if not already checking
                    if(!checkingPort) {
                        buttonReference.current?.click();
                    }
                }}
            />
        </div>
    );
}

// Export - Default
export default PortChecker;
