'use client'; // This adapter uses client-only features

// Dependencies - Types
import { DnsRecordType } from '@project/source/api/graphql/generated/graphql';
import {
    DnsLookupFlowExecutionInterface,
    DnsLookupFlowService,
    DnsLookupFlowClientInputInterface,
    MxRecordInterface,
    SoaRecordInterface,
    SrvRecordInterface,
} from '@project/app/(main-layout)/tools/dns-lookup/_api/DnsLookupFlowService';
import {
    DnsLookupResultItemProperties,
    DnsLookupContentPart,
    DnsRecordResult,
} from '@project/app/(main-layout)/tools/dns-lookup/_types/DnsLookupTypes';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';
import { FlowExecutionErrorInterface } from '@project/source/modules/flow/FlowService';

// Dependencies - Base Classes
import { BaseFlowAdapter } from '@project/app/(main-layout)/tools/_adapters/BaseFlowAdapter';
import { FlowErrorResult } from '@project/app/(main-layout)/tools/_adapters/FlowErrorHandler';
import { ToolErrorMappingUtilities } from '@project/app/(main-layout)/tools/_adapters/ToolErrorMappingUtilities';

// Dependencies - Utilities
import { getCountryByName } from '@structure/source/utilities/geo/Countries';

// Function to get a human-readable description of the DNS record type
export function getDnsRecordTypeDescription(recordType: DnsRecordType): string {
    switch(recordType) {
        case DnsRecordType.A:
            return 'IPv4 address';
        case DnsRecordType.Aaaa:
            return 'IPv6 address';
        case DnsRecordType.Cname:
            return 'canonical name';
        case DnsRecordType.Mx:
            return 'mail exchange';
        case DnsRecordType.Ns:
            return 'name server';
        case DnsRecordType.Ptr:
            return 'pointer record';
        case DnsRecordType.Soa:
            return 'start of authority';
        case DnsRecordType.Srv:
            return 'service record';
        case DnsRecordType.Txt:
            return 'text record';
        default:
            return 'unknown record type';
    }
}

// Class - DnsLookupAdapter
export class DnsLookupAdapter extends BaseFlowAdapter<
    DnsLookupFlowClientInputInterface,
    DnsLookupFlowExecutionInterface['output'],
    DnsLookupResultItemProperties,
    DnsLookupFlowService
