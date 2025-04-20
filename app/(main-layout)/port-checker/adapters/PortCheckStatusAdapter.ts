'use client'; // This adapter uses client-only features

// Dependencies - Types
import { FlowExecutionErrorInterface } from '@project/source/modules/flow/FlowService';
import {
    NmapPortStateType,
    PortCheckFlowExecutionInterface,
} from '@project/source/modules/connected/port-check/PortCheckFlowService';
import { PortCheckStatusItemInterface } from '@project/app/(main-layout)/port-checker/PortCheckStatusAnimatedList';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Services
import {
    PortCheckFlowService,
    PortCheckFlowClientInputInterface,
    PortCheckFlowServiceErrors,
} from '@project/source/modules/connected/port-check/PortCheckFlowService';

// Dependencies - Utilities
import { getCountryEmoji } from '@project/source/modules/connected/grid/utilities/GridUtilities';

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
    private onPortCheckStatusItem: (status: PortCheckStatusItemInterface) => void;

    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        onPortCheckStatusItem: (status: PortCheckStatusItemInterface) => void,
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

        try {
            // Create initial status message
            const countryEmoji = getCountryEmoji(country);

            // Send initial port check status item
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                text: `Checking port ${this.portCheckFlowInput.port} on ${this.portCheckFlowInput.host} from ${countryEmoji} ${country}...`,
                host: this.portCheckFlowInput.host,
                port: this.portCheckFlowInput.port,
                isFinal: false,
            });

            // Execute the port scan flow (validation happens inside the PortCheckFlowService)
            await this.portCheckFlowService.executeFlow(this.portCheckFlowInput);
        }
        catch(error) {
            // Send error port check status item
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                text: error instanceof Error ? error.message : 'Failed to start port scan. Please try again.',
                errorMessage: error instanceof Error ? error.message : undefined,
                systemError: true,
                host: this.portCheckFlowInput.host,
                port: this.portCheckFlowInput.port,
                isFinal: true,
            });
        }
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
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                text: PortCheckFlowServiceErrors.HostResolutionFailed.message,
                systemError: true,
                errorMessage: PortCheckFlowServiceErrors.HostResolutionFailed.message,
                host: host,
                port: port,
                isFinal: true,
            });
            return;
        }

        // Check for "Host is down" error with hostsUp=0
        if(output?.hostsUp === 0 && output?.error?.message?.includes('Host is down')) {
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                text: PortCheckFlowServiceErrors.HostDown.message,
                systemError: true,
                errorMessage: PortCheckFlowServiceErrors.HostDown.message,
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

        // Debug output status
        // console.log('Output status:', output?.status);
        // console.log('Output error:', output?.error);

        // If we have an error
        if(output?.status === 'error' && output?.error?.message) {
            text = `Error scanning ${host}:${port} - ${output.error.message}`;
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
        }

        // Debug final message
        // console.log('Final message:', text);

        // If we don't have enough data but the flow completed
        if(!host || !port) {
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                text: PortCheckFlowServiceErrors.MissingData.message,
                systemError: true,
                isFinal: true,
            });
            return;
        }

        // Send the port check status item with the formatted text
        this.onPortCheckStatusItem({
            portState: portState,
            text: text,
            host: host,
            port: port,
            isFinal: true,
        });
    }

    // Function to handle flow errors
    private onFlowExecutionError(error: FlowExecutionErrorInterface): void {
        console.error('Flow execution error:', error);

        // Process error message for better user experience
        let message = error.message || PortCheckFlowServiceErrors.UnknownError.message;

        // Map error code to error message if we have a code
        if(error.code) {
            // Check if we have a predefined error for this code
            const errorKey = Object.keys(PortCheckFlowServiceErrors).find(
                (key) => PortCheckFlowServiceErrors[key as keyof typeof PortCheckFlowServiceErrors].code === error.code,
            ) as keyof typeof PortCheckFlowServiceErrors | undefined;

            if(errorKey) {
                message = PortCheckFlowServiceErrors[errorKey].message;
            }
        }
        // If no code, try to identify error by message content
        else if(error.message) {
            if(error.message.includes('Failed to resolve host')) {
                message = PortCheckFlowServiceErrors.HostResolutionFailed.message;
            }
            else if(error.message.includes('Host is down')) {
                message = PortCheckFlowServiceErrors.HostDown.message;
            }
            else if(
                error.message.includes('Invalid or disallowed host') ||
                error.message.includes('private IP address')
            ) {
                message = PortCheckFlowServiceErrors.PrivateIpError.message;
            }
            else if(error.message.includes('timeout')) {
                message = PortCheckFlowServiceErrors.ConnectionTimeout.message;
            }
        }

        // Create an error status item
        const portCheckStatusItem: PortCheckStatusItemInterface = {
            text: message,
            portState: PortStateType.Unknown,
            systemError: true,
            errorMessage: error.message,
            isFinal: true, // Mark as final since this is a terminal error
        };

        // Call handler
        this.onPortCheckStatusItem(portCheckStatusItem);
    }
}

// Export - Default
export default PortCheckStatusAdapter;
