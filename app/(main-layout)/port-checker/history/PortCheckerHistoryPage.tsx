'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { useUrlSearchParameters } from '@structure/source/utilities/next/NextNavigation';

// Dependencies - Types
import {
    NmapPortStateType,
    PortCheckFlowOutputInterface,
} from '@project/source/modules/connected/port-check/PortCheckFlowService';

// Dependencies - Main Components
import { AuthorizationLayout } from '@structure/source/layouts/AuthorizationLayout';
import { Button } from '@structure/source/common/buttons/Button';
import { Pagination } from '@structure/source/common/navigation/pagination/Pagination';
import { PlaceholderAnimation } from '@structure/source/common/animations/PlaceholderAnimation';

// Dependencies - API
import { useQuery } from '@apollo/client';
import {
    PortCheckHistoryDocument,
    OrderByDirection,
    FlowExecution,
    FlowStepExecution,
} from '@project/source/api/graphql/GraphQlGeneratedCode';

// Dependencies - Assets
import ArrowLeftIcon from '@structure/assets/icons/interface/ArrowLeftIcon.svg';
import CheckCircledGreenBorderIcon from '@project/assets/icons/status/CheckCircledGreenBorderIcon.svg';
import ErrorCircledRedBorderIcon from '@project/assets/icons/status/ErrorCircledRedBorderIcon.svg';

// Dependencies - Utilities
import { uppercaseFirstCharacter } from '@structure/source/utilities/String';
import { iso8601DateWithTime, timeAgo } from '@structure/source/utilities/Time';
import { CountryInterface, getCountryByName } from '@structure/source/utilities/geo/Countries';
import {
    getPortStateDescription,
    mapNmapPortStateToPortStateType,
} from '@project/app/(main-layout)/port-checker/_adapters/PortCheckStatusAdapter';

// Type - PortCheckFlowExecutionStepOutput
// Based on PortCheckFlowInputInterface but with GraphQL response field structure
interface PortCheckFlowStepExecutionInputInterface {
    host: string;
    port: number; // Required in GraphQL response
    region: string; // Region ID in GraphQL response
    maxAttempts: number; // GraphQL field name is 'maxAttempts'
}

// Type - PortCheckFlowOutputInterface
type PortCheckFlowStepExecutionOutputInterface = PortCheckFlowOutputInterface;

// Type - PortCheckFlowStepExecutionInterface
interface PortCheckFlowStepExecutionInterface extends Omit<FlowStepExecution, 'input' | 'output'> {
    input: PortCheckFlowStepExecutionInputInterface;
    output: PortCheckFlowStepExecutionOutputInterface;
}

// Region metadata structure from the API response
interface RegionMetadata {
    region: {
        site: string | null;
        region: string;
        country: string;
        division: string;
        locality: string;
    };
}

// GraphQL FlowExecution extended with our specific step execution type
interface PortCheckFlowExecutionInterface extends Omit<FlowExecution, 'stepExecutions'> {
    stepExecutions: PortCheckFlowStepExecutionInterface[];
    metadata?: RegionMetadata;
}

// Type - Extracted Port Check History Data
export interface ExtractedPortCheckHistoryDataInterface {
    hostName: string;
    hostIp: string;
    port: string;
    portState: NmapPortStateType;
    portIsOpen: boolean;
    latencyInMilliseconds: string;
    country?: CountryInterface;
}

// Function to extract port check history data from a flow execution
export function extractPortCheckHistoryData(
    flowExecution: PortCheckFlowExecutionInterface,
): ExtractedPortCheckHistoryDataInterface {
    // Default values
    let hostName = 'Unknown';
    let hostIp = 'Unknown';
    let port = 'Unknown';
    let portState: NmapPortStateType = 'unknown';
    let latencyInMilliseconds = 'N/A';
    const country = flowExecution.metadata?.region?.country
        ? getCountryByName(flowExecution.metadata?.region?.country)
        : undefined;

    // Extract step executions
    const stepExecutions = flowExecution.stepExecutions || [];

    // Look for port scan step
    for(const step of stepExecutions) {
        // Check if this is a port scan step with output
        if(step.actionType === 'PortCheck' && step.output) {
            // Try to extract the step output
            try {
                // Parse output if it's a string, otherwise use as is
                const output =
                    typeof step.output === 'string'
                        ? (JSON.parse(step.output) as PortCheckFlowStepExecutionOutputInterface)
                        : (step.output as PortCheckFlowStepExecutionOutputInterface);

                // Extract host name and IP
                hostName = output.hostName || hostName;
                hostIp = output.hostIpAddress || hostIp;

                // Extract port data if available
                if(output.port) {
                    port = output.port.number ? output.port.number.toString() : port;
                    portState = (output.port.state as NmapPortStateType) || portState;
                }

                // Extract latency data and format as milliseconds with commas
                if(output.latency) {
                    // Remove 's' suffix if present (e.g., "0.0012s")
                    const latencyValue = output.latency.replace('s', '');
                    // Convert from seconds to milliseconds and format with commas
                    const latencyInMs = parseFloat(latencyValue) * 1000;
                    latencyInMilliseconds = latencyInMs.toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' ms';
                }
                else {
                    latencyInMilliseconds = 'N/A';
                }
            }
            catch(error) {
                console.error('Error parsing port scan step output', error);
            }
        }
    }

    // Determine if port is open
    const portIsOpen = portState === 'open';

    return {
        hostName,
        hostIp,
        port,
        portState,
        portIsOpen,
        latencyInMilliseconds,
        country,
    };
}

