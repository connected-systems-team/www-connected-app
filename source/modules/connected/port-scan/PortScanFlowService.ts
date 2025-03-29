'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowService,
    FlowStepExecutionInterface,
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

// Type - PortScanFlowInputInterface - Input for a new port scan
export interface PortScanFlowInputInterface {
    host: string;
    port: number;
    regionIdentifier: string; // E.g., north-america
}

// Server Type - PortScanFlowStepInputInterface - Input for a port scan flow step
export interface PortScanFlowStepInputInterface extends Record<string, unknown> {
    host: string;
    ports?: Array<string | { port: string }>;
    region?: string;
}

// Server Type - PortScanFlowStepOutputInterface - Output for a port scan flow step
export interface PortScanFlowStepOutputInterface extends Record<string, unknown> {
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

// Type - PortScanFlowServiceErrors
export const PortScanFlowServiceErrors = {
    // Validation errors
    PrivateIpError: {
        code: 'PrivateIpError',
        message: 'Private IP addresses cannot be scanned',
    },
    InvalidHostError: {
        code: 'InvalidHostError',
        message: 'Invalid hostname format',
    },
    InvalidPortError: {
        code: 'InvalidPortError',
        message: 'Invalid port number',
    },

    // Host resolution errors
    HostResolutionFailed: {
        code: 'HostResolutionFailed',
        message: 'Domain name could not be resolved via DNS',
    },

    // Connectivity errors
    HostUnreachable: {
        code: 'HostUnreachable',
        message: 'Host exists but cannot be reached (e.g., firewall)',
    },
    HostDown: {
        code: 'HostDown',
        message: 'Host is not responding to any probes',
    },
    ConnectionTimeout: {
        code: 'ConnectionTimeout',
        message: 'Connection attempt timed out',
    },
    ConnectionError: {
        code: 'ConnectionError',
        message: 'Connection error',
    },
} as const;

// Type - PortScanFlowStepResultInterface - Port scan specific flow step result
export interface PortScanFlowStepExecutionInterface
    extends FlowStepExecutionInterface<PortScanFlowStepInputInterface, PortScanFlowStepOutputInterface> {}

// Class - PortScanFlowService
export class PortScanFlowService extends FlowService<
    PortScanFlowInputInterface,
    PortScanFlowStepInputInterface,
    PortScanFlowStepOutputInterface,
    PortScanFlowStepExecutionInterface
> {
    // Function to override validateInput to add port scan specific validation
    protected validateInput(input: PortScanFlowInputInterface): FlowInputValidationResultInterface {
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
                            message: `Invalid IP address or domain name format: "${input.host}"`,
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
                    message: `Invalid port number: ${input.port}. Port must be between 1 and 65535.`,
                },
            };
        }

        // All validations passed
        return { isValid: true };
    }

    // Function to create a new flow execution
    protected async createFlowExecution(input: PortScanFlowInputInterface): Promise<string> {
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
