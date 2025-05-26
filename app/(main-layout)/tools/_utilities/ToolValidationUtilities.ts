// Validation result interface
export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
    errorCode?: string;
}

// Domain validation utility
export class DomainValidation {
    // Basic domain name pattern - allows domains with subdomains
    private static readonly DOMAIN_PATTERN = /^[a-zA-Z0-9][-a-zA-Z0-9.]{0,253}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/;

    // More lenient pattern for hostnames (can include underscores)
    private static readonly HOSTNAME_PATTERN = /^[a-zA-Z0-9][-a-zA-Z0-9._]{0,253}[a-zA-Z0-9]$/;

    public static validateDomain(domain: string): ValidationResult {
        if(!domain || domain.trim().length === 0) {
            return {
                isValid: false,
                errorMessage: 'Domain name cannot be empty.',
                errorCode: 'EmptyDomain',
            };
        }

        const trimmedDomain = domain.trim().toLowerCase();

        // Check length
        if(trimmedDomain.length > 253) {
            return {
                isValid: false,
                errorMessage: 'Domain name is too long (maximum 253 characters).',
                errorCode: 'DomainTooLong',
            };
        }

        // Check for invalid characters
        if(!/^[a-zA-Z0-9.-]+$/.test(trimmedDomain)) {
            return {
                isValid: false,
                errorMessage: 'Domain name contains invalid characters.',
                errorCode: 'InvalidDomainCharacters',
            };
        }

        // Check domain pattern
        if(!this.DOMAIN_PATTERN.test(trimmedDomain)) {
            return {
                isValid: false,
                errorMessage: 'Invalid domain name format.',
                errorCode: 'InvalidDomainFormat',
            };
        }

        // Check for consecutive dots
        if(trimmedDomain.includes('..')) {
            return {
                isValid: false,
                errorMessage: 'Domain name cannot contain consecutive dots.',
                errorCode: 'ConsecutiveDots',
            };
        }

        // Check each label length (between dots)
        const labels = trimmedDomain.split('.');
        for(const label of labels) {
            if(label.length === 0) {
                return {
                    isValid: false,
                    errorMessage: 'Domain labels cannot be empty.',
                    errorCode: 'EmptyDomainLabel',
                };
            }
            if(label.length > 63) {
                return {
                    isValid: false,
                    errorMessage: 'Domain labels cannot exceed 63 characters.',
                    errorCode: 'DomainLabelTooLong',
                };
            }
            if(label.startsWith('-') || label.endsWith('-')) {
                return {
                    isValid: false,
                    errorMessage: 'Domain labels cannot start or end with hyphens.',
                    errorCode: 'InvalidDomainLabelHyphens',
                };
            }
        }

        return { isValid: true };
    }

    public static validateHostname(hostname: string): ValidationResult {
        if(!hostname || hostname.trim().length === 0) {
            return {
                isValid: false,
                errorMessage: 'Hostname cannot be empty.',
                errorCode: 'EmptyHostname',
            };
        }

        const trimmedHostname = hostname.trim().toLowerCase();

        // First try domain validation
        const domainResult = this.validateDomain(trimmedHostname);
        if(domainResult.isValid) {
            return domainResult;
        }

        // If domain validation fails, try IP address validation
        const ipResult = IpAddressValidation.validateIpAddress(trimmedHostname);
        if(ipResult.isValid) {
            return ipResult;
        }

        // If neither works, return domain validation error (more specific)
        return domainResult;
    }
}

// IP address validation utility
export class IpAddressValidation {
    // IPv4 pattern
    private static readonly IPV4_PATTERN = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

    // IPv6 pattern (simplified)
    private static readonly IPV6_PATTERN = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;

    public static validateIpAddress(ip: string): ValidationResult {
        if(!ip || ip.trim().length === 0) {
            return {
                isValid: false,
                errorMessage: 'IP address cannot be empty.',
                errorCode: 'EmptyIpAddress',
            };
        }

        const trimmedIp = ip.trim();

        // Check for IPv4
        const ipv4Result = this.validateIpv4(trimmedIp);
        if(ipv4Result.isValid) {
            return ipv4Result;
        }

        // Check for IPv6
        const ipv6Result = this.validateIpv6(trimmedIp);
        if(ipv6Result.isValid) {
            return ipv6Result;
        }

        return {
            isValid: false,
            errorMessage: 'Invalid IP address format.',
            errorCode: 'InvalidIpAddress',
        };
    }

    public static validateIpv4(ip: string): ValidationResult {
        if(!ip || ip.trim().length === 0) {
            return {
                isValid: false,
                errorMessage: 'IPv4 address cannot be empty.',
                errorCode: 'EmptyIpv4Address',
            };
        }

        const trimmedIp = ip.trim();
        const match = trimmedIp.match(this.IPV4_PATTERN);

        if(!match) {
            return {
                isValid: false,
                errorMessage: 'Invalid IPv4 address format.',
                errorCode: 'InvalidIpv4Format',
            };
        }

        // Check each octet
        for(let i = 1; i <= 4; i++) {
            const octet = parseInt(match[i] || '0', 10);
            if(octet < 0 || octet > 255) {
                return {
                    isValid: false,
                    errorMessage: 'IPv4 octets must be between 0 and 255.',
                    errorCode: 'InvalidIpv4Octet',
                };
            }
        }

        // Check for private IP addresses
        if(this.isPrivateIpv4(trimmedIp)) {
            return {
                isValid: false,
                errorMessage: 'Private IP addresses are not allowed.',
                errorCode: 'PrivateIpAddress',
            };
        }

        return { isValid: true };
    }