// Component - PortCheckerHistoryPage
export function PortCheckerHistoryPage() {
    // Hooks
    const urlSearchParameters = useUrlSearchParameters();
    const page = parseInt(urlSearchParameters.get('page') as string) || 1;
    const itemsPerPage = 10;
    const [totalChecks, setTotalChecks] = React.useState<number>(0);

    // Query
    const portCheckHistoryQuery = useQuery(PortCheckHistoryDocument, {
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
    // console.log('portCheckHistoryQuery', portCheckHistoryQuery);

    // Effects
    React.useEffect(
        function () {
            if(portCheckHistoryQuery.data?.portCheckHistory.pagination?.itemsTotal) {
                setTotalChecks(portCheckHistoryQuery.data.portCheckHistory.pagination.itemsTotal);
            }
        },
        [portCheckHistoryQuery.data?.portCheckHistory.pagination?.itemsTotal],
    );

    // Data - Cast the flowExecutions as PortCheckFlowExecutionInterface[]
    const flowExecutions = (portCheckHistoryQuery.data?.portCheckHistory.items ||
        []) as PortCheckFlowExecutionInterface[];

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
                    {portCheckHistoryQuery.error ? (
                        <div className="text-red-500">Error: {portCheckHistoryQuery.error.message}</div>
                    ) : portCheckHistoryQuery.loading ? (
                        <div className="divide-y divide-neutral/10">
                            <div className="grid grid-cols-[1fr] items-center gap-3 py-4 md:grid-cols-[160px_160px_160px_72px_110px_100px_110px]">
                                <div className="font-medium">Time</div>
                                <div className="font-medium">Host</div>
                                <div className="font-medium">IP</div>
                                <div className="font-medium">Port</div>
                                <div className="font-medium">Status</div>
                                <div className="font-medium">Latency</div>
                                <div className="font-medium">Region</div>
                            </div>
                            {[...Array(itemsPerPage)].map((_, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-[1fr] gap-3 py-4 md:grid-cols-[160px_160px_160px_72px_110px_100px_110px]"
                                >
                                    <PlaceholderAnimation className="h-5 w-32" />
                                    <PlaceholderAnimation className="h-5 w-32" />
                                    <PlaceholderAnimation className="h-5 w-32" />
                                    <PlaceholderAnimation className="h-5 w-8" />
                                    <PlaceholderAnimation className="h-5 w-16" />
                                    <PlaceholderAnimation className="h-5 w-10" />
                                    <PlaceholderAnimation className="h-5 w-16" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="divide-y divide-neutral/10">
                                <div className="grid grid-cols-[1fr] items-center gap-3 py-4 pl-2 md:grid-cols-[160px_160px_160px_72px_110px_100px_110px]">
                                    <div className="font-medium">Time</div>
                                    <div className="font-medium">Host</div>
                                    <div className="font-medium">IP</div>
                                    <div className="font-medium">Port</div>
                                    <div className="font-medium">Status</div>
                                    <div className="font-medium">Latency</div>
                                    <div className="font-medium">Region</div>
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
                                        country,
                                    } = extractPortCheckHistoryData(flowExecution);

                                    // Map port states to user-friendly descriptions using our utility
                                    const portStateTypeValue = mapNmapPortStateToPortStateType(portState);
                                    const fullPortStateDisplay = uppercaseFirstCharacter(
                                        getPortStateDescription(portStateTypeValue),
                                    );

                                    return (
                                        <div
                                            key={flowExecution.id}
                                            className="grid grid-cols-[1fr] items-center gap-3 py-4 pl-2 text-sm hover:bg-light-1 md:grid-cols-[160px_160px_160px_72px_110px_100px_110px] dark:hover:bg-dark-2"
                                        >
                                            {/* Time */}
                                            <div className="">
                                                {iso8601DateWithTime(new Date(flowExecution.createdAt))}
                                                <br />
                                                <span className="text-foreground-tertiary">
                                                    {timeAgo(new Date(flowExecution.createdAt).getTime())}
                                                </span>
                                            </div>

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
                                                {country && (
                                                    <>
                                                        <span>{country.emoji}</span>
                                                        <span title={country.name}>{country.code}</span>
                                                    </>
                                                )}
                                                {!country && <span className="text-foreground-tertiary">-</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                    {(portCheckHistoryQuery.loading || portCheckHistoryQuery.data) && (
                        <div className="flex items-center space-x-4 pt-6">
                            <Pagination
                                className="justify-start"
                                page={page}
                                itemsPerPage={itemsPerPage}
                                itemsTotal={totalChecks}
                                pagesTotal={portCheckHistoryQuery.data?.portCheckHistory.pagination?.pagesTotal ?? 0}
                                useLinks={true}
                                itemsPerPageControl={false}
                                pageInputControl={false}
                            />
                            {totalChecks > 0 && <div className="neutral text-sm">{totalChecks} scans</div>}
                        </div>
                    )}
                </div>
            </div>
        </AuthorizationLayout>
    );
}
