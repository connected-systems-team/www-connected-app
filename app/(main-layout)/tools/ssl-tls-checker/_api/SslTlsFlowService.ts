// Dependencies - Flow
import { FlowService } from '@project/app/_modules/flow/FlowService';
import { FlowInputValidationResultInterface } from '@project/app/_modules/flow/FlowService';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { NetworkToolTlsCertificateCreateDocument } from '@project/app/_api/graphql/GraphQlGeneratedCode';

// Dependencies - Utilities
import { DomainValidation, PortValidation } from '@project/app/(main-layout)/tools/_utilities/ToolValidationUtilities';

// Dependencies - Types
import {
    SslTlsInputInterface,
    SslTlsOutputInterface,
} from '@project/app/(main-layout)/tools/ssl-tls-checker/_types/SslTlsTypes';

// Client Input Interface
export interface SslTlsClientInputInterface {
    host: string;
    port: number;
    region: string;
    timeoutMs?: number;
}

// SSL/TLS Flow Service
export class SslTlsFlowService extends FlowService<SslTlsInputInterface, SslTlsOutputInterface> {
    // Method to validate the input
    protected validateInput(input: SslTlsClientInputInterface): FlowInputValidationResultInterface {
        const errors: string[] = [];

        // Validate host
        if(!input.host || input.host.trim() === '') {
            errors.push('Host is required');
        }
        else {
            const hostValidation = DomainValidation.validateHostname(input.host);
            if(!hostValidation.isValid) {
                errors.push(hostValidation.errorMessage || 'Invalid host');
            }
        }

        // Validate port
        if(!input.port) {
            errors.push('Port is required');
        }
        else {
            const portValidation = PortValidation.validatePort(input.port);
            if(!portValidation.isValid) {
                errors.push(portValidation.errorMessage || 'Invalid port');
            }
        }

        // Validate region
        if(!input.region || input.region.trim() === '') {
            errors.push('Region is required');
        }

        // Validate timeout (optional)
        if(input.timeoutMs !== undefined) {
            if(typeof input.timeoutMs !== 'number' || input.timeoutMs < 1000 || input.timeoutMs > 60000) {
                errors.push('Timeout must be between 1000ms and 60000ms');
            }
        }

        return {
            isValid: errors.length === 0,
            error:
                errors.length > 0 ? { code: 'ValidationError', message: errors[0] || 'Validation failed' } : undefined,
        };
    }

    // Method to create a flow execution
    protected async createFlowExecution(input: SslTlsClientInputInterface): Promise<string> {
        // Parse the region string into region levels
        const regionParts = input.region.split('.');
        const regionLevels = {
            region: regionParts[0] || '',
            country: regionParts[1] || '',
            division: regionParts[2] || '',
            locality: regionParts[3] || '',
            site: regionParts[4] || '',
        };

        // Prepare the GraphQL input
        const graphqlInput = {
            host: input.host.trim(),
            port: input.port,
            region: regionLevels,
            timeoutMs: input.timeoutMs,
        };

        // Execute the mutation
        const mutation = await apolloClient.mutate({
            mutation: NetworkToolTlsCertificateCreateDocument,
            variables: {
                input: graphqlInput,
            },
        });

        // Return the flow execution ID
        return mutation.data?.networkToolTlsCertificateCreate || '';
    }
}
