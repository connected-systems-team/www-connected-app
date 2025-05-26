// Dependencies - Types
import { DnsRecordType } from '@project/source/api/graphql/generated/graphql';
import { ToolContentPart, ToolResultItemBase } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';

// Legacy types for backward compatibility
export type DnsLookupContentPart = ToolContentPart;
export type DnsLookupContentBadge = Extract<ToolContentPart, { type: 'badge' }>;
export type DnsLookupContentText = Extract<ToolContentPart, { type: 'text' }>;

// DNS Record result interface
export interface DnsRecordResult {
    type: DnsRecordType;
    value: string;
    ttl?: number;
    priority?: number; // For MX records
    name?: string; // The queried name
    // Additional fields for complex records
    exchange?: string; // For MX records
    target?: string; // For SRV records
    weight?: number; // For SRV records
    port?: number; // For SRV records
    // SOA fields
    nsname?: string;
    hostmaster?: string;
    serial?: number;
    refresh?: number;
    retry?: number;
    expire?: number;
    minttl?: number;
}

// Interface for DNS lookup result item
export interface DnsLookupResultItemProperties extends ToolResultItemBase {
    domain: string;
    recordType: DnsRecordType;
    records?: DnsRecordResult[];
    isSuccess?: boolean;
}

// DNS record type options for the form
export interface DnsRecordTypeOption {
    value: DnsRecordType;
    label: string;
    description: string;
}

// DNS record type options
export const DnsRecordTypeOptions: DnsRecordTypeOption[] = [
    { value: DnsRecordType.A, label: 'A', description: 'IPv4 address' },
    { value: DnsRecordType.Aaaa, label: 'AAAA', description: 'IPv6 address' },
    { value: DnsRecordType.Cname, label: 'CNAME', description: 'Canonical name' },
    { value: DnsRecordType.Mx, label: 'MX', description: 'Mail exchange' },
    { value: DnsRecordType.Ns, label: 'NS', description: 'Name server' },
    { value: DnsRecordType.Ptr, label: 'PTR', description: 'Pointer record' },
    { value: DnsRecordType.Soa, label: 'SOA', description: 'Start of authority' },
    { value: DnsRecordType.Srv, label: 'SRV', description: 'Service record' },
    { value: DnsRecordType.Txt, label: 'TXT', description: 'Text record' },
];
