'use client'; // This adapter uses client-only features

// Dependencies - Types
import { FlowExecutionErrorInterface } from '@project/source/modules/flow/FlowService';
import {
    NmapPortStateType,
    PortScanFlowExecutionInterface,
} from '@project/source/modules/connected/port-scan/PortScanFlowService';
import { PortCheckStatusItemInterface } from '@project/app/(main-layout)/port-checker/PortCheckStatusAnimatedList';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Services
import {
    PortScanFlowService,
    PortScanFlowClientInputInterface,
} from '@project/source/modules/connected/port-scan/PortScanFlowService';

// Dependencies - Utilities
import { getRegionMetadata } from '@project/source/modules/connected/grid/utilities/GridUtilities';

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
    private portScanFlowInput?: PortScanFlowClientInputInterface;
    private portScanFlowService: PortScanFlowService;
    private onPortCheckStatusItem: (status: PortCheckStatusItemInterface) => void;

    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        onPortCheckStatusItem: (status: PortCheckStatusItemInterface) => void,
    ) {
        // Set the event handler
        this.onPortCheckStatusItem = onPortCheckStatusItem;

        // Create the flow service
        this.portScanFlowService = new PortScanFlowService(webSocketViaSharedWorker, {
            onFlowExecutionComplete: this.onFlowExecutionComplete.bind(this),
            onFlowExecutionError: this.onFlowExecutionError.bind(this),
        });
    }

    // Function to check a port
    public async checkPort(host: string, port: number, regionIdentifier: string) {
        // Save the port scan flow input to reference later
        this.portScanFlowInput = {
            host: host,
            port: port,
            regionIdentifier: regionIdentifier,
        };

        try {
            // Create initial status message
            const regionMetadata = getRegionMetadata(regionIdentifier);

            // Send initial port check status item
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                text: `Checking port ${this.portScanFlowInput.port} on ${this.portScanFlowInput.host} from ${regionMetadata.emoji} ${regionMetadata.displayName}...`,
                host: this.portScanFlowInput.host,
                port: this.portScanFlowInput.port,
                isFinal: false,
            });

            // Execute the port scan flow (validation happens inside the PortScanFlowService)
            await this.portScanFlowService.executeFlow(this.portScanFlowInput);
        }
        catch(error) {
            // Send error port check status item
            this.onPortCheckStatusItem({
                portState: PortStateType.Unknown,
                text: error instanceof Error ? error.message : 'Failed to start port scan. Please try again.',
                errorMessage: error instanceof Error ? error.message : undefined,
                systemError: true,
                host: this.portScanFlowInput.host,
                port: this.portScanFlowInput.port,
                isFinal: true,
            });
        }
    }

    // Function to clean up resources
    public dispose() {
        this.portScanFlowService.dispose();
    }

    // Function to handle flow step updates
    private onFlowExecutionComplete(portScanFlowStepExecution: PortScanFlowExecutionInterface): void {
        const portState = portScanFlowStepExecution.output?.ports?.[0]?.state
            ? mapNmapPortStateToPortStateType(portScanFlowStepExecution.output?.ports?.[0]?.state as NmapPortStateType)
            : PortStateType.Unknown;

        const text = 'HI HI HI';

        this.onPortCheckStatusItem({
            portState: portState,
            text: text,
            host: this.portScanFlowInput?.host,
            port: this.portScanFlowInput?.port,
            isFinal: true,
        });
    }

    // Function to handle flow errors
    private onFlowExecutionError(error: FlowExecutionErrorInterface): void {
        // Process error message for better user experience
        let message = error.message || 'An unknown error occurred during port scanning.';

        // Special handling for known error types
        if(error.message) {
            if(error.message.includes('Failed to resolve host')) {
                message = 'Failed to resolve host. The hostname could not be found.';
            }
            else if(error.message.includes('Host is down')) {
                message = 'Host is down or not responding.';
            }
            else if(error.message.includes('Invalid or disallowed host')) {
                message = 'This is a private or disallowed IP address.';
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
