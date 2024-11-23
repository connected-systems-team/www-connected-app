'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React, { useEffect } from 'react';
import Link from 'next/link';

// Dependencies - Main Components
import { useTheme } from '@structure/source/theme/ThemeProvider';
import { Button } from '@structure/source/common/buttons/Button';
import { Tip } from '@structure/source/common/popovers/Tip';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { FormInputText } from '@structure/source/common/forms/FormInputText';
import { FormInputSelect } from '@structure/source/common/forms/FormInputSelect';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
import { AnimatedList } from '@project/source/common/animations/AnimatedList';
import { ConnectedOutlineIcon } from '@project/source/common/ConnectedOutlineIcon';

// Dependencies - Types
import { TaskResultInterface } from '@project/source/api/sockets/TaskResultInterface';
import { WebSocketEvent } from '@project/source/api/sockets/WebSocketMessage';
import { TaskAssigned, TaskCheckedIn, TaskRunning } from '@project/source/api/sockets/UserWebSocketEvents';

// Dependencies - Hooks
import { useWebSocket } from '@project/source/api/sockets/hooks/useWebSocket';

// Dependencies - Assets
import ArrowUpIcon from '@structure/assets/icons/interface/ArrowUpIcon.svg';
import ErrorCircledIcon from '@structure/assets/icons/status/ErrorCircledIcon.svg';
import CheckCircledIcon from '@structure/assets/icons/status/CheckCircledIcon.svg';
import CheckCircledGreenBorderIcon from '@project/assets/icons/status/CheckCircledGreenBorderIcon.svg';
import ErrorCircledRedBorderIcon from '@project/assets/icons/status/ErrorCircledRedBorderIcon.svg';

// Dependencies - API
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import {
    TaskCreatePortScanDocument,
    TaskPortScanDocument,
    GridRegionsDocument,
    GridRegionsQuery,
} from '@project/source/api/GraphQlGeneratedCode';

type GridRegion = GridRegionsQuery['gridRegions'][0];

// Common ports
const commonPorts = [
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 23, service: 'TELNET' },
    { port: 25, service: 'SMTP' },
    { port: 53, service: 'DNS' },
    { port: 80, service: 'HTTP' },
    { port: 110, service: 'POP3' },
    { port: 115, service: 'SFTP' },
    { port: 135, service: 'RPC' },
    { port: 139, service: 'NetBIOS' },
    { port: 143, service: 'IMAP' },
    { port: 194, service: 'IRC' },
    { port: 443, service: 'SSL' },
    { port: 445, service: 'SMB' },
    { port: 1433, service: 'MSSQL' },
    { port: 3306, service: 'MySQL' },
    { port: 3389, service: 'Remote Desktop' },
    { port: 5632, service: 'PCAnywhere' },
    { port: 5900, service: 'VNC' },
    { port: 25565, service: 'Minecraft' },
];

// Function to convert an alphanumeric string (e.g., e98ba714) to a number
function alphanumericStringToNumber(alphanumericString?: string) {
    if(alphanumericString) {
        let integer = parseInt(alphanumericString, 36);
        // Make the integer a number between 1 and 9999
        integer = integer % 10000;
        return integer;
    }
    else {
        return 'Unknown';
    }
}

// Function to get an emoji from a region identifier
function getRegionEmoji(regionIdentifier?: string) {
    switch(regionIdentifier) {
        case 'north-america':
            return '🇺🇸';
        case 'europe':
            return '🇪🇺';
        case 'asia':
            return '🇸🇬';
        case 'australia':
            return '🇦🇺';
        case 'south-america':
            return '🇧🇷';
        case 'africa':
            return '🇿🇦';
        case 'antarctica':
            return '🇦🇶';
        case 'world':
            return '🌍';
        default:
            return '🌐';
    }
}

