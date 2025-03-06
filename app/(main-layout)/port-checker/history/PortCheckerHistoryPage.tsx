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
import { PortScanHistoryDocument, OrderByDirection } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - Assets
import ArrowLeftIcon from '@structure/assets/icons/interface/ArrowLeftIcon.svg';
import CheckCircledGreenBorderIcon from '@project/assets/icons/status/CheckCircledGreenBorderIcon.svg';
import ErrorCircledRedBorderIcon from '@project/assets/icons/status/ErrorCircledRedBorderIcon.svg';

// Dependencies - Utilities
import { getRegionMetadata } from '@project/source/modules/connected/utilities/GridUtilities';
import { iso8601Date, timeAgo } from '@structure/source/utilities/Time';
import { uppercaseFirstCharacter } from '@structure/source/utilities/String';
import { extractPortScanHistoryData } from '@project/source/modules/connected/utilities/FlowUtilities';
import { getPortStateDescription } from '@project/source/modules/connected/utilities/PortUtilities';

// Component - PortCheckerHistoryPage
export function PortCheckerHistoryPage() {
    // Hooks
    const urlSearchParameters = useUrlSearchParameters();
    const page = parseInt(urlSearchParameters.get('page') as string) || 1;
    const itemsPerPage = 10;
    const [totalScans, setTotalScans] = React.useState<number>(0);

    // Query
    const portScanHistoryQuery = useQuery(PortScanHistoryDocument, {
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

    // Debugging
    // console.log('portScanHistoryQuery', portScanHistoryQuery);

    // Effects
    React.useEffect(
        function () {
            if(portScanHistoryQuery.data?.portScanHistory.pagination?.itemsTotal) {
                setTotalScans(portScanHistoryQuery.data.portScanHistory.pagination.itemsTotal);
            }
        },
        [portScanHistoryQuery.data?.portScanHistory.pagination?.itemsTotal],
    );

    // Data
    const flowExecutions = portScanHistoryQuery.data?.portScanHistory.items || [];

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
                    {portScanHistoryQuery.error ? (
                        <div className="text-red-500">Error: {portScanHistoryQuery.error.message}</div>
                    ) : portScanHistoryQuery.loading ? (
                        <div className="divide-y divide-neutral/10">
                            <div className="grid grid-cols-[1fr] items-center gap-3 py-4 md:grid-cols-[160px_160px_72px_110px_100px_110px_160px]">
                                <div className="font-medium">Host</div>
                                <div className="font-medium">IP</div>
                                <div className="font-medium">Port</div>
                                <div className="font-medium">Status</div>
                                <div className="font-medium">Latency</div>
                                <div className="font-medium">Region</div>
                                <div className="font-medium">Time</div>
                            </div>
                            {[...Array(itemsPerPage)].map((_, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[1fr] gap-3 py-4 md:grid-cols-[160px_160px_72px_110px_100px_110px_160px]"
                                >
                                    <PlaceholderAnimation className="h-5 w-32" />
                                    <PlaceholderAnimation className="h-5 w-32" />
                                    <PlaceholderAnimation className="h-5 w-8" />
                                    <PlaceholderAnimation className="h-5 w-16" />
                                    <PlaceholderAnimation className="h-5 w-10" />
                                    <PlaceholderAnimation className="h-5 w-16" />
                                    <PlaceholderAnimation className="h-5 w-32" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="divide-y divide-neutral/10">
                                <div className="grid grid-cols-[1fr] items-center gap-3 py-4 pl-2 md:grid-cols-[160px_160px_72px_110px_100px_110px_160px]">
                                    <div className="font-medium">Host</div>
                                    <div className="font-medium">IP</div>
                                    <div className="font-medium">Port</div>
                                    <div className="font-medium">Status</div>
                                    <div className="font-medium">Latency</div>
                                    <div className="font-medium">Region</div>
                                    <div className="font-medium">Time</div>
                                </div>

                                {flowExecutions.map(function (flowExecution) {
                                    // Extract data from the flow execution using our utility
                                    const {
                                        hostName,
                                        hostIp,
                                        port,
                                        portState,
                                        portIsOpen,
                                        latencyInMilliseconds,
                                        regionName,
                                    } = extractPortScanHistoryData(flowExecution);

                                    // Map port states to user-friendly descriptions using our utility
                                    const fullPortStateDisplay = uppercaseFirstCharacter(
                                        getPortStateDescription(portState),
                                    );

                                    return (
                                        <div
                                            key={flowExecution.id}
                                            className="grid grid-cols-[1fr] items-center gap-3 py-4 pl-2 text-sm hover:bg-light-1 md:grid-cols-[160px_160px_72px_110px_100px_110px_160px] dark:hover:bg-dark-2"
                                        >
                                            {/* Host Info */}
                                            <div className="space-y-1">
                                                <div className="font-medium">{hostName}</div>
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
                                                <span>{fullPortStateDisplay}</span>
                                            </div>

                                            {/* Latency */}
                                            <div className="">{latencyInMilliseconds}</div>

                                            {/* Region */}
                                            <div className="flex items-center space-x-1">
                                                {regionName && (
                                                    <>
                                                        <span>{getRegionMetadata(regionName).emoji}</span>
                                                        <span className="neutral">
                                                            {getRegionMetadata(regionName).displayName}
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Time */}
                                            <div className="">
                                                {iso8601Date(new Date(flowExecution.createdAt))} (
                                                {timeAgo(new Date(flowExecution.createdAt).getTime())})
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {(portScanHistoryQuery.loading || portScanHistoryQuery.data) && (
                        <div className="flex items-center space-x-4 pt-6">
                            <Pagination
                                className="justify-start"
                                page={page}
                                itemsPerPage={itemsPerPage}
                                itemsTotal={totalScans}
                                pagesTotal={portScanHistoryQuery.data?.portScanHistory.pagination?.pagesTotal ?? 0}
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
export default PortCheckerHistoryPage;
