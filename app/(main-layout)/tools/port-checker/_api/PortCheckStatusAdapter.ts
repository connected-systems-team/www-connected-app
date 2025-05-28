'use client'; // This adapter uses client-only features

// Dependencies - Types
import {
    NmapPortStateType,
    PortCheckFlowExecutionInterface,
    PortCheckFlowService,
    PortCheckFlowClientInputInterface,
    PortCheckFlowServiceErrors,
} from '@project/app/(main-layout)/tools/port-checker/_api/PortCheckFlowService';
import {
    PortCheckStatusItemProperties,
    PortCheckContentPart,
} from '@project/app/(main-layout)/tools/port-checker/_types/PortCheckTypes';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Base Classes
import { FlowErrorResult } from '@project/app/(main-layout)/tools/_adapters/FlowErrorHandler';
import { BaseFlowAdapter } from '@project/app/(main-layout)/tools/_adapters/BaseFlowAdapter';
import { ToolErrorMappingUtilities } from '@project/app/(main-layout)/tools/_adapters/ToolErrorMappingUtilities';
import { FlowExecutionErrorInterface } from '@project/app/_modules/flow/FlowService';

// Dependencies - Utilities
import { getCountryByName } from '@structure/source/utilities/geo/Countries';

// Type - PortStateType
export enum PortStateType {
    Open = 'Open',
    Closed = 'Closed',
    Filtered = 'Filtered',
    Unfiltered = 'Unfiltered',
    OpenFiltered = 'Open|Filtered',
    ClosedFiltered = 'Closed|Filtered',
    Unknown = 'Unknown',
}

// Function to get a human-readable description of the port state
export function getPortStateDescription(portState: PortStateType): string {
    switch(portState) {
        case PortStateType.Open:
            return 'open';
        case PortStateType.Closed:
            return 'closed';
        case PortStateType.Filtered:
            return 'filtered';
        case PortStateType.Unfiltered:
            return 'unfiltered';
        case PortStateType.OpenFiltered:
            return 'either open or filtered';
        case PortStateType.ClosedFiltered:
            return 'either closed or filtered';
        default:
            return 'unknown';
    }
}

// Function to convert nmap port state to our enum
export function convertNmapPortStateToPortStateType(nmapPortState: NmapPortStateType): PortStateType {
    switch(nmapPortState) {
        case 'open':
            return PortStateType.Open;
        case 'closed':
            return PortStateType.Closed;
        case 'filtered':
            return PortStateType.Filtered;
        case 'unfiltered':
            return PortStateType.Unfiltered;
        case 'open|filtered':
            return PortStateType.OpenFiltered;
        case 'closed|filtered':
            return PortStateType.ClosedFiltered;
        default:
            return PortStateType.Unknown;
    }
}

// Class - PortCheckStatusAdapter
export class PortCheckStatusAdapter extends BaseFlowAdapter<
    PortCheckFlowClientInputInterface,
    PortCheckFlowExecutionInterface['output'],
    PortCheckStatusItemProperties,
    PortCheckFlowService