> {
    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        onDnsLookupResultItem: (result: DnsLookupResultItemProperties) => void,
    ) {
        super(webSocketViaSharedWorker, DnsLookupFlowService, onDnsLookupResultItem);
    }

    // Public method to perform DNS lookup
    public async lookupDns(domain: string, recordTypes: DnsRecordType[], country: string): Promise<void> {
        const input: DnsLookupFlowClientInputInterface = {
            domain: domain.trim().toLowerCase(),
            recordTypes: recordTypes,
            country: country,
        };

        await this.executeFlow(input);
    }

    // Required abstract method implementations
    protected getAdapterName(): string {
        return 'DnsLookupAdapter';
    }

    protected createInitialStatusItem(input: DnsLookupFlowClientInputInterface): DnsLookupResultItemProperties {
        // Get country data for display
        const countryData = getCountryByName(input.country);

        // Create structured content with badges
        const recordTypesText = input.recordTypes.map((type) => type.toString()).join(', ');
        const initialContent: DnsLookupContentPart[] = [
            { type: 'text', content: 'Looking up ' },
            { type: 'badge', variant: 'record-type', content: recordTypesText },
            { type: 'text', content: ' records for ' },
            { type: 'badge', variant: 'domain', content: input.domain },
            { type: 'text', content: ' from ' },
            { type: 'badge', variant: 'region', content: input.country },
            { type: 'text', content: '...' },
        ];

        return {
            domain: input.domain,
            recordType: input.recordTypes[0] || DnsRecordType.A,
            content: initialContent,
            text: `Looking up ${recordTypesText} records for ${input.domain} from ${countryData?.emoji || '🌐'} ${
                input.country
            }...`,
            isFinal: false,
            isSuccess: false,
        };
    }

    protected createErrorStatusItem(
        input: DnsLookupFlowClientInputInterface,
        message: string,
        errorCode?: string,
    ): DnsLookupResultItemProperties {
        const errorContent: DnsLookupContentPart[] = [
            { type: 'badge', variant: 'result-negative', content: 'Error' },
            { type: 'text', content: `: ${message}` },
        ];

        return {
            domain: input.domain,
            recordType: input.recordTypes[0] || DnsRecordType.A,
            content: errorContent,
            text: message,
            errorCode: errorCode,
            isFinal: true,
            isSuccess: false,
        };
    }

    protected processFlowOutput(
        output: DnsLookupFlowExecutionInterface['output'],
        input: DnsLookupFlowClientInputInterface,
    ): void {
        // Extract DNS records from the output
        const dnsRecords: DnsRecordResult[] = [];
        const domain = input.domain;
        const requestedRecordTypes = input.recordTypes;

        // Check for error in the output
        if(output?.error) {
            // Check for specific record type errors
            const recordTypeError = output.error.message?.includes('record type');
            if(recordTypeError) {
                const errorItem = this.createErrorStatusItem(input, 'Record type not supported.', 'RecordTypeError');
                this.onResultItem(errorItem);
                return;
            }
        }

        // Process each requested record type for results
        for(const recordType of requestedRecordTypes) {
            switch(recordType) {
                case DnsRecordType.A:
                case DnsRecordType.Aaaa:
                case DnsRecordType.Cname:
                case DnsRecordType.Ns:
                case DnsRecordType.Ptr:
                case DnsRecordType.Txt: {
                    // Simple array-based records
                    const recordData = output?.[recordType] as string[] | undefined;
                    if(recordData && Array.isArray(recordData)) {
                        for(const value of recordData) {
                            dnsRecords.push({
                                type: recordType,
                                value: value,
                                name: domain,
                            });
                        }
                    }
                    break;
                }

                case DnsRecordType.Mx: {
                    // MX records with exchange and priority
                    const mxData = output?.MX as MxRecordInterface[] | undefined;
                    if(mxData && Array.isArray(mxData)) {
                        for(const mxRecord of mxData) {
                            dnsRecords.push({
                                type: recordType,
                                value: mxRecord.exchange,
                                exchange: mxRecord.exchange,
                                priority: mxRecord.priority,
                                name: domain,
                            });
                        }
                    }
                    break;
                }

                case DnsRecordType.Soa: {
                    // SOA record (single object)
                    const soaData = output?.SOA as SoaRecordInterface | undefined;
                    if(soaData && typeof soaData === 'object') {
                        dnsRecords.push({
                            type: recordType,
                            value: soaData.nsname,
                            name: domain,
                            nsname: soaData.nsname,
                            hostmaster: soaData.hostmaster,
                            serial: soaData.serial,
                            refresh: soaData.refresh,
                            retry: soaData.retry,
                            expire: soaData.expire,
                            minttl: soaData.minttl,
                        });
                    }
                    break;
                }

                case DnsRecordType.Srv: {
                    // SRV records with target, priority, weight, port
                    const srvData = output?.SRV as SrvRecordInterface[] | undefined;
                    if(srvData && Array.isArray(srvData)) {
                        for(const srvRecord of srvData) {
                            dnsRecords.push({
                                type: recordType,
                                value: srvRecord.target,
                                target: srvRecord.target,
                                priority: srvRecord.priority,
                                weight: srvRecord.weight,
                                port: srvRecord.port,
                                name: domain,
                            });
                        }
                    }
                    break;
                }
            }
        }

        // Create final result item
        let text: string;
        let finalContent: DnsLookupContentPart[];

        // Check for error or no records found
        if(output?.error && !dnsRecords.length) {
            text = `DNS lookup failed: ${output.error.message}`;
            finalContent = [
                { type: 'badge', variant: 'result-negative', content: 'Error' },
                { type: 'text', content: `: ${output.error.message}` },
            ];
        }
        else if(dnsRecords.length > 0) {
            // Success with records
            const recordCount = dnsRecords.length;
            const recordsText = recordCount === 1 ? 'record' : 'records';

            text = `Found ${recordCount} DNS ${recordsText} for ${domain}.`;

            finalContent = [
                { type: 'text', content: 'Found ' },
                { type: 'badge', variant: 'result-positive', content: recordCount.toString() },
                { type: 'text', content: ` DNS ${recordsText} for ` },
                { type: 'badge', variant: 'domain', content: domain || '' },
                { type: 'text', content: '.' },
            ];
        }
        else {
            // No records found
            text = `No DNS records found for ${domain}.`;
            finalContent = [
                { type: 'text', content: 'No DNS records found for ' },
                { type: 'badge', variant: 'domain', content: domain || '' },
                { type: 'text', content: '.' },
            ];
        }

        // Send the final result
        this.onResultItem({
            domain: domain,
            recordType: requestedRecordTypes[0] || DnsRecordType.A,
            content: finalContent,
            text: text,
            records: dnsRecords,
            isFinal: true,
            isSuccess: dnsRecords.length > 0,
        });
    }

    // Override to handle DNS-specific errors
    protected processToolSpecificError(error: FlowExecutionErrorInterface): FlowErrorResult | null {
        return ToolErrorMappingUtilities.processErrorWithPatterns(
            error,
            ToolErrorMappingUtilities.getDnsErrorPatterns(),
        );
    }
}
