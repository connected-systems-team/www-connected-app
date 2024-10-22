'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import Link from 'next/link';

// Dependencies - Main Components
import { useTheme } from '@structure/source/theme/ThemeProvider';
import { Button } from '@structure/source/common/buttons/Button';
import { Tip } from '@structure/source/common/popovers/Tip';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { FormInputText } from '@structure/source/common/forms/FormInputText';
import { FormInputSelect } from '@structure/source/common/forms/FormInputSelect';
// import { FormInputMultipleSelect } from '@structure/source/common/forms/FormInputMultipleSelect';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
import { AnimatedList } from '@project/source/common/animations/AnimatedList';
import { ConnectedOutlineIcon } from '@project/source/common/ConnectedOutlineIcon';

// Dependencies - Assets
// import ArrowUpCurvyIcon from '@structure/assets/icons/interface/ArrowUpCurvyIcon.svg';
import ArrowUpIcon from '@structure/assets/icons/interface/ArrowUpIcon.svg';
// import InformationCircledIcon from '@structure/assets/icons/status/InformationCircledIcon.svg';
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
function getRegionDisplayName(regionIdentifier: string, gridRegions: GridRegion[]) {
    // Find the grid region
    const gridRegion = gridRegions.find(function (gridRegion) {
        return gridRegion.identifier === regionIdentifier;
    });

    return getRegionEmoji(gridRegion?.identifier) + ' ' + (gridRegion?.displayName || 'Unknown');
}

