// Dependencies - API
import { ToolContentPart, ToolResultItemBase } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';

// Dependencies - Form Input Interface
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';

// Legacy type alias for backward compatibility
export type SslTlsContentPart = ToolContentPart;

// SSL/TLS Input Interface
export interface SslTlsInputInterface {
    host: string;
    port: number;
    timeoutMs?: number;
}

// SSL/TLS Output Interface
export interface SslTlsOutputInterface {
    host: string;
    port: number;
    certificate: {
        subject: {
            commonName?: string;
            organization?: string;
            organizationalUnit?: string;
            locality?: string;
            stateOrProvince?: string;
            country?: string;
            emailAddress?: string;
        };
        issuer: {
            commonName?: string;
            organization?: string;
            organizationalUnit?: string;
            locality?: string;
            stateOrProvince?: string;
            country?: string;
            emailAddress?: string;
        };
        serialNumber: string;
        notBefore: string;
        notAfter: string;
        signatureAlgorithm: string;
        publicKeyAlgorithm: string;
        keySize: number;
        fingerprint: {
            sha1: string;
            sha256: string;
        };
        extensions: {
            subjectAlternativeNames?: string[];
            keyUsage?: string[];
            extendedKeyUsage?: string[];
            basicConstraints?: string;
            certificatePolicies?: string[];
            authorityKeyIdentifier?: string;
            subjectKeyIdentifier?: string;
            crlDistributionPoints?: string[];
            authorityInformationAccess?: string[];
        };
        version: number;
        certificateChain: {
            subject: string;
            issuer: string;
            serialNumber: string;
            notBefore: string;
            notAfter: string;
            signatureAlgorithm: string;
        }[];
    };
    connectionInfo: {
        tlsVersion: string;
        cipherSuite: string;
        protocol: string;
        securityLevel: 'HIGH' | 'MEDIUM' | 'LOW' | 'INSECURE';
    };
    validation: {
        isValid: boolean;
        isExpired: boolean;
        daysUntilExpiry: number;
        isSelfSigned: boolean;
        isWildcard: boolean;
        domainMatch: boolean;
        warnings: string[];
        errors: string[];
    };
    serverName?: string;
    elapsedTimeMs: number;
}

// SSL/TLS Result Item Interface
export interface SslTlsResultItemInterface extends ToolResultItemBase {
    host?: string;
    port?: number;
    certificate?: SslTlsOutputInterface['certificate'];
    connectionInfo?: SslTlsOutputInterface['connectionInfo'];
    validation?: SslTlsOutputInterface['validation'];
    serverName?: string;
    elapsedTimeMs?: number;
}

// SSL/TLS Form Properties Interface
export interface SslTlsFormProperties {
    className?: string;
    hostReference: React.RefObject<FormInputReferenceInterface>;
    portReference: React.RefObject<FormInputReferenceInterface>;
    regionReference: React.RefObject<FormInputReferenceInterface>;
    countryCode?: string;
    isProcessing: boolean;
    performSslTlsCheck: (host: string, port: number, region: string) => Promise<void>;
}

// SSL/TLS Results Properties Interface
export interface SslTlsResultsAnimatedListProperties {
    resultItems: SslTlsResultItemInterface[];
}

// SSL/TLS Main Component Properties Interface
export interface SslTlsProperties {
    countryCode?: string;
}

// SSL/TLS Page Properties Interface
export interface SslTlsCheckerPageProperties {
    countryCode?: string;
}
