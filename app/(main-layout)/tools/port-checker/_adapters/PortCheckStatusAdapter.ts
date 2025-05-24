'use client'; // This adapter uses client-only features

// Dependencies - Types
import { FlowExecutionErrorInterface } from '@project/source/modules/flow/FlowService';
import {
    NmapPortStateType,
    PortCheckFlowExecutionInterface,
} from '@project/source/modules/connected/port-check/PortCheckFlowService';
import {
    PortCheckStatusItemProperties,
    PortCheckContentPart,
} from '@project/app/(main-layout)/tools/port-checker/_types/PortCheckTypes';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Services
import { FlowServiceErrors } from '@project/source/modules/flow/FlowService';
import {
    PortCheckFlowService,
    PortCheckFlowClientInputInterface,
    PortCheckFlowServiceErrors,
} from '@project/source/modules/connected/port-check/PortCheckFlowService';

// Dependencies - Utilities
import { getCountryEmojiByCountryName } from '@structure/source/utilities/geo/Countries';

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
            return 'in an unknown state';
    }
}

// Function to convert NmapPortStateType to PortStateType
export function mapNmapPortStateToPortStateType(nmapPortState: NmapPortStateType): PortStateType {
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
export class PortCheckStatusAdapter {
    private portCheckFlowInput?: PortCheckFlowClientInputInterface;
    private portCheckFlowService: PortCheckFlowService;
    private onPortCheckStatusItem: (status: PortCheckStatusItemProperties) => void;

    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        onPortCheckStatusItem: (status: PortCheckStatusItemProperties) => void,
    ) {
        // Set the event handler
        this.onPortCheckStatusItem = onPortCheckStatusItem;

        // Create the flow service
        this.portCheckFlowService = new PortCheckFlowService(webSocketViaSharedWorker, {
            onFlowExecutionComplete: this.onFlowExecutionComplete.bind(this),
            onFlowExecutionError: this.onFlowExecutionError.bind(this),
        });
    }

    // Function to check a port
    public async checkPort(host: string, port: number, country: string) {
        // Save the port scan flow input to reference later
        this.portCheckFlowInput = {
            host: host,
            port: Number(port),
            country: country,
        };

        // Create initial status message first (this will be shown regardless of success/failure)
        const countryEmoji = getCountryEmojiByCountryName(country);

        // Create link for host if applicable (port 80 or 443)
        const shouldCreateInitialHostLink = (this.portCheckFlowInput.port === 80 || this.portCheckFlowInput.port === 443);
        const initialHostUrl = shouldCreateInitialHostLink
            ? this.portCheckFlowInput.port === 80
                ? `http://${this.portCheckFlowInput.host}`
                : `https://${this.portCheckFlowInput.host}`
            : undefined;

        // Create structured content with badges
        const initialContent: PortCheckContentPart[] = [
            { type: 'text', content: 'Checking port ' },
            { type: 'badge', variant: 'port', content: this.portCheckFlowInput.port.toString() },
            { type: 'text', content: ' on ' },
            { 
                type: 'badge', 
                variant: 'host', 
                content: this.portCheckFlowInput.host,
                href: initialHostUrl,
                target: '_blank'
            },
            { type: 'text', content: ' from ' },
            { type: 'badge', variant: 'region', content: `${countryEmoji} ${country}` },
        ];

        // Send initial port check status item
        this.onPortCheckStatusItem({
            portState: PortStateType.Unknown,
            content: initialContent,
            text: `Checking port ${this.portCheckFlowInput.port} on ${this.portCheckFlowInput.host} from ${countryEmoji} ${country}`,
            host: this.portCheckFlowInput.host,
            port: this.portCheckFlowInput.port,
            isFinal: false,
        });

        // Execute the port scan flow (validation happens inside the PortCheckFlowService)
        // Error handling is done via the onFlowExecutionError callback registered in the constructor
        await this.portCheckFlowService.executeFlow(this.portCheckFlowInput);
    }

    // Function to clean up resources
    public dispose() {
        this.portCheckFlowService.dispose();
    }

    // Function to handle flow execution completion
    private onFlowExecutionComplete(portCheckFlowExecution: PortCheckFlowExecutionInterface): void {
        // Debug logging
        console.log('onFlowExecutionComplete', portCheckFlowExecution);

        // Extract the output for early checks
        const output = portCheckFlowExecution.output;
        const host = this.portCheckFlowInput?.host;
        const port = this.portCheckFlowInput?.port;

        // Check if this is a domain resolution failure (hostsUp=0, addressesCheckned=0)
        if(output?.hostsUp === 0 && output?.addressesScanned === 0) {
            const errorContent: PortCheckContentPart[] = [
                { type: 'text', content: PortCheckFlowServiceErrors.HostResolutionFailed.message },
            ];
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                content: errorContent,
                text: PortCheckFlowServiceErrors.HostResolutionFailed.message,
                errorCode: PortCheckFlowServiceErrors.HostResolutionFailed.code,
                host: host,
                port: port,
                isFinal: true,
            });
            return;
        }

        // Check for "Host is down" error with hostsUp=0
        if(output?.hostsUp === 0 && output?.error?.message?.includes('Host is down')) {
            const errorContent: PortCheckContentPart[] = [
                { type: 'text', content: PortCheckFlowServiceErrors.HostDown.message },
            ];
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                content: errorContent,
                text: PortCheckFlowServiceErrors.HostDown.message,
                errorCode: PortCheckFlowServiceErrors.HostDown.code,
                host: host,
                port: port,
                isFinal: true,
            });
            return;
        }

        // Check for "Host unreachable" error
        if(output?.error?.message?.includes('unreachable') || output?.error?.message?.includes('cannot be reached')) {
            const errorContent: PortCheckContentPart[] = [
                { type: 'text', content: PortCheckFlowServiceErrors.HostUnreachable.message },
            ];
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                content: errorContent,
                text: PortCheckFlowServiceErrors.HostUnreachable.message,
                errorCode: PortCheckFlowServiceErrors.HostUnreachable.code,
                host: host,
                port: port,
                isFinal: true,
            });
            return;
        }

        // Extract the port state from the flow execution output
        let portState = PortStateType.Unknown;

        // Safely extract the port state if it exists
        const portData = output?.port;
        if(portData && portData.state) {
            // console.log('Port state from server:', portData.state);
            portState = mapNmapPortStateToPortStateType(portData.state as NmapPortStateType);
        }

        // Extract other useful information
        const ipAddress = output?.hostIpAddress;
        const hostName = output?.hostName;
        // const serviceName = portData?.service;
        // const scanTime = output?.scanTime;
        // const latency = output?.latency;

        // Create a descriptive status message
        let text = '';
        let finalContent: PortCheckContentPart[] = [];

        // Debug output status
        // console.log('Output status:', output?.status);
        // console.log('Output error:', output?.error);

        // If we have an error
        if(output?.status === 'error' && output?.error?.message) {
            text = `Error scanning ${host}:${port} - ${output.error.message}`;
            finalContent = [
                { type: 'text', content: 'Error scanning ' },
                { type: 'badge', variant: 'host', content: host || '' },
                { type: 'text', content: ':' },
                { type: 'badge', variant: 'port', content: port?.toString() || '' },
                { type: 'text', content: ' - ' },
                { type: 'badge', variant: 'port-state-negative', content: 'Error' },
                { type: 'text', content: `: ${output.error.message}` },
            ];
        }
        // If scan completed successfully
        else {
            // Format host display (showing resolved IP if domain was used)
            // const hostDisplay =
            //     hostName && ipAddress && hostName !== ipAddress ? `${hostName} (${ipAddress})` : ipAddress || host;
            const hostDisplay = hostName && ipAddress && hostName !== ipAddress ? `${hostName}` : ipAddress || host;

            // Format port state with service name if available
            const portStateDescription = getPortStateDescription(portState);
            // const portStateWithService = serviceName
            //     ? `${portStateDescription} (${serviceName})`
            //     : portStateDescription;
            const portStateWithService = portStateDescription;

            // Construct the main message
            text = `Port ${port} on ${hostDisplay} is ${portStateWithService}.`;

            // Create structured content with link for host if applicable
            const shouldCreateHostLink = (port === 80 || port === 443) && hostDisplay;
            const hostUrl = shouldCreateHostLink
                ? port === 80
                    ? `http://${hostDisplay}`
                    : `https://${hostDisplay}`
                : undefined;

            // Determine port state badge variant
            const isNegativeState = 
                portState === PortStateType.Closed ||
                portState === PortStateType.Filtered ||
                portState === PortStateType.ClosedFiltered ||
                portState === PortStateType.Unknown;
            const portStateBadgeVariant = isNegativeState ? 'port-state-negative' : 'port-state-positive';

            finalContent = [
                { type: 'text', content: 'Port ' },
                { type: 'badge', variant: 'port', content: port?.toString() || '' },
                { type: 'text', content: ' on ' },
                {
                    type: 'badge',
                    variant: 'host',
                    content: hostDisplay || '',
                    href: hostUrl,
                    target: '_blank',
                },
                { type: 'text', content: ' is ' },
                { type: 'badge', variant: portStateBadgeVariant, content: portStateWithService },
                { type: 'text', content: '.' },
            ];
        }

        // Debug final message
        // console.log('Final message:', text);

        // If we don't have enough data but the flow completed
        if(!host || !port) {
            const errorContent: PortCheckContentPart[] = [
                { type: 'text', content: PortCheckFlowServiceErrors.MissingData.message },
            ];
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                content: errorContent,
                text: PortCheckFlowServiceErrors.MissingData.message,
                errorCode: PortCheckFlowServiceErrors.MissingData.code,
                isFinal: true,
            });
            return;
        }

        // Send the port check status item with the formatted text
        this.onPortCheckStatusItem({
            portState: portState,
            content: finalContent,
            text: text,
            host: host,
            port: port,
            isFinal: true,
        });
    }

    // Function to handle flow errors
    private onFlowExecutionError(
        error: FlowExecutionErrorInterface,
        flowExecution?: PortCheckFlowExecutionInterface,
    ): void {
        console.error('Flow execution error:', error, 'Flow execution:', flowExecution);

        if(flowExecution && flowExecution.errors) {
            // Loop through and log the errors
            for(const error of flowExecution.errors) {
                console.log('Flow execution error item:', error);
            }
        }

        // If we have a flow execution with output data, use the normal flow completion handler
        // This handles cases where the flow "failed" but we still got useful output
        if(flowExecution?.output) {
            console.log('Using flow execution output for error handling');
            this.onFlowExecutionComplete(flowExecution);
            return;
        }

        // No flow execution with output, fall back to basic error handling
        // Extract host and port from the input if available
        const host = this.portCheckFlowInput?.host;
        const port = this.portCheckFlowInput?.port;

        // Process error message for better user experience
        let message = error.message || PortCheckFlowServiceErrors.UnknownError.message;
        // Default error code as a string to be used in the UI
        let errorCode: string = FlowServiceErrors.FlowError.code;

        // Check if this is a network error
        const isNetworkError =
            (error.message &&
                (error.message.includes('Failed to fetch') ||
                    error.message.includes('network') ||
                    error.message.includes('ERR_INTERNET_DISCONNECTED') ||
                    error.message.includes('ERR_CONNECTION_REFUSED'))) ||
            error.code === FlowServiceErrors.ExecutionFailed.code;

        if(isNetworkError) {
            errorCode = FlowServiceErrors.NetworkConnectionError.code;
            message = FlowServiceErrors.NetworkConnectionError.message;
        }
        // If we have an error code, use it directly
        else if(error.code) {
            errorCode = error.code;
        }
        // Otherwise try to find a matching error from the message text
        else if(error.message) {
            const errorMessageLower = error.message.toLowerCase();

            // Try to detect specific errors from the message text
            if(errorMessageLower.includes('failed to resolve host')) {
                errorCode = PortCheckFlowServiceErrors.HostResolutionFailed.code;
                message = PortCheckFlowServiceErrors.HostResolutionFailed.message;
            }
            else if(errorMessageLower.includes('host is down')) {
                errorCode = PortCheckFlowServiceErrors.HostDown.code;
                message = PortCheckFlowServiceErrors.HostDown.message;
            }
            else if(errorMessageLower.includes('invalid or disallowed host')) {
                errorCode = PortCheckFlowServiceErrors.DisallowedHost.code;
                message = PortCheckFlowServiceErrors.DisallowedHost.message;
            }
            else if(errorMessageLower.includes('private ip address')) {
                errorCode = PortCheckFlowServiceErrors.PrivateIpError.code;
                message = PortCheckFlowServiceErrors.PrivateIpError.message;
            }
            else if(
                errorMessageLower.includes('not a valid ip address') ||
                errorMessageLower.includes('octets must be between')
            ) {
                errorCode = PortCheckFlowServiceErrors.InvalidIpError.code;
                message = PortCheckFlowServiceErrors.InvalidIpError.message;
            }
            else if(errorMessageLower.includes('ipv6')) {
                errorCode = PortCheckFlowServiceErrors.Ipv6NotSupportedError.code;
                message = PortCheckFlowServiceErrors.Ipv6NotSupportedError.message;
            }
            else if(errorMessageLower.includes('timeout')) {
                errorCode = PortCheckFlowServiceErrors.ConnectionTimeout.code;
                message = PortCheckFlowServiceErrors.ConnectionTimeout.message;
            }
            else if(errorMessageLower.includes('no regions available')) {
                errorCode = PortCheckFlowServiceErrors.RegionsUnavailable.code;
                message = PortCheckFlowServiceErrors.RegionsUnavailable.message;
            }
        }

        // Create an error status item
        const errorContent: PortCheckContentPart[] = [{ type: 'text', content: message }];
        const portCheckStatusItem: PortCheckStatusItemProperties = {
            content: errorContent,
            text: message,
            portState: PortStateType.Unknown,
            errorCode: errorCode,
            host: host,
            port: port,
            isFinal: true, // Mark as final since this is a terminal error
        };

        // Call handler
        this.onPortCheckStatusItem(portCheckStatusItem);
    }
}
