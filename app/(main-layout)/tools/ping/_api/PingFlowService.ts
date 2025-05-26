'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowService,
    FlowExecutionInterface,
    FlowInputValidationResultInterface,
} from '@project/source/modules/flow/FlowService';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { NetworkToolPingCreateDocument } from '@project/source/api/graphql/GraphQlGeneratedCode';

// Dependencies - Utilities
import { DomainValidation } from '@project/app/(main-layout)/tools/_utilities/ToolValidationUtilities';

// Type - PingFlowServiceErrors
export const PingFlowServiceErrors = {
    // Validation errors
    InvalidHostError: {
        code: 'InvalidHostError',
        message: 'Invalid host name or IP address format.',
    },
    EmptyHostError: {
        code: 'EmptyHostError',
        message: 'Host name or IP address cannot be empty.',
    },
    InvalidCountError: {
        code: 'InvalidCountError',
        message: 'Count must be a positive number between 1 and 20.',
    },
    InvalidTimeoutError: {
        code: 'InvalidTimeoutError',
        message: 'Timeout must be a positive number between 1000 and 30000 milliseconds.',
    },

    // Ping resolution errors
    HostNotFound: {
        code: 'HostNotFound',
        message: 'Host not found or does not exist.',
    },
    NetworkUnreachable: {
        code: 'NetworkUnreachable',
        message: 'Network is unreachable.',
    },
    PingTimeout: {
        code: 'PingTimeout',
        message: 'Ping request timed out.',
    },
    PermissionDenied: {
        code: 'PermissionDenied',
        message: 'Permission denied to ping this host.',
    },

    // General errors
    UnknownError: {
        code: 'UnknownError',
        message: 'An unknown error occurred during ping.',
    },
    InternalServerError: {
        code: 'InternalServerError',
        message: 'Internal server error: The ping service is currently experiencing issues.',
    },
    RegionsUnavailable: {
        code: 'RegionsUnavailable',
        message: 'All of our ping regions are currently unavailable.',
    },

    // Results issues
    MissingData: {
        code: 'MissingData',
        message: "Ping completed but couldn't retrieve results.",
    },
} as const;

// Type - PingFlowClientInputInterface - Input for a new ping from the client
export interface PingFlowClientInputInterface {
    host: string;
    count: number;
    timeoutMs?: number;
    country: string; // E.g., north-america
}

// Server Type - PingFlowInputInterface - Input for a ping flow step
export interface PingFlowInputInterface {
    host: string;
    count?: number;
    timeoutMs?: number;
    country?: string;
}

// Individual ping response from server
export interface PingResponseInterface {
    seq: number;
    ttl: number;
    timeMs: number;
}

// Server Type - PingFlowOutputInterface - Output for a ping flow (matches actual API)
export interface PingFlowOutputInterface {
    target?: string;
    success?: boolean;
    responses?: PingResponseInterface[];
    timeouts?: number[]; // Array of sequence numbers that timed out
    resolvedIp?: string;
    transmitted?: number;
    received?: number;
    lossPercent?: number;
    error?: {
        message?: string;
        host?: string;
    };
}

// Type - PingFlowExecutionInterface
export interface PingFlowExecutionInterface
    extends FlowExecutionInterface<PingFlowInputInterface, PingFlowOutputInterface> {}

// Class - PingFlowService
export class PingFlowService extends FlowService<PingFlowInputInterface, PingFlowOutputInterface> {
    // Function to override validateInput to add ping specific validation
    protected validateInput(input: PingFlowClientInputInterface): FlowInputValidationResultInterface {
        // Check if host is provided
        if(!input.host || input.host.trim().length === 0) {
            return {
                isValid: false,
                error: {
                    code: PingFlowServiceErrors.EmptyHostError.code,
                    message: PingFlowServiceErrors.EmptyHostError.message,
                },
            };
        }

        // Check if count is valid (1-20 packets)
        if(input.count < 1 || input.count > 20) {
            return {
                isValid: false,
                error: {
                    code: PingFlowServiceErrors.InvalidCountError.code,
                    message: PingFlowServiceErrors.InvalidCountError.message,
                },
            };
        }

        // Check if timeout is valid (if provided)
        if(input.timeoutMs !== undefined && (input.timeoutMs < 1000 || input.timeoutMs > 30000)) {
            return {
                isValid: false,
                error: {
                    code: PingFlowServiceErrors.InvalidTimeoutError.code,
                    message: PingFlowServiceErrors.InvalidTimeoutError.message,
                },
            };
        }

        // Check if it's an IP address or validate as domain
        const trimmedHost = input.host.trim();

        // Simple IP address regex (both IPv4 and IPv6)
        const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;

        const isIpAddress = ipv4Regex.test(trimmedHost) || ipv6Regex.test(trimmedHost);

        if(!isIpAddress) {
            // Validate as domain
            const domainValidation = DomainValidation.validateDomain(trimmedHost);

            if(!domainValidation.isValid) {
                return {
                    isValid: false,
                    error: {
                        code: PingFlowServiceErrors.InvalidHostError.code,
                        message: PingFlowServiceErrors.InvalidHostError.message,
                    },
                };
            }
        }

        // All validations passed
        return { isValid: true };
    }

    // Function to create a new flow execution
    protected async createFlowExecution(input: PingFlowClientInputInterface): Promise<string> {
        // Execute the ping mutation to create the flow
        const pingMutation = await apolloClient.mutate({
            mutation: NetworkToolPingCreateDocument,
            variables: {
                input: {
                    host: input.host.trim().toLowerCase(),
                    count: input.count,
                    timeoutMs: input.timeoutMs,
                    region: {
                        country: input.country,
                    },
                },
            },
        });

        // If the mutation failed, throw an error
        if(!pingMutation.data?.networkToolPingCreate) {
            throw new Error('Failed to create ping.');
        }

        // Return the flow execution ID
        return pingMutation.data.networkToolPingCreate;
    }
}
