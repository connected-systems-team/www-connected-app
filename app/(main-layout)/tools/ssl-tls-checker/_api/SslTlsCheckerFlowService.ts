// Dependencies - Types
import {
    FlowService,
    FlowExecutionInterface,
    FlowInputValidationResultInterface,
} from '@project/app/_modules/flow/FlowService';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { NetworkToolTlsCertificateCreateDocument } from '@project/app/_api/graphql/GraphQlGeneratedCode';

// Dependencies - Utilities
import { DomainValidation, PortValidation } from '@project/app/(main-layout)/tools/_utilities/ToolValidationUtilities';

// Type - SslTlsCheckerFlowServiceErrors - SSL/TLS specific errors only
export const SslTlsCheckerFlowServiceErrors = {
    // SSL/TLS specific errors
    SslHandshakeFailed: {
        code: 'SslHandshakeFailed',
        message: 'SSL/TLS handshake failed - incompatible protocols or cipher suites.',
    },
    CertificateError: {
        code: 'CertificateError',
        message: 'SSL/TLS certificate error - the certificate may be invalid, expired, or not trusted.',
    },
    NoSslService: {
        code: 'NoSslService',
        message: 'No SSL/TLS service found on the specified port.',
    },
    UnsupportedProtocol: {
        code: 'UnsupportedProtocol',
        message: 'SSL/TLS protocol version not supported.',
    },
    CertificateExpired: {
        code: 'CertificateExpired',
        message: 'SSL/TLS certificate has expired.',
    },
    CertificateNotYetValid: {
        code: 'CertificateNotYetValid',
        message: 'SSL/TLS certificate is not yet valid.',
    },
    CertificateRevoked: {
        code: 'CertificateRevoked',
        message: 'SSL/TLS certificate has been revoked.',
    },
    CertificateChainError: {
        code: 'CertificateChainError',
        message: 'SSL/TLS certificate chain validation failed.',
    },
} as const;

// Dependencies - Types
import {
    SslTlsCheckerInputInterface,
    SslTlsCheckerOutputInterface,
} from '@project/app/(main-layout)/tools/ssl-tls-checker/_types/SslTlsCheckerTypes';

// Type - SslTlsCheckerClientInputInterface - Input for a new SSL/TLS check from the client
export interface SslTlsCheckerClientInputInterface {
    host: string;
    port: number;
    region: string; // E.g., north-america
    timeoutMs?: number;
}

// Type - SslTlsCheckerFlowExecutionInterface
export type SslTlsCheckerFlowExecutionInterface = FlowExecutionInterface<
    SslTlsCheckerInputInterface,
    SslTlsCheckerOutputInterface
>;

// SslTlsCheckerFlowService
export class SslTlsCheckerFlowService extends FlowService<SslTlsCheckerInputInterface, SslTlsCheckerOutputInterface> {
    // Method to validate the input
    protected validateInput(input: SslTlsCheckerClientInputInterface): FlowInputValidationResultInterface {
        // Validate host
        if(!input.host || input.host.trim() === '') {
            return {
                isValid: false,
                error: {
                    code: 'EmptyHostError',
                    message: 'Host is required.',
                },
            };
        }

        const hostValidation = DomainValidation.validateHostname(input.host);
        if(!hostValidation.isValid) {
            return {
                isValid: false,
                error: {
                    code: 'InvalidHostError',
                    message: 'Invalid hostname or domain name format.',
                },
            };
        }

        // Validate port
        if(!input.port) {
            return {
                isValid: false,
                error: {
                    code: 'EmptyPortError',
                    message: 'Port is required.',
                },
            };
        }

        const portValidation = PortValidation.validatePort(input.port);
        if(!portValidation.isValid) {
            return {
                isValid: false,
                error: {
                    code: 'InvalidPortError',
                    message: 'Invalid port number. Port must be between 1 and 65535.',
                },
            };
        }

        // Validate region
        if(!input.region || input.region.trim() === '') {
            return {
                isValid: false,
                error: {
                    code: 'EmptyRegionError',
                    message: 'Region is required.',
                },
            };
        }

        // Validate timeout (optional)
        if(input.timeoutMs !== undefined) {
            if(typeof input.timeoutMs !== 'number' || input.timeoutMs < 1000 || input.timeoutMs > 60000) {
                return {
                    isValid: false,
                    error: {
                        code: 'InvalidTimeoutError',
                        message: 'Timeout must be between 1000ms and 60000ms.',
                    },
                };
            }
        }

        // All validations passed
        return { isValid: true };
    }

    // Method to create a flow execution
    protected async createFlowExecution(input: SslTlsCheckerClientInputInterface): Promise<string> {
        // Execute the SSL/TLS certificate check mutation to create the flow
        const mutation = await apolloClient.mutate({
            mutation: NetworkToolTlsCertificateCreateDocument,
            variables: {
                input: {
                    host: input.host.trim(),
                    port: input.port,
                    region: {
                        country: input.region,
                    },
                    timeoutMs: input.timeoutMs,
                },
            },
        });

        // If the mutation failed, throw an error
        if(!mutation.data?.networkToolTlsCertificateCreate) {
            throw new Error('Failed to create SSL/TLS certificate check.');
        }

        // Return the flow execution ID
        return mutation.data.networkToolTlsCertificateCreate;
    }
}
