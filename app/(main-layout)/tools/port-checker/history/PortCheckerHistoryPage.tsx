'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { useUrlSearchParameters } from '@structure/source/utilities/next/NextNavigation';

// Dependencies - Types
import {
    NmapPortStateType,
    PortCheckFlowOutputInterface,
} from '@project/app/(main-layout)/tools/port-checker/_api/PortCheckFlowService';

// Dependencies - Main Components
import { AuthorizationLayout } from '@structure/source/layouts/AuthorizationLayout';
import { ToolsNavigationTrail } from '@project/app/(main-layout)/tools/_navigation/ToolsNavigationTrail';
import { Table } from '@structure/source/common/tables/Table';
import { TableColumnProperties, TableColumnType } from '@structure/source/common/tables/TableColumn';
import { TableRowProperties } from '@structure/source/common/tables/TableRow';
import { Link } from '@structure/source/common/navigation/Link';

// Dependencies - API
import { useQuery } from '@apollo/client';
import {
    NetworkToolHistoryDocument,
    OrderByDirection,
    FlowExecution,
    FlowStepExecution,
    ConnectedToolType,
} from '@project/app/_api/graphql/GraphQlGeneratedCode';

// Dependencies - Assets
import CheckIcon from '@structure/assets/icons/status/CheckIcon.svg';
import ErrorIcon from '@structure/assets/icons/status/ErrorIcon.svg';

// Dependencies - Common Components
import { Flag } from '@project/app/_assets/icons/flags/Flag';

// Dependencies - Utilities
import { uppercaseFirstCharacter } from '@structure/source/utilities/String';
import { iso8601DateWithTime, timeAgo } from '@structure/source/utilities/Time';
import { CountryInterface, getCountryByName } from '@structure/source/utilities/geo/Countries';
import { isIpAddress } from '@structure/source/utilities/network/IpAddress';
import { DomainValidation } from '@project/app/(main-layout)/tools/_utilities/ToolValidationUtilities';
import {
    getPortStateDescription,
    convertNmapPortStateToPortStateType,
} from '@project/app/(main-layout)/tools/port-checker/_api/PortCheckStatusAdapter';

