'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowService,
    FlowExecutionInterface,
    FlowInputValidationResultInterface,
} from '@project/app/_modules/flow/FlowService';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { NetworkToolWhoisCreateDocument } from '@project/app/_api/graphql/GraphQlGeneratedCode';

// Dependencies - Utilities
import { DomainValidation } from '@project/app/(main-layout)/tools/_utilities/ToolValidationUtilities';

// Type - WhoisLookupFlowServiceErrors
export const WhoisLookupFlowServiceErrors = {
    // Validation errors
    InvalidDomainError: {
        code: 'InvalidDomainError',
        message: 'Invalid domain name format.',
    },
    EmptyDomainError: {
        code: 'EmptyDomainError',
        message: 'Domain name cannot be empty.',
    },

    // WHOIS lookup errors
    DomainNotFound: {
        code: 'DomainNotFound',
        message: 'Domain not found or does not exist.',
    },
    WhoisServerError: {
        code: 'WhoisServerError',
        message: 'WHOIS server error occurred during lookup.',
    },
    WhoisTimeout: {
        code: 'WhoisTimeout',
        message: 'WHOIS lookup timed out. Try again later.',
    },
    NoWhoisData: {
        code: 'NoWhoisData',
        message: 'No WHOIS data available for this domain.',
    },

    // General errors
    UnknownError: {
        code: 'UnknownError',
        message: 'An unknown error occurred during WHOIS lookup.',
    },
    InternalServerError: {
        code: 'InternalServerError',
        message: 'Internal server error: The WHOIS lookup service is currently experiencing issues.',
    },
    RegionsUnavailable: {
        code: 'RegionsUnavailable',
        message: 'All of our WHOIS lookup regions are currently unavailable.',
    },

    // Results issues
    MissingData: {
        code: 'MissingData',
        message: "WHOIS lookup completed but couldn't retrieve data.",
    },
} as const;

// Type - WhoisLookupFlowClientInputInterface - Input for a new WHOIS lookup from the client
export interface WhoisLookupFlowClientInputInterface {
    domain: string;
    country: string; // E.g., north-america
}

// Server Type - WhoisLookupFlowInputInterface - Input for a WHOIS lookup flow step
export interface WhoisLookupFlowInputInterface {
    domain: string;
    country?: string;
}

// Server Type - Contact Information Interface
export interface WhoisContactInterface {
    name?: string;
    organization?: string;
    addresses?: string[];
    street?: string;
    city?: string;
    stateProvince?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
    fax?: string;
    faxNo?: string;
    email?: string;
}

// Server Type - Domain Information Interface
export interface WhoisDomainInterface {
    statuses?: string[];
    nameServers?: string[];
    registryDomainId?: string;
    registrarWhoisServer?: string;
    registrarUrl?: string;
    updatedDate?: string;
    creationDate?: string;
    registryExpiryDate?: string;
    registrar?: string;
    registrarIanaId?: string;
    abuseContactEmail?: string;
    abuseContactPhone?: string;
    dnssec?: string;
    icannComplaintUrl?: string;
}

// Server Type - TLD Information Interface (from actual API response)
export interface WhoisTldInterface {
    registryAddresses?: string[];
    nameServers?: string[];
    refer?: string;
    tld?: string;
    registryOrganization?: string;
    registryDomainId?: string;
    administrativeContact?: WhoisContactInterface;
    technicalContact?: WhoisContactInterface;
    registrantContact?: WhoisContactInterface;
    billingContact?: WhoisContactInterface;
}

// Server Type - WhoisLookupFlowOutputInterface - Output for a WHOIS lookup flow
export interface WhoisLookupFlowOutputInterface {
    matched?: boolean;
    lastUpdate?: string;
    // Legacy structure (for backward compatibility)
    contacts?: {
        registrant?: WhoisContactInterface;
        administrative?: WhoisContactInterface;
        technical?: WhoisContactInterface;
        billing?: WhoisContactInterface;
    };
    domain?: WhoisDomainInterface;
    // Actual API response structure
    tld?: WhoisTldInterface;
    error?: {
        message?: string;
        domain?: string;
    };
}

// Type - WhoisLookupFlowExecutionInterface
export interface WhoisLookupFlowExecutionInterface
    extends FlowExecutionInterface<WhoisLookupFlowInputInterface, WhoisLookupFlowOutputInterface> {}

// Class - WhoisLookupFlowService
export class WhoisLookupFlowService extends FlowService<WhoisLookupFlowInputInterface, WhoisLookupFlowOutputInterface> {
    // Function to override validateInput to add WHOIS lookup specific validation
    protected validateInput(input: WhoisLookupFlowClientInputInterface): FlowInputValidationResultInterface {
        // Validate domain using shared utility
        const domainValidation = DomainValidation.validateDomain(input.domain);

        if(!domainValidation.isValid) {
            // Map validation error codes to WHOIS-specific error codes
            if(domainValidation.errorCode === 'EmptyDomain') {
                return {
                    isValid: false,
                    error: {
                        code: WhoisLookupFlowServiceErrors.EmptyDomainError.code,
                        message: WhoisLookupFlowServiceErrors.EmptyDomainError.message,
                    },
                };
            }

            return {
                isValid: false,
                error: {
                    code: WhoisLookupFlowServiceErrors.InvalidDomainError.code,
                    message: WhoisLookupFlowServiceErrors.InvalidDomainError.message,
                },
            };
        }

        // All validations passed
        return { isValid: true };
    }

    // Function to create a new flow execution
    protected async createFlowExecution(input: WhoisLookupFlowClientInputInterface): Promise<string> {
        // Execute the WHOIS lookup mutation to create the flow
        const whoisLookupMutation = await apolloClient.mutate({
            mutation: NetworkToolWhoisCreateDocument,
            variables: {
                input: {
                    host: input.domain.trim().toLowerCase(),
                    region: {
                        country: input.country,
                    },
                },
            },
        });

        // If the mutation failed, throw an error
        if(!whoisLookupMutation.data?.networkToolWhoisCreate) {
            throw new Error('Failed to create WHOIS lookup.');
        }

        // Return the flow execution ID
        return whoisLookupMutation.data.networkToolWhoisCreate;
    }
}
