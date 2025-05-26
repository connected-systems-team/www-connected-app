// Dependencies - Types
import { FlowExecutionErrorInterface } from '@project/source/modules/flow/FlowService';
import { FlowErrorResult } from '@project/app/(main-layout)/tools/_adapters/FlowErrorHandler';

// Common error patterns that can be found across tools
export interface ErrorPattern {
    pattern: string | RegExp;
    errorCode: string;
    message: string;
}

// Common network and infrastructure error patterns
export const CommonNetworkErrorPatterns: ErrorPattern[] = [
    {
        pattern: /failed to resolve host|hostname could not be resolved/i,
        errorCode: 'HostResolutionFailed',
        message: 'Unable to resolve hostname. Please check the domain or IP address.',
    },
    {
        pattern: /host is down|host appears to be down/i,
        errorCode: 'HostDown',
        message: 'Host is unreachable or not responding.',
    },
    {
        pattern: /connection timeout|timed? ?out/i,
        errorCode: 'ConnectionTimeout',
        message: 'Connection timed out. Please try again later.',
    },
    {
        pattern: /network error|network connection|connection failed/i,
        errorCode: 'NetworkConnectionError',
        message: 'Network connection error. Please check your internet connection.',
    },
    {
        pattern: /no regions? available|all regions? unavailable/i,
        errorCode: 'RegionsUnavailable',
        message: 'All regions are currently unavailable. Please try again later.',
    },
];

// Common validation error patterns
export const CommonValidationErrorPatterns: ErrorPattern[] = [
    {
        pattern: /invalid.*(domain|host)/i,
        errorCode: 'InvalidDomain',
        message: 'Invalid domain name format.',
    },
    {
        pattern: /invalid.*ip.*address|not a valid ip|octets must be between/i,
        errorCode: 'InvalidIpAddress',
        message: 'Invalid IP address format.',
    },
    {
        pattern: /invalid.*port|port.*invalid/i,
        errorCode: 'InvalidPort',
        message: 'Invalid port number.',
    },
    {
        pattern: /private.*ip.*address|private.*address|local.*address/i,
        errorCode: 'PrivateIpError',
        message: 'Private IP addresses are not allowed.',
    },
    {
        pattern: /disallowed.*host|prohibited.*host|blocked.*host/i,
        errorCode: 'DisallowedHost',
        message: 'This host is not allowed.',
    },
];

// Common DNS-specific error patterns
export const DnsErrorPatterns: ErrorPattern[] = [
    {
        pattern: /record type.*not supported|unsupported.*record.*type/i,
        errorCode: 'RecordTypeNotSupported',
        message: 'DNS record type not supported.',
    },
    {
        pattern: /no.*dns.*records?.*found|nxdomain/i,
        errorCode: 'NoDnsRecords',
        message: 'No DNS records found for this domain.',
    },
    {
        pattern: /dns.*server.*error|dns.*query.*failed/i,
        errorCode: 'DnsServerError',
        message: 'DNS server error. Please try again later.',
    },
];

// Common WHOIS-specific error patterns
export const WhoisErrorPatterns: ErrorPattern[] = [
    {
        pattern: /no.*whois.*data|whois.*not.*available/i,
        errorCode: 'NoWhoisData',
        message: 'No WHOIS data available for this domain.',
    },
    {
        pattern: /whois.*server.*error|whois.*query.*failed/i,
        errorCode: 'WhoisServerError',
        message: 'WHOIS server error. Please try again later.',
    },
    {
        pattern: /domain.*not.*found|domain.*does.*not.*exist/i,
        errorCode: 'DomainNotFound',
        message: 'Domain not found or does not exist.',
    },
];

// Common port-specific error patterns
export const PortErrorPatterns: ErrorPattern[] = [
    {
        pattern: /ipv6.*not.*supported/i,
        errorCode: 'Ipv6NotSupported',
        message: 'IPv6 addresses are not currently supported.',
    },
    {
        pattern: /port.*out.*of.*range|invalid.*port.*range/i,
        errorCode: 'PortOutOfRange',
        message: 'Port number must be between 1 and 65535.',
    },
];

// Common ping-specific error patterns
export const PingErrorPatterns: ErrorPattern[] = [
    {
        pattern: /network.*unreachable|unreachable.*network/i,
        errorCode: 'NetworkUnreachable',
        message: 'Network is unreachable.',
    },
    {
        pattern: /destination.*host.*unreachable|host.*unreachable/i,
        errorCode: 'HostUnreachable',
        message: 'Host is unreachable.',
    },
    {
        pattern: /request.*timeout|ping.*timeout/i,
        errorCode: 'PingTimeout',
        message: 'Ping request timed out.',
    },
    {
        pattern: /permission.*denied|operation.*not.*permitted/i,
        errorCode: 'PermissionDenied',
        message: 'Permission denied to ping this host.',
    },
    {
        pattern: /100%.*packet.*loss|all.*packets.*lost/i,
        errorCode: 'TotalPacketLoss',
        message: 'All ping packets were lost.',
    },
];

// Utility class for enhanced error message mapping
export class ToolErrorMappingUtilities {
    // Function to process error using multiple pattern groups
    public static processErrorWithPatterns(
        error: FlowExecutionErrorInterface,
        ...patternGroups: ErrorPattern[][]
    ): FlowErrorResult | null {
        if(!error.message) {
            return null;
        }

        const errorMessage = error.message;

        // Check all pattern groups in order
        for(const patternGroup of patternGroups) {
            const result = this.findMatchingPattern(errorMessage, patternGroup);
            if(result) {
                return result;
            }
        }

        return null;
    }

    // Function to find a matching pattern in a group
    public static findMatchingPattern(errorMessage: string, patterns: ErrorPattern[]): FlowErrorResult | null {
        for(const pattern of patterns) {
            let isMatch = false;

            if(typeof pattern.pattern === 'string') {
                isMatch = errorMessage.toLowerCase().includes(pattern.pattern.toLowerCase());
            }
            else {
                isMatch = pattern.pattern.test(errorMessage);
            }

            if(isMatch) {
                return {
                    errorCode: pattern.errorCode,
                    message: pattern.message,
                };
            }
        }

        return null;
    }

    // Function to create tool-specific error patterns for DNS
    public static getDnsErrorPatterns(): ErrorPattern[] {
        return [...CommonNetworkErrorPatterns, ...CommonValidationErrorPatterns, ...DnsErrorPatterns];
    }

    // Function to create tool-specific error patterns for WHOIS
    public static getWhoisErrorPatterns(): ErrorPattern[] {
        return [...CommonNetworkErrorPatterns, ...CommonValidationErrorPatterns, ...WhoisErrorPatterns];
    }

    // Function to create tool-specific error patterns for Port Checker
    public static getPortCheckerErrorPatterns(): ErrorPattern[] {
        return [...CommonNetworkErrorPatterns, ...CommonValidationErrorPatterns, ...PortErrorPatterns];
    }

    // Function to create tool-specific error patterns for Ping
    public static getPingErrorPatterns(): ErrorPattern[] {
        return [...CommonNetworkErrorPatterns, ...CommonValidationErrorPatterns, ...PingErrorPatterns];
    }

    // Function to create custom error patterns for a specific tool
    public static createCustomErrorPatterns(customPatterns: ErrorPattern[]): ErrorPattern[] {
        return [...CommonNetworkErrorPatterns, ...CommonValidationErrorPatterns, ...customPatterns];
    }
}
