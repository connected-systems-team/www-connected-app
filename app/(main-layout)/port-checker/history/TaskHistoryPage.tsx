'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { Metadata } from 'next';
import { useUrlSearchParameters } from '@structure/source/utilities/next/NextNavigation';

// Dependencies - Main Components
import { AuthorizationLayout } from '@structure/source/layouts/AuthorizationLayout';
import { Button } from '@structure/source/common/buttons/Button';
import { Pagination } from '@structure/source/common/navigation/Pagination';
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
import { fullDate, timeAgo } from '@structure/source/utilities/Time';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'History • Port Checker',
    };
}

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

    // Query
    const taskHistoryQuery = useQuery(TaskHistoryDocument, {
        variables: {
            input: {
                itemsPerPage: itemsPerPage,
                itemIndex: (page - 1) * itemsPerPage,
            },
            orderBy: {
                key: 'createdAt',
                direction: OrderByDirection.Descending,
            },
        },
    });

    // Data
    const items = taskHistoryQuery.data?.taskHistory.items || [];
    const pagination = taskHistoryQuery.data?.taskHistory.pagination;

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
                            <div className="grid grid-cols-[1fr] items-center gap-3 py-4 md:grid-cols-[200px_200px_100px_260px]">
                                <div className="font-medium">Host</div>
                                <div className="font-medium">Port Status</div>
                                <div className="font-medium">Latency</div>
                                <div className="font-medium">Time</div>
                            </div>
                            {[...Array(itemsPerPage)].map((_, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[1fr] gap-3 py-4 md:grid-cols-[200px_200px_100px_260px]"
                                >
                                    <PlaceholderAnimation className="h-12 w-40" />
                                    <PlaceholderAnimation className="h-6 w-40" />
                                    <PlaceholderAnimation className="h-6 w-20" />
                                    <PlaceholderAnimation className="h-6 w-48" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="divide-y divide-neutral/10">
                                <div className="grid grid-cols-[1fr] items-center gap-3 py-4 md:grid-cols-[200px_200px_100px_260px]">
                                    <div className="font-medium">Host</div>
                                    <div className="font-medium">Port Status</div>
                                    <div className="font-medium">Latency</div>
                                    <div className="font-medium">Time</div>
                                </div>

                                {items.map((task) => {
                                    const firstResult = task.results[0]?.result[0];
                                    const firstPort = firstResult?.ports[0];
                                    const isOpen = firstPort?.state === 'open';

                                    return (
                                        <div
                                            key={task.id}
                                            className="grid grid-cols-[1fr] items-center gap-3 py-4 md:grid-cols-[200px_200px_100px_260px]"
                                        >
                                            {/* Host Info */}
                                            <div className="space-y-1">
                                                <div className="font-medium">{firstResult?.hostName}</div>
                                                <div className="neutral text-sm">{firstResult?.hostIp}</div>
                                            </div>

                                            {/* Port Status */}
                                            <div className="flex items-center space-x-2">
                                                {isOpen ? (
                                                    <CheckCircledGreenBorderIcon className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-light dark:border-none dark:text-light" />
                                                ) : (
                                                    <ErrorCircledRedBorderIcon className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-light dark:border-none dark:text-light" />
                                                )}
                                                <span>
                                                    Port {firstPort?.port} is {firstPort?.state}
                                                </span>
                                            </div>

                                            {/* Latency */}
                                            <div className="neutral text-sm">{firstResult?.latency}</div>

                                            {/* Time */}
                                            <div className="neutral text-sm">
                                                {fullDate(new Date(task.createdAt))} (
                                                {timeAgo(new Date(task.createdAt).getTime())})
                                            </div>

                                            {/* Region */}
                                            {/* <div className="flex items-center space-x-1">
                                                <span>{getRegionEmoji(task.results[0]?.region.name)}</span>
                                                <span className="neutral text-sm">
                                                    {task.results[0]?.region.displayName}
                                                </span>
                                            </div> */}
                                        </div>
                                    );
                                })}
                            </div>

                            {pagination && (
                                <div className="flex items-center space-x-4 pt-6">
                                    <Pagination
                                        className="justify-start"
                                        page={page}
                                        itemsPerPage={itemsPerPage}
                                        itemsTotal={pagination.itemsTotal}
                                        pagesTotal={pagination.pagesTotal}
                                        useLinks={true}
                                        itemsPerPageControl={false}
                                        pageInputControl={false}
                                    />
                                    {pagination.itemsTotal > 0 && (
                                        <div className="neutral text-sm">{pagination.itemsTotal} scans</div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AuthorizationLayout>
    );
}

// Export - Default
export default TaskHistoryPage;