    // Method to validate IPv4 format only (without private IP check)
    public static validateIpv4Format(ip: string): ValidationResult {
        if(!ip || ip.trim().length === 0) {
            return {
                isValid: false,
                errorMessage: 'IPv4 address cannot be empty.',
                errorCode: 'EmptyIpv4Address',
            };
        }

        const trimmedIp = ip.trim();
        const match = trimmedIp.match(this.IPV4_PATTERN);

        if(!match) {
            return {
                isValid: false,
                errorMessage: 'Invalid IPv4 address format.',
                errorCode: 'InvalidIpv4Format',
            };
        }

        // Check each octet
        for(let i = 1; i <= 4; i++) {
            const octet = parseInt(match[i] || '0', 10);
            if(octet < 0 || octet > 255) {
                return {
                    isValid: false,
                    errorMessage: 'IPv4 octets must be between 0 and 255.',
                    errorCode: 'InvalidIpv4Octet',
                };
            }
        }

        return { isValid: true };
    }

    public static validateIpv6(ip: string): ValidationResult {
        if(!ip || ip.trim().length === 0) {
            return {
                isValid: false,
                errorMessage: 'IPv6 address cannot be empty.',
                errorCode: 'EmptyIpv6Address',
            };
        }

        const trimmedIp = ip.trim();

        if(!this.IPV6_PATTERN.test(trimmedIp)) {
            return {
                isValid: false,
                errorMessage: 'Invalid IPv6 address format.',
                errorCode: 'InvalidIpv6Format',
            };
        }

        return {
            isValid: false,
            errorMessage: 'IPv6 addresses are not currently supported.',
            errorCode: 'Ipv6NotSupported',
        };
    }

    private static isPrivateIpv4(ip: string): boolean {
        const parts = ip.split('.').map(Number);
        const [a, b] = parts;

        // 10.0.0.0 - 10.255.255.255
        if(a === 10) return true;

        // 172.16.0.0 - 172.31.255.255
        if(a === 172 && b !== undefined && b >= 16 && b <= 31) return true;

        // 192.168.0.0 - 192.168.255.255
        if(a === 192 && b === 168) return true;

        // 127.0.0.0 - 127.255.255.255 (loopback)
        if(a === 127) return true;

        // 169.254.0.0 - 169.254.255.255 (link-local)
        if(a === 169 && b === 254) return true;

        return false;
    }
}

// Port validation utility
export class PortValidation {
    public static validatePort(port: string | number): ValidationResult {
        let portNumber: number;

        if(typeof port === 'string') {
            if(!port || port.trim().length === 0) {
                return {
                    isValid: false,
                    errorMessage: 'Port number cannot be empty.',
                    errorCode: 'EmptyPort',
                };
            }

            // Check if it's a valid number
            const trimmedPort = port.trim();
            if(!/^\d+$/.test(trimmedPort)) {
                return {
                    isValid: false,
                    errorMessage: 'Port number must be a valid integer.',
                    errorCode: 'InvalidPortFormat',
                };
            }

            portNumber = parseInt(trimmedPort, 10);
        }
        else {
            portNumber = port;
        }

        // Check range
        if(portNumber < 1 || portNumber > 65535) {
            return {
                isValid: false,
                errorMessage: 'Port number must be between 1 and 65535.',
                errorCode: 'PortOutOfRange',
            };
        }

        // Check for well-known system ports (optional warning)
        if(portNumber < 1024) {
            // This is just informational, still valid
        }

        return { isValid: true };
    }

    public static getPortDescription(port: number): string {
        const commonPorts: Record<number, string> = {
            21: 'FTP',
            22: 'SSH',
            23: 'Telnet',
            25: 'SMTP',
            53: 'DNS',
            80: 'HTTP',
            110: 'POP3',
            143: 'IMAP',
            443: 'HTTPS',
            993: 'IMAPS',
            995: 'POP3S',
            3389: 'RDP',
            5432: 'PostgreSQL',
            3306: 'MySQL',
            6379: 'Redis',
            27017: 'MongoDB',
        };

        return commonPorts[port] || 'Unknown';
    }
}

// Combined validation utilities
export class ToolValidationUtilities {
    public static validateDomainOrIp(input: string): ValidationResult {
        // Try domain first
        const domainResult = DomainValidation.validateDomain(input);
        if(domainResult.isValid) {
            return domainResult;
        }

        // Try IP address
        const ipResult = IpAddressValidation.validateIpAddress(input);
        if(ipResult.isValid) {
            return ipResult;
        }

        // Return the more specific domain error
        return {
            isValid: false,
            errorMessage: 'Invalid domain name or IP address format.',
            errorCode: 'InvalidDomainOrIp',
        };
    }

    public static validateHostAndPort(host: string, port: string | number): ValidationResult {
        // Validate host
        const hostResult = DomainValidation.validateHostname(host);
        if(!hostResult.isValid) {
            return hostResult;
        }

        // Validate port
        const portResult = PortValidation.validatePort(port);
        if(!portResult.isValid) {
            return portResult;
        }

        return { isValid: true };
    }
}
