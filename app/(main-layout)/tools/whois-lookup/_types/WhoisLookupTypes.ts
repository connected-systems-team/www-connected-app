// Dependencies - Types
import { ToolContentPart, ToolResultItemBase } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';

// Legacy types for backward compatibility
export type WhoisLookupContentPart = ToolContentPart;
export type WhoisLookupContentBadge = Extract<ToolContentPart, { type: 'badge' }>;
export type WhoisLookupContentText = Extract<ToolContentPart, { type: 'text' }>;

// Import types from the flow service
import {
    WhoisContactInterface,
    WhoisDomainInterface,
} from '@project/app/(main-layout)/tools/whois-lookup/_api/WhoisLookupFlowService';

// Interface for processed WHOIS data structure
export interface WhoisDataInterface {
    matched?: boolean;
    lastUpdate?: string;
    contacts?: {
        registrant?: WhoisContactInterface;
        administrative?: WhoisContactInterface;
        technical?: WhoisContactInterface;
        billing?: WhoisContactInterface;
    };
    domain?: WhoisDomainInterface;
}

// Export the contact and domain interfaces for use in components
export type { WhoisContactInterface, WhoisDomainInterface };

// Interface for WHOIS lookup result item
export interface WhoisLookupResultItemProperties extends ToolResultItemBase {
    domain: string;
    whoisData?: WhoisDataInterface;
}
