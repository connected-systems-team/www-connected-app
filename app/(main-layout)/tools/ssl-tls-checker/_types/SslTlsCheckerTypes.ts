// Dependencies - API
import { ToolContentPart, ToolResultItemBase } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';

// Dependencies - Form Input Interface
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';

// Legacy type alias for backward compatibility
export type SslTlsCheckerContentPart = ToolContentPart;

// SSL/TLS Checker Input Interface
export interface SslTlsCheckerInputInterface {
    host: string;
    port: number;
    timeoutMs?: number;
}

// SSL/TLS Checker Output Interface - Based on actual API response
export interface SslTlsCheckerOutputInterface {
    // Success case
    subject?: string;
    issuer?: string;
    validFrom?: string;
    validTo?: string;
    subjectAltNames?: string[];
    isValidHostname?: boolean;
    // Error case
    error?: string;
}

// SSL/TLS Checker Result Item Interface
export interface SslTlsCheckerResultItemInterface extends ToolResultItemBase {
    host?: string;
    port?: number;
    subject?: string;
    issuer?: string;
    validFrom?: string;
    validTo?: string;
    subjectAltNames?: string[];
    isValidHostname?: boolean;
}

// SSL/TLS Checker Form Properties Interface
export interface SslTlsCheckerFormProperties {
    className?: string;
    hostReference: React.RefObject<FormInputReferenceInterface>;
    portReference: React.RefObject<FormInputReferenceInterface>;
    regionReference: React.RefObject<FormInputReferenceInterface>;
    countryCode?: string;
    isProcessing: boolean;
    performSslTlsCheck: (host: string, port: number, region: string) => Promise<void>;
}

// SSL/TLS Checker Results Properties Interface
export interface SslTlsCheckerResultsAnimatedListProperties {
    resultItems: SslTlsCheckerResultItemInterface[];
}

// SSL/TLS Checker Main Component Properties Interface
export interface SslTlsCheckerProperties {
    countryCode?: string;
}

// SSL/TLS Checker Page Properties Interface
export interface SslTlsCheckerPageProperties {
    countryCode?: string;
}
