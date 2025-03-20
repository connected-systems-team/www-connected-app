// Dependencies - Types
import { FlowErrorInterface } from '@project/source/modules/flow/types/FlowTypes';

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
        case PortStateType.Unknown:
            return 'in an unknown state';
    }
}

// Type - PortScanErrorCode - Specific error codes for port scanning
export enum PortScanErrorCode {
    // Host resolution errors
    HostNotFound = 'HostNotFound', // Domain name could not be resolved to an IP
    InvalidHostname = 'InvalidHostname', // Hostname format is invalid
    DnsResolutionFailed = 'DnsResolutionFailed', // DNS resolution process failed

    // Connectivity errors
    HostUnreachable = 'HostUnreachable', // Host exists but cannot be reached (e.g., firewall)
    HostDown = 'HostDown', // Host is not responding to any probes
    ConnectionTimeout = 'ConnectionTimeout', // Connection attempt timed out

    // Service errors
    ScanFailed = 'ScanFailed', // The scan operation failed for a non-specific reason
    ScanTimedOut = 'ScanTimedOut', // The scan operation exceeded the maximum allowed time

    // System errors
    SystemError = 'SystemError', // Internal server or application error
    ApiError = 'ApiError', // Error from external API or service call
}

// Type - PortScanErrorInterface - Port scan specific error information
export interface PortScanErrorInterface extends FlowErrorInterface {
    // The host that was being scanned when the error occurred
    host?: string;
    // The port that was being scanned when the error occurred
    port?: number;
    // The region identifier where the scan was being executed
    regionIdentifier?: string;
    // A specific error code from PortScanErrorCode enum
    code?: PortScanErrorCode;
}

// Server Type - NmapPortStateType - Possible states for a port from nmap
export type NmapPortStateType =
    | 'open'
    | 'closed'
    | 'filtered'
    | 'unfiltered'
    | 'open|filtered'
    | 'closed|filtered'
    | 'unknown';

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
