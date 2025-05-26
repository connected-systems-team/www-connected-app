'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowService,
    FlowExecutionInterface,
    FlowInputValidationResultInterface,
} from '@project/source/modules/flow/FlowService';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { NetworkToolPortCheckCreateDocument } from '@project/source/api/graphql/GraphQlGeneratedCode';

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

// Type - PortCheckFlowServiceErrors
// These error codes are used for displaying specific error messages in the UI
export const PortCheckFlowServiceErrors = {
    // Validation errors
    PrivateIpError: {
        code: 'PrivateIpError',
        message: 'This is a private or disallowed IP address.',
    },
    InvalidHostError: {
        code: 'InvalidHostError',
        message: 'Invalid hostname or IP address format.',
    },
    InvalidIpError: {
        code: 'InvalidIpError',
        message: 'Invalid IP address format. IP octets must be between 0-255.',
    },
    InvalidPortError: {
        code: 'InvalidPortError',
        message: 'Invalid port number. Port must be between 1 and 65535.',
    },
    Ipv6NotSupportedError: {
        code: 'Ipv6NotSupportedError',
        message: 'IPv6 addresses are not currently supported. Contact us if you need this feature.',
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
    DisallowedHost: {
        code: 'DisallowedHost',
        message: 'The host you entered resolves to an IP address that is not allowed for scanning.',
    },
    RegionsUnavailable: {
        code: 'RegionsUnavailable',
        message: 'All of our scanning regions are currently unavailable.',
    },

    // Results issues
    MissingData: {
        code: 'MissingData',
        message: "Port scan completed but couldn't determine exact status.",
    },
} as const;

// Type - PortCheckFlowClientInputInterface - Input for a new port scan from the client
export interface PortCheckFlowClientInputInterface {
    host: string;
    port: number;
    country: string; // E.g., north-america
}

// Server Type - PortCheckFlowInputInterface - Input for a port scan flow step
export interface PortCheckFlowInputInterface {
    host: string;
    port?: number;
    country?: string;
    maxAttempts?: number;
}

// Server Type - PortCheckFlowOutputInterface - Output for a port scan flow
export interface PortCheckFlowOutputInterface {
    status: 'success' | 'error' | 'mismatch';
    hostIpAddress?: string;
    addressesScanned: number;
    // When a domain resolves to multiple IPs
    additionalIps?: string[];
    // hostsUp - Not the same as additionalIps.length because additionalIps can be empty
    // Used to determine if someone put in an invalid IP address
    hostsUp: number;
    hostName?: string;
    port?: {
        number: number;
        state: NmapPortStateType;
        protocol?: string; // If nmap returns a protocol name that is listening on the port, e.g., tcp
        service?: string; // If nmap returns a service name that is listening on the port, e.g., http
    };
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

// Type - PortCheckFlowExecutionInterface
export interface PortCheckFlowExecutionInterface
    extends FlowExecutionInterface<PortCheckFlowInputInterface, PortCheckFlowOutputInterface> {}

// Class - PortCheckFlowService
export class PortCheckFlowService extends FlowService<PortCheckFlowInputInterface, PortCheckFlowOutputInterface> {
    // Function to override validateInput to add port scan specific validation
    protected validateInput(input: PortCheckFlowClientInputInterface): FlowInputValidationResultInterface {
        // Check for IPv6 addresses - not currently supported
        if(isIpV6Address(input.host)) {
            return {
                isValid: false,
                error: {
                    code: PortCheckFlowServiceErrors.Ipv6NotSupportedError.code,
                    message: PortCheckFlowServiceErrors.Ipv6NotSupportedError.message,
                },
            };
        }

        // Check first if it's a valid IPv4 address
        if(isIpV4Address(input.host)) {
            // Then check if it's private
            if(isPrivateIpAddress(input.host)) {
                return {
                    isValid: false,
                    error: {
                        code: PortCheckFlowServiceErrors.PrivateIpError.code,
                        message: `${input.host} is a private IP address and cannot be scanned.`,
                    },
                };
            }
        }
        // If it looks like an IP but isn't valid, report it as invalid
        else if(input.host.match(/^(\d{1,3}\.){3}\d{1,3}$/)) {
            return {
                isValid: false,
                error: {
                    code: PortCheckFlowServiceErrors.InvalidIpError.code,
                    message: `${input.host} is not a valid IP address. IP octets must be between 0-255.`,
                },
            };
        }

        // Validate hostname format for non-IP addresses
        if(!isIpV4Address(input.host)) {
            const domainPattern = /^[a-zA-Z0-9][-a-zA-Z0-9.]{0,253}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/;

            // This is not a valid domain name pattern
            if(!domainPattern.test(input.host)) {
                // Only show this if it's likely to fail host resolution
                if(!input.host.includes('.')) {
                    return {
                        isValid: false,
                        error: {
                            code: PortCheckFlowServiceErrors.InvalidHostError.code,
                            message: PortCheckFlowServiceErrors.InvalidHostError.message,
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
                    code: PortCheckFlowServiceErrors.InvalidPortError.code,
                    message: PortCheckFlowServiceErrors.InvalidPortError.message,
                },
            };
        }

        // All validations passed
        return { isValid: true };
    }

    // Function to create a new flow execution
    protected async createFlowExecution(input: PortCheckFlowClientInputInterface): Promise<string> {
        // Execute the port scan mutation to create the flow
        const portCheckMutation = await apolloClient.mutate({
            mutation: NetworkToolPortCheckCreateDocument,
            variables: {
                input: {
                    host: input.host,
                    port: input.port,
                    region: {
                        country: input.country,
                    },
                },
            },
        });

        // If the mutation failed, throw an error
        if(!portCheckMutation.data?.networkToolPortCheckCreate) {
            throw new Error('Failed to create port scan.');
        }

        // Return the flow execution ID
        return portCheckMutation.data.networkToolPortCheckCreate;
    }
}
