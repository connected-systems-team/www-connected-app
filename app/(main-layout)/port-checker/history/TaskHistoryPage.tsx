'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { useUrlSearchParameters } from '@structure/source/utilities/next/NextNavigation';

// Dependencies - Main Components
import { AuthorizationLayout } from '@structure/source/layouts/AuthorizationLayout';
import { Button } from '@structure/source/common/buttons/Button';
import { Pagination } from '@structure/source/common/navigation/pagination/Pagination';
import { PlaceholderAnimation } from '@structure/source/common/animations/PlaceholderAnimation';

// Dependencies - API
import { useQuery } from '@apollo/client';
import { TaskHistoryDocument, OrderByDirection } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - Assets
import ArrowLeftIcon from '@structure/assets/icons/interface/ArrowLeftIcon.svg';
import CheckCircledGreenBorderIcon from '@project/assets/icons/status/CheckCircledGreenBorderIcon.svg';
import ErrorCircledRedBorderIcon from '@project/assets/icons/status/ErrorCircledRedBorderIcon.svg';

// Dependencies - Utilities
// import { getRegionEmoji } from '@project/app/(main-layout)/port-checker/Region';
import { iso8601Date, timeAgo } from '@structure/source/utilities/Time';
import { uppercaseFirstCharacter } from '@structure/source/utilities/String';

export interface PortScanResult {
    ports: {
        port: number;
        state: string;
        service: string;
    }[];
    hostIp: string;
    latency: string;
    hostName: string;
    scanTime: string;
    nmapVersion: string;
}

export interface TaskHistoryItem {
    id: string;
    createdAt: string;
    results: {
        region: {
            name: string;
            displayName: string;
        };
        result: PortScanResult[];
    }[];
}