> {
    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        onPortCheckStatusItem: (status: PortCheckStatusItemProperties) => void,
    ) {
        super(webSocketViaSharedWorker, PortCheckFlowService, onPortCheckStatusItem);
    }

    // Public method to check a port
    public async checkPort(host: string, port: number, country: string): Promise<void> {
        const input: PortCheckFlowClientInputInterface = {
            host: host,
            port: Number(port),
            country: country,
        };

        await this.executeFlow(input);
    }

    // Required abstract method implementations
    protected getAdapterName(): string {
        return 'PortCheckStatusAdapter';
    }

    protected createInitialStatusItem(input: PortCheckFlowClientInputInterface): PortCheckStatusItemProperties {
        // Get country data for flag rendering
        const countryData = getCountryByName(input.country);

        // Create link for host if applicable (port 80 or 443)
        const shouldCreateInitialHostLink = input.port === 80 || input.port === 443;
        const initialHostUrl = shouldCreateInitialHostLink
            ? input.port === 80
                ? `http://${input.host}`
                : `https://${input.host}`
            : undefined;

        // Create structured content with badges
        const initialContent: PortCheckContentPart[] = [
            { type: 'text', content: 'Checking port ' },
            { type: 'badge', variant: 'port', content: input.port.toString() },
            { type: 'text', content: ' on ' },
            {
                type: 'badge',
                variant: 'host',
                content: input.host,
                href: initialHostUrl,
                target: '_blank',
            },
            { type: 'text', content: ' from ' },
            { type: 'badge', variant: 'region', content: input.country },
            { type: 'text', content: '...' },
        ];

        return {
            portState: PortStateType.Unknown,
            content: initialContent,
            text: `Checking port ${input.port} on ${input.host} from ${countryData?.emoji || '🌐'} ${input.country}...`,
            host: input.host,
            port: input.port,
            isFinal: false,
        };
    }

    protected createErrorStatusItem(
        input: PortCheckFlowClientInputInterface,
        message: string,
        errorCode?: string,
    ): PortCheckStatusItemProperties {
        const errorContent: PortCheckContentPart[] = [{ type: 'text', content: message }];

        return {
            portState: PortStateType.Unknown,
            content: errorContent,
            text: message,
            errorCode: errorCode,
            host: input.host,
            port: input.port,
            isFinal: true,
        };
    }

    protected processFlowOutput(
        output: PortCheckFlowExecutionInterface['output'],
        input: PortCheckFlowClientInputInterface,
    ): void {
        // Check for specific error conditions first
        if(output?.hostsUp === 0 && output?.addressesScanned === 0) {
            const errorItem = this.createErrorStatusItem(
                input,
                PortCheckFlowServiceErrors.HostResolutionFailed.message,
                PortCheckFlowServiceErrors.HostResolutionFailed.code,
            );
            this.onResultItem(errorItem);
            return;
        }

        if(output?.hostsUp === 0 && output?.error?.message?.includes('Host is down')) {
            const errorItem = this.createErrorStatusItem(
                input,
                PortCheckFlowServiceErrors.HostDown.message,
                PortCheckFlowServiceErrors.HostDown.code,
            );
            this.onResultItem(errorItem);
            return;
        }

        // Process successful port check results
        if(output?.port) {
            const portState = convertNmapPortStateToPortStateType(output.port.state);
            const portStateDescription = getPortStateDescription(portState);

            // Create link for host if applicable (port 80 or 443)
            const shouldCreateFinalHostLink = input.port === 80 || input.port === 443;
            const finalHostUrl = shouldCreateFinalHostLink
                ? input.port === 80
                    ? `http://${input.host}`
                    : `https://${input.host}`
                : undefined;

            // Create structured content with final status
            const finalContent: PortCheckContentPart[] = [
                { type: 'text', content: 'Port ' },
                { type: 'badge', variant: 'port', content: input.port.toString() },
                { type: 'text', content: ' on ' },
                {
                    type: 'badge',
                    variant: 'host',
                    content: input.host,
                    href: finalHostUrl,
                    target: '_blank',
                },
                { type: 'text', content: ' is ' },
                {
                    type: 'badge',
                    variant: portState === PortStateType.Open ? 'port-state-positive' : 'port-state-negative',
                    content: portStateDescription,
                },
                { type: 'text', content: '.' },
            ];

            const text = `Port ${input.port} on ${input.host} is ${portStateDescription}.`;

            // Send the final result
            this.onResultItem({
                portState: portState,
                content: finalContent,
                text: text,
                host: input.host,
                port: input.port,
                isFinal: true,
            });
        }
        else {
            // No port data in response
            const errorItem = this.createErrorStatusItem(input, 'No port information received.', 'NoPortData');
            this.onResultItem(errorItem);
        }
    }

    // Override to handle port-checker specific errors
    protected processToolSpecificError(error: FlowExecutionErrorInterface): FlowErrorResult | null {
        return ToolErrorMappingUtilities.processErrorWithPatterns(
            error,
            ToolErrorMappingUtilities.getPortCheckerErrorPatterns(),
        );
    }
}