// Type - PortCheckFlowExecutionStepInput
// Based on the new GraphQL response field structure
interface PortCheckFlowStepExecutionInputInterface {
    host: string;
    port: number;
    regionId: string; // Field is 'regionId' in the new format
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

// Utility functions for creating links
function createLinkForValue(value: string, displayValue?: React.ReactNode) {
    if(isIpAddress(value)) {
        return (
            <Link
                href={`/ip-addresses/${value}`}
                target="_blank"
                prefetch={false}
                variant="Unstyled"
                className="font-medium hover:underline"
            >
                {displayValue || value}
            </Link>
        );
    }
    else if(DomainValidation.validateDomain(value).isValid) {
        return (
            <Link
                href={`/domains/${value}`}
                target="_blank"
                prefetch={false}
                variant="Unstyled"
                className="font-medium hover:underline"
            >
                {displayValue || value}
            </Link>
        );
    }
    else {
        // Not a valid domain or IP, just return the display value
        return displayValue || value;
    }
}

function createPortLink(port: string) {
    return (
        <Link href={`/ports/${port}`} target="_blank" prefetch={false} variant="Unstyled" className="hover:underline">
            {port}
        </Link>
    );
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
        // Check if this is a port scan step with input
        if(step.actionType === 'PortCheckNode' && step.input) {
            // Try to extract the step input and output
            try {
                // Parse input if it's a string, otherwise use as is
                const input =
                    typeof step.input === 'string'
                        ? (JSON.parse(step.input) as PortCheckFlowStepExecutionInputInterface)
                        : (step.input as PortCheckFlowStepExecutionInputInterface);

                // Extract host name and port from input
                hostName = input.host || hostName;
                port = input.port ? input.port.toString() : port;

                // Parse output if it exists
                if(step.output) {
                    const output =
                        typeof step.output === 'string'
                            ? (JSON.parse(step.output) as PortCheckFlowStepExecutionOutputInterface)
                            : (step.output as PortCheckFlowStepExecutionOutputInterface);

                    // Extract IP from output
                    hostIp = output.hostIpAddress || hostIp;

                    // Extract port state from output
                    if(output.port) {
                        portState = (output.port.state as NmapPortStateType) || portState;
                    }

                    // Extract latency data and format as milliseconds with commas
                    if(output.latency) {
                        // Remove 's' suffix if present (e.g., "0.0012s")
                        const latencyValue = output.latency.replace('s', '');
                        // Convert from seconds to milliseconds and format with commas
                        const latencyInMs = parseFloat(latencyValue) * 1000;
                        latencyInMilliseconds =
                            latencyInMs.toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' ms';
                    }
                    else {
                        latencyInMilliseconds = 'N/A';
                    }
                }
                else {
                    // No output means the step failed - set appropriate defaults
                    hostIp = 'Failed';
                    portState = 'unknown';
                    latencyInMilliseconds = 'N/A';
                }
            }
            catch(error) {
                console.error('Error parsing port scan step input/output', error);
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
    const portCheckHistoryQuery = useQuery(NetworkToolHistoryDocument, {
        variables: {
            input: {
                networkTool: ConnectedToolType.PortCheck,
            },
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
            if(portCheckHistoryQuery.data?.networkToolHistory.pagination?.itemsTotal) {
                setTotalChecks(portCheckHistoryQuery.data.networkToolHistory.pagination.itemsTotal);
            }
        },
        [portCheckHistoryQuery.data?.networkToolHistory.pagination?.itemsTotal],
    );

    // Data - Cast the flowExecutions as PortCheckFlowExecutionInterface[]
    const flowExecutions = (portCheckHistoryQuery.data?.networkToolHistory.items ||
        []) as PortCheckFlowExecutionInterface[];

    // Structure Table Data - Convert flowExecutions to table format
    const tableColumns: TableColumnProperties[] = [
        {
            identifier: 'host',
            title: 'Input',
            type: TableColumnType.String,
        },
        {
            identifier: 'ip',
            title: 'IP Address',
            type: TableColumnType.String,
        },
        {
            identifier: 'port',
            title: 'Port',
            type: TableColumnType.String,
        },
        {
            identifier: 'status',
            title: 'Status',
            type: TableColumnType.String,
        },
        {
            identifier: 'latency',
            title: 'Latency',
            type: TableColumnType.String,
        },
        {
            identifier: 'region',
            title: 'Region',
            type: TableColumnType.String,
        },
        {
            identifier: 'time',
            title: 'Time',
            type: TableColumnType.DateTime,
        },
    ];

    const tableRows: TableRowProperties[] = flowExecutions.map(function (flowExecution) {
        const { hostName, hostIp, port, portState, portIsOpen, latencyInMilliseconds, country } =
            extractPortCheckHistoryData(flowExecution);

        const portStateTypeValue = convertNmapPortStateToPortStateType(portState);
        const fullPortStateDisplay = uppercaseFirstCharacter(getPortStateDescription(portStateTypeValue));

        return {
            cells: [
                {
                    value: hostName === 'Unknown' ? undefined : hostName,
                    children:
                        hostName === 'Unknown' ? undefined : (
                            <div className="break-all" title={hostName}>
                                {createLinkForValue(hostName, <span className="font-medium">{hostName}</span>)}
                            </div>
                        ),
                },
                {
                    value: hostIp === 'Unknown' || hostIp === 'Failed' ? undefined : hostIp,
                    children: hostIp === 'Unknown' || hostIp === 'Failed' ? undefined : createLinkForValue(hostIp),
                },
                {
                    value: port === 'Unknown' ? undefined : port,
                    children: port === 'Unknown' ? undefined : createPortLink(port),
                },
                {
                    value: fullPortStateDisplay,
                    children: (
                        <div
                            className={`inline-flex items-center space-x-2 rounded-lg px-2 py-1 text-xs ${
                                portIsOpen
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            }`}
                        >
                            {portIsOpen ? <CheckIcon className="h-4 w-4" /> : <ErrorIcon className="h-4 w-4" />}
                            <span>{fullPortStateDisplay}</span>
                        </div>
                    ),
                },
                {
                    value: latencyInMilliseconds === 'N/A' ? undefined : latencyInMilliseconds,
                    children: latencyInMilliseconds === 'N/A' ? undefined : latencyInMilliseconds,
                },
                {
                    value: country ? `${country.name} ${country.code}` : undefined,
                    children: country ? (
                        <div className="inline-flex items-center space-x-1 rounded-lg bg-background-secondary py-1 pl-1 pr-2 text-xs">
                            <Flag countryCode={country.code} className="h-4 w-6" />
                            <span title={country.name}>{country.code}</span>
                        </div>
                    ) : undefined,
                },
                {
                    value: iso8601DateWithTime(new Date(flowExecution.createdAt)),
                    children: (
                        <div>
                            <div>{iso8601DateWithTime(new Date(flowExecution.createdAt))}</div>
                            <div className="text-sm text-foreground-tertiary">
                                {timeAgo(new Date(flowExecution.createdAt).getTime())}
                            </div>
                        </div>
                    ),
                },
            ],
        };
    });

    // Render the component
    return (
        <AuthorizationLayout>
            <div className="container pt-10">
                <ToolsNavigationTrail />

                <h1>Port Checker History</h1>

                <div className="mt-6">
                    <Table
                        className="[&_td:first-child]:pl-3 [&_th:first-child]:pl-3"
                        columns={tableColumns}
                        rows={tableRows}
                        loading={portCheckHistoryQuery.loading}
                        error={
                            portCheckHistoryQuery.error
                                ? {
                                      message: portCheckHistoryQuery.error.message,
                                  }
                                : undefined
                        }
                        search={true}
                        filter={true}
                        columnVisibility={true}
                        rowSelection={false}
                        pagination={{
                            page: page,
                            itemsPerPage: itemsPerPage,
                            itemsTotal: totalChecks,
                            pagesTotal: portCheckHistoryQuery.data?.networkToolHistory.pagination?.pagesTotal ?? 0,
                            useLinks: true,
                            itemsPerPageControl: true,
                            pageInputControl: false,
                        }}
                    />
                </div>
            </div>
        </AuthorizationLayout>
    );
}
