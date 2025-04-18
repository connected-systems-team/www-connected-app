'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowService,
    FlowExecutionInterface,
    FlowInputValidationResultInterface,
} from '@project/source/modules/flow/FlowService';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { PortScanCreateDocument } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - Utilities
import { isIpV4Address, isIpV6Address, isPrivateIpAddress } from '@structure/source/utilities/network/IpAddress';

// Server Type - NmapPortStateType - Possible states for a port from nmap
export type NmapPortStateType =
    | 'open'
    | 'closed'
    | 'filtered'
    | 'unfiltered'
    | 'open|filtered'
    | 'closed|filtered'
    | 'unknown';

// Type - PortScanFlowServiceErrors
export const PortScanFlowServiceErrors = {
    // Validation errors
    PrivateIpError: {
        code: 'PrivateIpError',
        message: 'This is a private or disallowed IP address.',
    },
    InvalidHostError: {
        code: 'InvalidHostError',
        message: 'Invalid hostname format.',
    },
    InvalidPortError: {
        code: 'InvalidPortError',
        message: 'Invalid port number. Port must be between 1 and 65535.',
    },

    // Host resolution errors
    HostResolutionFailed: {
        code: 'HostResolutionFailed',
        message: 'Failed to resolve host. The hostname could not be found.',
    },

    // Connectivity errors
    HostUnreachable: {
        code: 'HostUnreachable',
        message: 'Host exists but cannot be reached. It may be behind a firewall.',
    },
    HostDown: {
        code: 'HostDown',
        message: 'Host is down or not responding.',
    },
    ConnectionTimeout: {
        code: 'ConnectionTimeout',
        message: 'Connection attempt timed out. The host may be blocking scans or is unreachable.',
    },
    ConnectionError: {
        code: 'ConnectionError',
        message: 'Connection error occurred during port scan.',
    },
    
    // General errors
    UnknownError: {
        code: 'UnknownError',
        message: 'An unknown error occurred during port scanning.',
    },
    InternalServerError: {
        code: 'InternalServerError',
        message: 'Internal server error: The port check service is currently experiencing issues.',
    },
    
    // Results issues
    MissingData: {
        code: 'MissingData',
        message: "Port scan completed but couldn't determine exact status.",
    }
} as const;

// Type - PortScanFlowClientInputInterface - Input for a new port scan from the client
export interface PortScanFlowClientInputInterface {
    host: string;
    port: number;
    regionIdentifier: string; // E.g., north-america
}

// Server Type - PortScanFlowInputInterface - Input for a port scan flow step
export interface PortScanFlowInputInterface {
    host: string;
    ports?: Array<string | { port: string }>;
    region?: string;
    maxAttemps?: number;
}

// Server Type - PortScanFlowOutputInterface - Output for a port scan flow
export interface PortScanFlowOutputInterface {
    status: 'success' | 'error' | 'mismatch';
    ipAddress?: string;
    addressesScanned: number;
    // When a domain resolves to multiple IPs
    additionalIps?: string[];
    // hostsUp - Not the same as additionalIps.length because additionalIps can be empty
    // Used to determine if someone put in an invalid IP address
    hostsUp: number;
    hostName?: string;
    ports?: Array<{
        port: string;
        state: NmapPortStateType;
        // If the port state is different from the expected state in monitoring
        mismatch: boolean;
        // If nmap returns a service name that is listening on the port, e.g., http
        service?: string;
    }>;
    // The time it took in seconds to perform the scan
    scanTime: string;
    // This will only exist if a scan is succesful, the time it took to get a response
    latency?: string;
    error?: {
        message?: string;
        host?: string;
        port?: string;
    };
}

// Type - PortScanFlowExecutionInterface
export interface PortScanFlowExecutionInterface
    extends FlowExecutionInterface<PortScanFlowInputInterface, PortScanFlowOutputInterface> {}

// Class - PortScanFlowService
export class PortScanFlowService extends FlowService<PortScanFlowInputInterface, PortScanFlowOutputInterface> {
    // Function to override validateInput to add port scan specific validation
    protected validateInput(input: PortScanFlowClientInputInterface): FlowInputValidationResultInterface {
        // Validate host - Check for private IP addresses (only for IPv4)
        if(isIpV4Address(input.host) && isPrivateIpAddress(input.host)) {
            return {
                isValid: false,
                error: {
                    code: PortScanFlowServiceErrors.PrivateIpError.code,
                    message: `${input.host} is a private IP address and cannot be scanned.`,
                },
            };
        }

        // Validate hostname format if not IPv6
        if(!isIpV6Address(input.host)) {
            const domainPattern = /^[a-zA-Z0-9][-a-zA-Z0-9.]{0,253}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/;
            const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

            // This is not a valid domain name or IPv4 pattern
            if(!domainPattern.test(input.host) && !ipPattern.test(input.host)) {
                // Only show this if it's likely to fail host resolution
                // Allow IPv6 addresses which often don't have dots
                if(!input.host.includes('.') && !input.host.includes(':')) {
                    return {
                        isValid: false,
                        error: {
                            code: PortScanFlowServiceErrors.InvalidHostError.code,
                            message: PortScanFlowServiceErrors.InvalidHostError.message,
                        },
                    };
                }
            }
        }

        // Validate port number
        if(input.port < 1 || input.port > 65535) {
            return {
                isValid: false,
                error: {
                    code: PortScanFlowServiceErrors.InvalidPortError.code,
                    message: PortScanFlowServiceErrors.InvalidPortError.message,
                },
            };
        }

        // All validations passed
        return { isValid: true };
    }

    // Function to create a new flow execution
    protected async createFlowExecution(input: PortScanFlowClientInputInterface): Promise<string> {
        // Execute the port scan mutation to create the flow
        const portScanMutation = await apolloClient.mutate({
            mutation: PortScanCreateDocument,
            variables: {
                input: {
                    host: input.host,
                    ports: [input.port.toString()],
                    region: input.regionIdentifier,
                },
            },
        });

        // If the mutation failed, throw an error
        if(!portScanMutation.data?.portScanCreate) {
            throw new Error('Failed to create port scan.');
        }

        // Return the flow execution ID
        return portScanMutation.data.portScanCreate;
    }
}

// Export - Default
export default PortScanFlowService;