// Function to get the region display name from a region identifier
function getRegionDisplayName(regionName: string, gridRegions: GridRegion[]) {
    // Find the grid region
    const gridRegion = gridRegions.find(function (gridRegion) {
        return gridRegion.name === regionName;
    });

    return getRegionEmoji(gridRegion?.name) + ' ' + (gridRegion?.displayName || 'Unknown');
}

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
    const { themeClassName } = useTheme();
    const apolloClient = useApolloClient();
    const gridRegionsQueryState = useQuery(GridRegionsDocument);
    // const [taskCreatePortScanMutation, taskCreatePortScanMutationState] = useMutation(TaskCreatePortScanDocument);
    const [taskCreatePortScanMutation] = useMutation(TaskCreatePortScanDocument);

    // Add WebSocket hook
    const { isConnected, addMessageHandler } = useWebSocket();

    // References
    const remoteAddressFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const remotePortFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const regionFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const currentTaskCreatePortScanIdReference = React.useRef<string | undefined>(undefined);
    const currentTaskCreatePortScanGroupIdReference = React.useRef<string | undefined>(undefined);
    const currentTaskPortScanPollCountReference = React.useRef<number>(0);
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

    // Handle WebSocket events
    useEffect(() => {
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
                        setPortCheckStatusTextArray((prev) => [
                            ...prev,
                            `Server ${getRegionEmoji(assignedEvent.region)} #${alphanumericStringToNumber(
                                assignedEvent.nodeId,
                            )} assigned...`,
                        ]);
                    }
                    break;

                case 'taskRunning':
                    const runningEvent = event as TaskRunning;
                    if(runningEvent.taskId === currentTaskCreatePortScanIdReference.current) {
                        setPortCheckStatusTextArray((prev) => [
                            ...prev,
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
    }, []);

    // Add helper function to handle task results
    const handleTaskResult = (result: TaskResultInterface) => {
        const portScanResult = result.result[0];
        const port = portScanResult.ports[0]?.port;
        const host = portScanResult.hostName;

        if(portScanResult.error?.message === 'Failed to resolve host.') {
            setPortCheckStatusTextArray((prev) => [...prev, 'Failed to resolve host.']);
            return;
        }

        const isOpen = portScanResult.ports[0]?.state === 'open';
        setPortCheckStatusTextArray((prev) => [...prev, `Port ${port} is ${isOpen ? 'open' : 'closed'} on ${host}.`]);
    };

    // Function to check the port
    async function checkPort() {
        cleanupTimeouts();
        setUsingFallback(false);
        setCheckingPort(true);
        currentTaskCreatePortScanIdReference.current = undefined;

        const remoteAddress = remoteAddressFormInputReference.current?.getValue();
        const remotePort = remotePortFormInputReference.current?.getValue();
        const regionIdentifier = regionFormInputReference.current?.getValue() ?? 'north-america';
        console.log('remoteAddress', remoteAddress, 'remotePort', remotePort, 'region', regionIdentifier);

        setPortCheckStatusTextArray([
            `Checking port ${remotePort} on ${remoteAddress} from ${getRegionDisplayName(
                regionIdentifier,
                gridRegionsQueryState.data?.gridRegions || [],
            )}...`,
        ]);

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
                        ports: [remotePort],
                        regions: [regionIdentifier],
                    },
                },
            });

            console.log('Mutation completed:', result.data);

            // Set the task ID and start polling if WebSocket isn't working
            currentTaskCreatePortScanIdReference.current = result.data.taskCreatePortScan[0]?.id;
            currentTaskCreatePortScanGroupIdReference.current = result.data.taskCreatePortScan[0]?.groupdId;

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
                {/* Your Public IP Address */}
                <div>
                    <div className="font-medium">Your Public IP Address</div>
                    <div className="mt-2 flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                            <div className="text-2xl">{properties.publicIpAddress}</div>
                            <div className="flex items-center">
                                <CopyButton
                                    value={properties.publicIpAddress ?? ''}
                                    notice={{
                                        title: 'Copied to Clipboard',
                                        content: `${properties.publicIpAddress}`,
                                    }}
                                />
                            </div>
                        </div>
                        <Tip content="Learn more about your public IP address." className="w-48">
                            <div className="flex items-center">
                                <Link href={`/ip-addresses/v4/${properties.publicIpAddress}`} target="_blank">
                                    <ConnectedOutlineIcon className="h-4 w-4" />
                                </Link>
                            </div>
                        </Tip>
                    </div>
                </div>

                <div className="mt-8">
                    {/* Form */}
                    <div className="flex flex-col md:flex-row">
                        {/* Remote Address */}
                        <FormInputText
                            ref={remoteAddressFormInputReference}
                            className="flex-grow md:mr-4"
                            id="remoteAddress"
                            label="IP Address or Domain"
                            labelTip="This can either be a domain name or IP address."
                            labelTipIconProperties={{
                                contentClassName: 'w-48',
                            }}
                            defaultValue={'google.com'}
                            description={
                                <div
                                    className="flex cursor-pointer select-none items-center space-x-1 hover:text-dark-2 active:text-dark dark:hover:text-light-2 dark:active:text-light"
                                    onClick={function () {
                                        remoteAddressFormInputReference.current?.setValue(
                                            properties.publicIpAddress ?? '',
                                        );
                                    }}
                                >
                                    <div>
                                        <ArrowUpIcon className="h-2.5 w-2.5" />
                                    </div>
                                    <div>Use Current IP</div>
                                </div>
                            }
                            selectOnFocus={true}
                        />

                        <div className="flex">
                            {/* Remote Port */}
                            <FormInputText
                                ref={remotePortFormInputReference}
                                className="mr-4 mt-4 w-full min-w-20 md:mt-0 md:w-20"
                                id="remotePort"
                                label="Port"
                                labelTip="This can be a number between 1 and 65,535."
                                labelTipIconProperties={{
                                    contentClassName: 'w-48',
                                }}
                                defaultValue={'80'}
                                selectOnFocus={true}
                            />

                            {/* Region */}
                            <FormInputSelect
                                ref={regionFormInputReference}
                                key={gridRegionsQueryState.data?.gridRegions[0]?.id}
                                className="mt-4 w-full md:mr-4 md:mt-0 md:w-48"
                                id="region"
                                label="Check From"
                                labelTip="The region of the server used to check the port."
                                labelTipIconProperties={{
                                    contentClassName: 'w-48',
                                }}
                                items={
                                    gridRegionsQueryState.data?.gridRegions.map(function (gridRegion) {
                                        return {
                                            value: gridRegion.name,
                                            content: getRegionEmoji(gridRegion.name) + ' ' + gridRegion.displayName,
                                        };
                                    }) || []
                                }
                                placeholder="Loading regions..."
                                defaultValue={gridRegionsQueryState.data?.gridRegions[0]?.name}
                            />
                        </div>

                        {/* Check Port Button */}
                        <Button
                            variant="primary"
                            disabled={checkingPort}
                            processing={checkingPort}
                            className="mt-[30px] md:w-[107px]"
                            onClick={checkPort}
                        >
                            Check Port
                        </Button>
                    </div>

                    {/* Port Check Status Text Array */}
                    {/* <ul className="ml-4 mt-4 list-disc">
                        {portCheckStatusTextArray.map(function (portCheckStatusText, portCheckStatusTextIndex) {
                            return (
                                <li key={portCheckStatusTextIndex} className="animate animate-in">
                                    {portCheckStatusText}
                                </li>
                            );
                        })}
                    </ul> */}

                    <AnimatedList
                        className="ml-[8px] mt-4"
                        items={portCheckStatusTextArray.map(function (text) {
                            const isFinal = text.includes('is open') || text.includes('is closed');

                            let content = <span>{text}</span>;

                            // Allow users to copy the last text
                            if(isFinal) {
                                content = (
                                    <>
                                        <span>{text}</span>{' '}
                                        <CopyButton
                                            className="ml-1.5"
                                            iconClassName="h-3.5 w-3.5"
                                            value={text}
                                            notice={{
                                                title: 'Copied to Clipboard',
                                                content: '"' + text + '"',
                                            }}
                                        />
                                    </>
                                );
                            }

                            return {
                                content: content,
                                isFinal: isFinal,
                                finalDiscIcon: text.includes('is closed')
                                    ? themeClassName == 'light'
                                        ? ErrorCircledRedBorderIcon
                                        : ErrorCircledIcon
                                    : themeClassName == 'light'
                                      ? CheckCircledGreenBorderIcon
                                      : CheckCircledIcon,
                                finalDiscClassName: text.includes('is closed') ? 'bg-red-500' : undefined,
                            };
                        })}
                    />

                    {/* About */}
                    <p className="mt-8 font-medium">About</p>
                    <p className="r mt-1 text-sm">
                        The Connected Port Checker is a versatile tool which allows you to check the state of ports on
                        any IP address or domain using our servers around the world. Whether you are setting up port
                        forwarding, troubleshooting server application issues, or protecting your network, this tool
                        helps ensure your configurations are correct.
                    </p>
                </div>
            </div>

            {/* Common ports */}
            <div className="mt-4 min-w-60 md:mt-0 md:pl-12">
                <p className="font-medium">Common Ports</p>
                <ul className="mt-1 text-sm">
                    {commonPorts.map(function (commonPort, commonPortIndex) {
                        return (
                            <li key={commonPortIndex} className="flex select-none items-center space-x-1.5">
                                <span
                                    className="group flex cursor-pointer space-x-1.5"
                                    onClick={function () {
                                        remotePortFormInputReference.current?.setValue(commonPort.port.toString());

                                        // Immediately check the port if not already checking
                                        if(!checkingPort) {
                                            checkPort();
                                        }
                                    }}
                                >
                                    <span className="text-theme-light-primary transition-colors hover:text-dark dark:text-theme-dark-primary dark:group-hover:text-light">
                                        {commonPort.port}
                                    </span>
                                    <span>{commonPort.service}</span>
                                </span>
                                <Link
                                    href={`/ports/${commonPort.port}`}
                                    target="_blank"
                                    title={'Learn more about port ' + commonPort.port}
                                >
                                    <ConnectedOutlineIcon className="h-3 w-3" />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

// Export - Default
export default PortChecker;