// Component - TaskHistoryPage
export function TaskHistoryPage() {
    // Hooks
    const urlSearchParameters = useUrlSearchParameters();
    const page = parseInt(urlSearchParameters.get('page') as string) || 1;
    const itemsPerPage = 10;
    const [totalScans, setTotalScans] = React.useState<number>(0);

    // Query
    const taskHistoryQuery = useQuery(TaskHistoryDocument, {
        variables: {
            pagination: {
                itemsPerPage: itemsPerPage,
                itemIndex: (page - 1) * itemsPerPage,
                orderBy: [
                    {
                        key: 'createdAt',
                        direction: OrderByDirection.Descending,
                    },
                ],
            },
        },
    });
    // console.log('taskHistoryQuery', taskHistoryQuery);

    // Effects
    React.useEffect(
        function () {
            if(taskHistoryQuery.data?.taskHistory.pagination?.itemsTotal) {
                setTotalScans(taskHistoryQuery.data.taskHistory.pagination.itemsTotal);
            }
        },
        [taskHistoryQuery.data?.taskHistory.pagination?.itemsTotal],
    );

    // Data
    const tasks = taskHistoryQuery.data?.taskHistory.items || [];

    // Render the component
    return (
        <AuthorizationLayout>
            <div className="container pt-4">
                <Button
                    icon={ArrowLeftIcon}
                    iconPosition="left"
                    iconClassName="h-3 w-3"
                    variant="ghost"
                    href="/port-checker"
                >
                    Back to Port Checker
                </Button>

                <h1 className="mb-6 mt-4 text-2xl font-medium">Port Checker History</h1>

                <div>
                    {taskHistoryQuery.error ? (
                        <div className="text-red-500">Error: {taskHistoryQuery.error.message}</div>
                    ) : taskHistoryQuery.loading ? (
                        <div className="divide-y divide-neutral/10">
                            <div className="grid grid-cols-[1fr] items-center gap-3 py-4 md:grid-cols-[180px_180px_72px_110px_100px_200px]">
                                <div className="font-medium">Host</div>
                                <div className="font-medium">IP</div>
                                <div className="font-medium">Port</div>
                                <div className="font-medium">Status</div>
                                <div className="font-medium">Latency</div>
                                <div className="font-medium">Time</div>
                            </div>
                            {[...Array(itemsPerPage)].map((_, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[1fr] gap-3 py-4 md:grid-cols-[180px_180px_72px_110px_100px_200px]"
                                >
                                    <PlaceholderAnimation className="h-5 w-32" />
                                    <PlaceholderAnimation className="h-5 w-32" />
                                    <PlaceholderAnimation className="h-5 w-8" />
                                    <PlaceholderAnimation className="h-5 w-16" />
                                    <PlaceholderAnimation className="h-5 w-10" />
                                    <PlaceholderAnimation className="h-5 w-32" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="divide-y divide-neutral/10">
                                <div className="grid grid-cols-[1fr] items-center gap-3 py-4 pl-2 md:grid-cols-[180px_180px_72px_110px_100px_200px]">
                                    <div className="font-medium">Host</div>
                                    <div className="font-medium">IP</div>
                                    <div className="font-medium">Port</div>
                                    <div className="font-medium">Status</div>
                                    <div className="font-medium">Latency</div>
                                    <div className="font-medium">Time</div>
                                </div>

                                {tasks.map(function (task) {
                                    // {
                                    //     "id": "",
                                    //     "state": "",
                                    //     "procedureType": "PortScan",
                                    //     "procedureArguments": {
                                    //         "host": "google.com",
                                    //         "ports": ["80"]
                                    //     },
                                    //     "results": [
                                    //         {
                                    //             "result": [
                                    //                 {
                                    //                     "ports": [
                                    //                         {
                                    //                             "port": 80,
                                    //                             "state": "open",
                                    //                             "service": "http"
                                    //                         }
                                    //                     ],
                                    //                     "hostIp": "142.250.190.78",
                                    //                     "latency": "0.00054s",
                                    //                     "hostName": "google.com",
                                    //                     "scanTime": "0.11 seconds",
                                    //                     "nmapVersion": "7.93"
                                    //                 }
                                    //             ],
                                    //             "createdAt": "2024-11-29T21:13:38.340Z"
                                    //         }
                                    //     ],
                                    //     "createdAt": "2024-11-29T21:13:36.159Z"
                                    // }

                                    const firstTaskResult = task.results[0]?.result[0];
                                    const host = task.procedureArguments.host;
                                    const hostIsIp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host);

                                    let hostIp = hostIsIp ? host : '-';
                                    let port = task.procedureArguments.ports[0];
                                    let portState = 'closed';
                                    let portIsOpen = false;
                                    let latencyInMilliseconds = '-';

                                    if(firstTaskResult) {
                                        hostIp = firstTaskResult.hostIp;

                                        const firstPort = firstTaskResult.ports[0];
                                        if(firstPort) {
                                            port = firstPort.port;
                                            portState = firstPort.state;
                                            portIsOpen = portState === 'open';
                                        }

                                        const latency = firstTaskResult.latency;
                                        if(latency) {
                                            latencyInMilliseconds =
                                                Math.round(parseFloat(latency.replace('s', '')) * 100000) + ' ms';
                                        }
                                    }

                                    if(!hostIp) {
                                        hostIp = '-';
                                    }

                                    return (
                                        <div
                                            key={task.id}
                                            className="grid grid-cols-[1fr] items-center gap-3 py-4 pl-2 text-sm hover:bg-light-1 md:grid-cols-[180px_180px_72px_110px_100px_200px] dark:hover:bg-dark-2"
                                        >
                                            {/* Host Info */}
                                            <div className="space-y-1">
                                                <div className="font-medium">{host}</div>
                                            </div>

                                            {/* IP */}
                                            <div className="flex items-center space-x-2">
                                                <span>{hostIp}</span>
                                            </div>

                                            {/* Port */}
                                            <div className="flex items-center space-x-2">
                                                <span>{port}</span>
                                            </div>

                                            {/* Port Status */}
                                            <div className="flex items-center space-x-2">
                                                {portIsOpen ? (
                                                    <CheckCircledGreenBorderIcon className="flex h-4 w-4 items-center justify-center rounded-full bg-green-400 text-light dark:border-none dark:text-light" />
                                                ) : (
                                                    <ErrorCircledRedBorderIcon className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-light dark:border-none dark:text-light" />
                                                )}
                                                <span>{uppercaseFirstCharacter(portState)}</span>
                                            </div>

                                            {/* Latency */}
                                            <div className="">{latencyInMilliseconds}</div>

                                            {/* Time */}
                                            <div className="">
                                                {iso8601Date(new Date(task.createdAt))} (
                                                {timeAgo(new Date(task.createdAt).getTime())})
                                            </div>

                                            {/* Region */}
                                            {/* <div className="flex items-center space-x-1">
                                                <span>{getRegionEmoji(task.results[0]?.region.name)}</span>
                                                <span className="neutral ">
                                                    {task.results[0]?.region.displayName}
                                                </span>
                                            </div> */}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {(taskHistoryQuery.loading || taskHistoryQuery.data) && (
                        <div className="flex items-center space-x-4 pt-6">
                            <Pagination
                                className="justify-start"
                                page={page}
                                itemsPerPage={itemsPerPage}
                                itemsTotal={totalScans}
                                pagesTotal={taskHistoryQuery.data?.taskHistory.pagination?.pagesTotal ?? 0}
                                useLinks={true}
                                itemsPerPageControl={false}
                                pageInputControl={false}
                            />
                            {totalScans > 0 && <div className="neutral text-sm">{totalScans} scans</div>}
                        </div>
                    )}
                </div>
            </div>
        </AuthorizationLayout>
    );
}

// Export - Default
export default TaskHistoryPage;
