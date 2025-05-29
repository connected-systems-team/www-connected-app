// Dependencies - Types
import {
    FlowService,
    FlowExecutionInterface,
    FlowInputValidationResultInterface,
} from '@project/app/_modules/flow/FlowService';
import { DnsRecordType } from '@project/app/_api/graphql/generated/graphql';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { NetworkToolDnsCreateDocument } from '@project/app/_api/graphql/GraphQlGeneratedCode';

// Dependencies - Utilities
import { DomainValidation } from '@project/app/(main-layout)/tools/_utilities/ToolValidationUtilities';

// Type - DnsLookupFlowServiceErrors
export const DnsLookupFlowServiceErrors = {
    // Validation errors
    InvalidDomainError: {
        code: 'InvalidDomainError',
        message: 'Invalid domain name format.',
    },
    EmptyDomainError: {
        code: 'EmptyDomainError',
        message: 'Domain name cannot be empty.',
    },
    InvalidRecordTypeError: {
        code: 'InvalidRecordTypeError',
        message: 'Invalid DNS record type specified.',
    },

    // DNS resolution errors
    DomainNotFound: {
        code: 'DomainNotFound',
        message: 'Domain not found or does not exist.',
    },
    NoRecordsFound: {
        code: 'NoRecordsFound',
        message: 'No DNS records found for the specified type.',
    },
    DnsServerError: {
        code: 'DnsServerError',
        message: 'DNS server error occurred during lookup.',
    },
    DnsTimeout: {
        code: 'DnsTimeout',
        message: 'DNS lookup timed out. Try again later.',
    },

    // General errors
    UnknownError: {
        code: 'UnknownError',
        message: 'An unknown error occurred during DNS lookup.',
    },
    InternalServerError: {
        code: 'InternalServerError',
        message: 'Internal server error: The DNS lookup service is currently experiencing issues.',
    },
    RegionsUnavailable: {
        code: 'RegionsUnavailable',
        message: 'All of our DNS lookup regions are currently unavailable.',
    },

    // Results issues
    MissingData: {
        code: 'MissingData',
        message: "DNS lookup completed but couldn't retrieve records.",
    },
} as const;

// Type - DnsLookupFlowClientInputInterface - Input for a new DNS lookup from the client
export interface DnsLookupFlowClientInputInterface {
    domain: string;
    recordTypes: DnsRecordType[];
    country: string; // E.g., north-america
}

// Server Type - DnsLookupFlowInputInterface - Input for a DNS lookup flow step
export interface DnsLookupFlowInputInterface {
    domain: string;
    recordTypes?: DnsRecordType[];
    country?: string;
}

// DNS Record interface from server
export interface DnsRecordInterface {
    type: DnsRecordType;
    value: string;
    ttl?: number;
    priority?: number; // For MX records
    name?: string;
}

// DNS Record type interfaces for complex records
export interface MxRecordInterface {
    exchange: string;
    priority: number;
}

export interface SoaRecordInterface {
    nsname: string;
    hostmaster: string;
    serial: number;
    refresh: number;
    retry: number;
    expire: number;
    minttl: number;
}

export interface SrvRecordInterface {
    target: string;
    priority: number;
    weight: number;
    port: number;
}

// Server Type - DnsLookupFlowOutputInterface - Output for a DNS lookup flow
export interface DnsLookupFlowOutputInterface {
    status?: 'success' | 'error' | 'partial';
    domain?: string;
    queryTime?: string; // Time taken for the DNS query
    nameServer?: string; // DNS server used for the query
    error?: {
        message?: string;
        domain?: string;
        recordType?: string;
    };
    errors?: {
        [key: string]: string; // e.g., "PTR": "PTR lookup is only valid for IP addresses"
    };
    // Dynamic record type results - the API returns record types as keys
    A?: string[];
    AAAA?: string[];
    CNAME?: string[];
    MX?: MxRecordInterface[];
    NS?: string[];
    PTR?: string[];
    SOA?: SoaRecordInterface;
    SRV?: SrvRecordInterface[];
    TXT?: string[];
}

// Type - DnsLookupFlowExecutionInterface
export interface DnsLookupFlowExecutionInterface
    extends FlowExecutionInterface<DnsLookupFlowInputInterface, DnsLookupFlowOutputInterface> {}

// Class - DnsLookupFlowService
export class DnsLookupFlowService extends FlowService<DnsLookupFlowInputInterface, DnsLookupFlowOutputInterface> {
    // Function to override validateInput to add DNS lookup specific validation
    protected validateInput(input: DnsLookupFlowClientInputInterface): FlowInputValidationResultInterface {
        // Check if at least one record type is specified first
        if(!input.recordTypes || input.recordTypes.length === 0) {
            return {
                isValid: false,
                error: {
                    code: DnsLookupFlowServiceErrors.InvalidRecordTypeError.code,
                    message: 'At least one DNS record type must be specified.',
                },
            };
        }

        // Allow single words for certain record types (like localhost for testing)
        const isSimpleName = !input.domain.includes('.');
        const allowSimpleNames = input.recordTypes.some(
            (type) => type === DnsRecordType.A || type === DnsRecordType.Aaaa,
        );

        // If it's a simple name and we allow simple names, skip domain validation
        if(isSimpleName && allowSimpleNames) {
            // Still check for empty domain
            if(!input.domain || input.domain.trim().length === 0) {
                return {
                    isValid: false,
                    error: {
                        code: DnsLookupFlowServiceErrors.EmptyDomainError.code,
                        message: DnsLookupFlowServiceErrors.EmptyDomainError.message,
                    },
                };
            }
            return { isValid: true };
        }

        // Validate domain using shared utility
        const domainValidation = DomainValidation.validateDomain(input.domain);

        if(!domainValidation.isValid) {
            // Map validation error codes to DNS-specific error codes
            if(domainValidation.errorCode === 'EmptyDomain') {
                return {
                    isValid: false,
                    error: {
                        code: DnsLookupFlowServiceErrors.EmptyDomainError.code,
                        message: DnsLookupFlowServiceErrors.EmptyDomainError.message,
                    },
                };
            }

            return {
                isValid: false,
                error: {
                    code: DnsLookupFlowServiceErrors.InvalidDomainError.code,
                    message: DnsLookupFlowServiceErrors.InvalidDomainError.message,
                },
            };
        }

        // All validations passed
        return { isValid: true };
    }

    // Function to create a new flow execution
    protected async createFlowExecution(input: DnsLookupFlowClientInputInterface): Promise<string> {
        // Execute the DNS lookup mutation to create the flow
        const dnsLookupMutation = await apolloClient.mutate({
            mutation: NetworkToolDnsCreateDocument,
            variables: {
                input: {
                    domain: input.domain.trim().toLowerCase(),
                    types: input.recordTypes,
                    region: {
                        country: input.country,
                    },
                },
            },
        });

        // If the mutation failed, throw an error
        if(!dnsLookupMutation.data?.networkToolDnsCreate) {
            throw new Error('Failed to create DNS lookup.');
        }

        // Return the flow execution ID
        return dnsLookupMutation.data.networkToolDnsCreate;
    }
}