// Component - PortChecker
export interface PortCheckerInterface {
    publicIpAddress?: string;
}
export function PortChecker(properties: PortCheckerInterface) {
    // State
    const [checkingPort, setCheckingPort] = React.useState<boolean>(false);
    const [portCheckStatusTextArray, setPortCheckStatusTextArray] = React.useState<string[]>([]);

    // Hooks
    const { themeClassName } = useTheme();
    const apolloClient = useApolloClient();
    const gridRegionsQueryState = useQuery(GridRegionsDocument);
    // const [taskCreatePortScanMutation, taskCreatePortScanMutationState] = useMutation(TaskCreatePortScanDocument);
    const [taskCreatePortScanMutation] = useMutation(TaskCreatePortScanDocument);

    // References
    const remoteAddressFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const remotePortFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const regionFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const currentTaskCreatePortScanIdReference = React.useRef<string | undefined>(undefined);
    const currentTaskCreatePortScanGroupIdReference = React.useRef<string | undefined>(undefined);
    const currentTaskPortScanPollCountReference = React.useRef<number>(0);

    // Function to check the port
    async function checkPort() {
        console.log('Checking port...');

        setCheckingPort(true);

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

        // Perform the mutation
        taskCreatePortScanMutation({
            variables: {
                input: {
                    host: remoteAddress,
                    ports: [remotePort],
                    regions: [regionIdentifier],
                },
            },
            onCompleted: function (data) {
                console.log('data', data);

                // Set the current task ID
                currentTaskCreatePortScanIdReference.current = data.taskCreatePortScan[0]?.id ?? undefined;

                // Set the current task group ID
                currentTaskCreatePortScanGroupIdReference.current = data.taskCreatePortScan[0]?.groupdId ?? undefined;

                setPortCheckStatusTextArray(function (previousValue) {
                    return [
                        ...previousValue,
                        `Server ${getRegionEmoji(
                            data.taskCreatePortScan[0]?.assignments[0]?.region.identifier,
                        )} #${alphanumericStringToNumber(
                            data.taskCreatePortScan[0]?.assignments[0]?.atlasNode.id.split('-')[0],
                        )} assigned to inspect port ${remotePort}...`,
                    ];
                });

                pollTaskPortScan();
            },
        });
    }

    // Function to poll the task port scan
    async function pollTaskPortScan() {
        // If there is a current task ID
        if(currentTaskCreatePortScanIdReference.current) {
            console.log('Polling task port scan...');

            // Perform the query
            const taskPortScanQueryResult = await apolloClient.query({
                query: TaskPortScanDocument,
                variables: {
                    input: {
                        taskId: currentTaskCreatePortScanIdReference.current,
                    },
                },
                fetchPolicy: 'no-cache',
            });

            // taskPortScanQueryResult.data.task?.regionId

            // Increment the poll count
            currentTaskPortScanPollCountReference.current += 1;

            console.log('taskPortScanQueryResult', taskPortScanQueryResult);

            // {
            //     "data": {
            //         "task": {
            //             "id": "8c6a3ca0-acc1-4b4d-91a9-196e5f32e454",
            //             "groupdId": null,
            //             "regionId": "0ed78e55-5f9b-40b0-8c96-5ba6a98fd36a",
            //             "lastResultId": null,
            //             "state": "Running",
            //             "priority": 0,
            //             "procedureType": "PortScan",
            //             "procedureArguments": {
            //                 "host": "google21312312312.com",
            //                 "ports": [
            //                     "80"
            //                 ]
            //             },
            //             "runAt": null,
            //             "attempts": 2,
            //             "maxAttempts": 3,
            //             "assignments": [
            //                 {
            //                     "id": "1ed414e0-b614-4d23-8b7e-928a9f7578e4",
            //                     "active": true,
            //                     "attempt": 4,
            //                     "atlasNode": {
            //                         "id": "000dcfb0-3341-423c-b89e-4e9305585a2b",
            //                         "alias": "chicago-1",
            //                         "updatedAt": "2024-06-22T06:19:19.000Z",
            //                         "createdAt": "2024-06-20T22:10:21.670Z",
            //                         "__typename": "AtlasNode"
            //                     },
            //                     "region": {
            //                         "identifier": "north-america",
            //                         "__typename": "Region"
            //                     },
            //                     "updatedAt": "2024-06-22T07:16:15.404Z",
            //                     "createdAt": "2024-06-22T07:16:15.404Z",
            //                     "__typename": "TaskAssignment"
            //                 },
            //                 {
            //                     "id": "60fed31e-487e-40a8-b604-33eefe219d00",
            //                     "active": true,
            //                     "attempt": 3,
            //                     "atlasNode": {
            //                         "id": "24f22806-c7d6-4d07-9776-3f39035f3e7e",
            //                         "alias": "london-1",
            //                         "updatedAt": "2024-06-22T06:14:59.000Z",
            //                         "createdAt": "2024-06-22T02:47:55.289Z",
            //                         "__typename": "AtlasNode"
            //                     },
            //                     "region": {
            //                         "identifier": "europe",
            //                         "__typename": "Region"
            //                     },
            //                     "updatedAt": "2024-06-22T07:16:27.356Z",
            //                     "createdAt": "2024-06-22T07:16:27.356Z",
            //                     "__typename": "TaskAssignment"
            //                 }
            //             ],
            //             "meta": null,
            //             "results": [
            //                 {
            //                     "id": "c7d06b8e-cf29-4892-90cf-7e716d41e1c0",
            //                     "taskId": "8c6a3ca0-acc1-4b4d-91a9-196e5f32e454",
            //                     "regionId": "0ed78e55-5f9b-40b0-8c96-5ba6a98fd36a",
            //                     "region": {
            //                         "id": "0ed78e55-5f9b-40b0-8c96-5ba6a98fd36a",
            //                         "identifier": "north-america",
            //                         "displayName": "North America",
            //                         "active": true,
            //                         "updatedAt": "2024-06-20T03:22:53.468Z",
            //                         "createdAt": "2024-06-20T03:22:53.468Z",
            //                         "__typename": "Region"
            //                     },
            //                     "clusterId": "9569e9fd-7ff3-4d2b-a49a-a46e6f0ed0f3",
            //                     "cluster": {
            //                         "id": "9569e9fd-7ff3-4d2b-a49a-a46e6f0ed0f3",
            //                         "name": "vps-server",
            //                         "active": true,
            //                         "updatedAt": "2024-06-20T04:48:07.073Z",
            //                         "createdAt": "2024-06-20T04:48:07.073Z",
            //                         "__typename": "Cluster"
            //                     },
            //                     "atlasNodeId": "000dcfb0-3341-423c-b89e-4e9305585a2b",
            //                     "type": "Error",
            //                     "ranAt": "2024-06-22T07:16:25.000Z",
            //                     "attempt": 3,
            //                     "duration": 83,
            //                     "result": [
            //                         {
            //                             "error": {
            //                                 "host": "google21312312312.com",
            //                                 "port": "80",
            //                                 "message": "Failed to resolve host."
            //                             },
            //                             "ports": [],
            //                             "scanTime": "0.07 seconds",
            //                             "nmapVersion": "7.93"
            //                         }
            //                     ],
            //                     "meta": null,
            //                     "error": null,
            //                     "createdAt": "2024-06-22T07:16:26.456Z",
            //                     "updatedAt": "2024-06-22T07:16:26.456Z",
            //                     "__typename": "TaskResult"
            //                 }
            //             ],
            //             "createdAt": "2024-06-22T07:16:14.976Z",
            //             "updatedAt": "2024-06-22T07:16:29.000Z",
            //             "__typename": "Task"
            //         }
            //     }
            // }

            // Not succeeded
            if(taskPortScanQueryResult.data.task?.state !== 'Succeeded') {
                // If the host is not resolved
                if(
                    taskPortScanQueryResult.data.task?.results[0]?.result[0]?.error?.message ===
                    'Failed to resolve host.'
                ) {
                    setPortCheckStatusTextArray(function (previousValue) {
                        return [
                            ...previousValue,
                            `Server ${getRegionEmoji(
                                taskPortScanQueryResult.data.task?.assignments[0]?.region.identifier,
                            )} #${alphanumericStringToNumber(
                                taskPortScanQueryResult.data.task?.assignments[0]?.atlasNode.id.split('-')[0],
                            )} failed to resolve host...`,
                        ];
                    });

                    // After a little delay
                    setTimeout(function () {
                        setPortCheckStatusTextArray(function (previousValue) {
                            return [...previousValue, `Failed to resolve host.`];
                        });

                        // After a little delay
                        setTimeout(function () {
                            setCheckingPort(false);
                        }, 1000);
                    }, 1500);
                }
            }
            // Succeeded
            else if(taskPortScanQueryResult.data.task?.state === 'Succeeded') {
                const host = taskPortScanQueryResult.data.task?.results[0]?.result[0]?.hostName;
                const port = taskPortScanQueryResult.data.task?.results[0]?.result[0]?.ports[0]?.port;

                // If the port is open
                if(taskPortScanQueryResult.data.task?.results[0]?.result[0]?.ports[0]?.state === 'open') {
                    setPortCheckStatusTextArray(function (previousValue) {
                        return [
                            ...previousValue,
                            `Server ${getRegionEmoji(
                                taskPortScanQueryResult.data.task?.assignments[0]?.region.identifier,
                            )} #${alphanumericStringToNumber(
                                taskPortScanQueryResult.data.task?.assignments[0]?.atlasNode.id.split('-')[0],
                            )} reports port ${port} open...`,
                        ];
                    });

                    // After a little delay
                    setTimeout(function () {
                        setPortCheckStatusTextArray(function (previousValue) {
                            return [...previousValue, `Port ${port} is open on ${host}.`];
                        });

                        // After a little delay
                        setTimeout(function () {
                            setCheckingPort(false);
                        }, 1000);
                    }, 1500);
                }
                // If the port is closed
                else {
                    setPortCheckStatusTextArray(function (previousValue) {
                        return [
                            ...previousValue,
                            `Server ${getRegionEmoji(
                                taskPortScanQueryResult.data.task?.assignments[0]?.region.identifier,
                            )} #${alphanumericStringToNumber(
                                taskPortScanQueryResult.data.task?.assignments[0]?.atlasNode.id.split('-')[0],
                            )} reports port ${port} closed...`,
                        ];
                    });

                    // After a little delay
                    setTimeout(function () {
                        setPortCheckStatusTextArray(function (previousValue) {
                            return [...previousValue, `Port ${port} is closed on ${host}.`];
                        });

                        // After a little delay
                        setTimeout(function () {
                            setCheckingPort(false);
                        }, 1000);
                    }, 1500);
                }
            }

            // If the task is still running and the poll count is less than 10
            if(
                taskPortScanQueryResult.data.task?.state != 'Failed' &&
                taskPortScanQueryResult.data.task?.state != 'Cancelled' &&
                taskPortScanQueryResult.data.task?.state != 'Succeeded' &&
                currentTaskPortScanPollCountReference.current < 25
            ) {
                // Poll again
                setTimeout(pollTaskPortScan, 1250);
            }
        }
        else {
            console.log('No task ID to poll.');
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
                                            value: gridRegion.identifier,
                                            content:
                                                getRegionEmoji(gridRegion.identifier) + ' ' + gridRegion.displayName,
                                        };
                                    }) || []
                                }
                                placeholder="Loading regions..."
                                defaultValue={gridRegionsQueryState.data?.gridRegions[0]?.identifier}
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
