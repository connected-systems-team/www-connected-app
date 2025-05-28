'use client'; // This adapter uses client-only features

// Dependencies - Types
import {
    WhoisLookupFlowExecutionInterface,
    WhoisLookupFlowService,
    WhoisLookupFlowClientInputInterface,
} from '@project/app/(main-layout)/tools/whois-lookup/_api/WhoisLookupFlowService';
import { FlowExecutionErrorInterface } from '@project/app/_modules/flow/FlowService';
import {
    WhoisLookupResultItemProperties,
    WhoisLookupContentPart,
    WhoisDataInterface,
} from '@project/app/(main-layout)/tools/whois-lookup/_types/WhoisLookupTypes';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Base Classes
import { BaseFlowAdapter } from '@project/app/(main-layout)/tools/_adapters/BaseFlowAdapter';
import { FlowErrorResult } from '@project/app/(main-layout)/tools/_adapters/FlowErrorHandler';
import { ToolErrorMappingUtilities } from '@project/app/(main-layout)/tools/_adapters/ToolErrorMappingUtilities';

// Dependencies - Utilities
import { getCountryByName } from '@structure/source/utilities/geo/Countries';

// Class - WhoisLookupAdapter
export class WhoisLookupAdapter extends BaseFlowAdapter<
    WhoisLookupFlowClientInputInterface,
    WhoisLookupFlowExecutionInterface['output'],
    WhoisLookupResultItemProperties,
    WhoisLookupFlowService
> {
    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        onWhoisLookupResultItem: (result: WhoisLookupResultItemProperties) => void,
    ) {
        super(webSocketViaSharedWorker, WhoisLookupFlowService, onWhoisLookupResultItem);
    }

    // Public method to perform WHOIS lookup
    public async lookupWhois(domain: string, country: string): Promise<void> {
        const input: WhoisLookupFlowClientInputInterface = {
            domain: domain.trim().toLowerCase(),
            country: country,
        };

        await this.executeFlow(input);
    }

    // Required abstract method implementations
    protected getAdapterName(): string {
        return 'WhoisLookupAdapter';
    }

    protected createInitialStatusItem(input: WhoisLookupFlowClientInputInterface): WhoisLookupResultItemProperties {
        // Get country data for display
        const countryData = getCountryByName(input.country);

        // Create structured content with badges
        const initialContent: WhoisLookupContentPart[] = [
            { type: 'text', content: 'Looking up WHOIS data for ' },
            { type: 'badge', variant: 'domain', content: input.domain },
            { type: 'text', content: ' from ' },
            { type: 'badge', variant: 'region', content: input.country },
            { type: 'text', content: '...' },
        ];

        return {
            domain: input.domain,
            content: initialContent,
            text: `Looking up WHOIS data for ${input.domain} from ${countryData?.emoji || '🌐'} ${input.country}...`,
            isFinal: false,
            isSuccess: false,
        };
    }

    protected createErrorStatusItem(
        input: WhoisLookupFlowClientInputInterface,
        message: string,
        errorCode?: string,
    ): WhoisLookupResultItemProperties {
        const errorContent: WhoisLookupContentPart[] = [
            { type: 'badge', variant: 'result-negative', content: 'Error' },
            { type: 'text', content: `: ${message}` },
        ];

        return {
            domain: input.domain,
            content: errorContent,
            text: message,
            errorCode: errorCode,
            isFinal: true,
            isSuccess: false,
        };
    }

    protected processFlowOutput(
        output: WhoisLookupFlowExecutionInterface['output'],
        input: WhoisLookupFlowClientInputInterface,
    ): void {
        const domain = input.domain;

        // Check for error in the output
        if(output?.error) {
            const errorItem = this.createErrorStatusItem(
                input,
                output.error.message || 'WHOIS lookup failed',
                'WhoisError',
            );
            this.onResultItem(errorItem);
            return;
        }

        // Check if we have any WHOIS data
        if(!output || !output.matched) {
            const errorItem = this.createErrorStatusItem(input, 'No WHOIS data available for this domain.', 'NoData');
            this.onResultItem(errorItem);
            return;
        }

        // Extract WHOIS data from the output, handling the actual API response structure
        const whoisData: WhoisDataInterface = {
            matched: output.matched,
            lastUpdate: output.lastUpdate,
            // Map TLD contacts to our expected structure
            contacts: output.tld ? {
                administrative: output.tld.administrativeContact,
                technical: output.tld.technicalContact,
                registrant: output.tld.registrantContact,
                billing: output.tld.billingContact,
            } : undefined,
            // Map TLD information to domain structure
            domain: output.tld ? {
                registrar: output.tld.registryOrganization,
                nameServers: output.tld.nameServers,
                registryDomainId: output.tld.registryDomainId,
                registrarWhoisServer: output.tld.refer,
            } : output.domain,
        };

        // Create final result content
        const finalContent: WhoisLookupContentPart[] = [
            { type: 'text', content: 'Found WHOIS data for ' },
            { type: 'badge', variant: 'domain', content: domain },
            { type: 'text', content: '.' },
        ];

        const text = `Found WHOIS data for ${domain}.`;

        // Send the final result
        this.onResultItem({
            domain: domain,
            content: finalContent,
            text: text,
            whoisData: whoisData,
            isFinal: true,
            isSuccess: true,
        });
    }

    // Override to handle WHOIS-specific errors
    protected processToolSpecificError(error: FlowExecutionErrorInterface): FlowErrorResult | null {
        return ToolErrorMappingUtilities.processErrorWithPatterns(
            error,
            ToolErrorMappingUtilities.getWhoisErrorPatterns(),
        );
    }
}
