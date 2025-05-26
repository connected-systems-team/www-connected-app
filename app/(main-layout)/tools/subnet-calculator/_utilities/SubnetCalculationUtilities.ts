// Dependencies - Types
import {
    SubnetCalculationResultInterface,
    CIDR_TO_SUBNET_MASK,
    SUBNET_MASK_TO_CIDR,
} from '@project/app/(main-layout)/tools/subnet-calculator/_types/SubnetCalculatorTypes';

// Dependencies - Validation
import { IpAddressValidation } from '@project/app/(main-layout)/tools/_utilities/ToolValidationUtilities';

// Subnet Calculation Utilities
export class SubnetCalculationUtilities {
    // Main function to calculate subnet information
    public static calculateSubnet(ipAddress: string, subnetMask: string): SubnetCalculationResultInterface {
        try {
            // Validate inputs
            const ipValidation = IpAddressValidation.validateIpv4Format(ipAddress);
            const maskValidation = this.validateSubnetMask(subnetMask);

            if(!ipValidation.isValid) {
                return this.createErrorResult(
                    ipAddress,
                    subnetMask,
                    ipValidation.errorMessage || 'Invalid IP address format',
                );
            }

            if(!maskValidation.isValid) {
                return this.createErrorResult(
                    ipAddress,
                    subnetMask,
                    maskValidation.errorMessage || 'Invalid subnet mask format',
                );
            }

            // Parse IP address and subnet mask to arrays
            const ipParts = ipAddress.split('.').map(Number);
            const maskParts = subnetMask.split('.').map(Number);

            // Calculate network address
            const networkParts = ipParts.map((ip, index) => ip & (maskParts[index] || 0));
            const networkAddress = networkParts.join('.');

            // Calculate wildcard mask
            const wildcardParts = maskParts.map((octet) => 255 - octet);
            const wildcardMask = wildcardParts.join('.');

            // Calculate broadcast address
            const broadcastParts = networkParts.map((network, index) => network | (wildcardParts[index] || 0));
            const broadcastAddress = broadcastParts.join('.');

            // Calculate CIDR notation
            const cidrBits = this.subnetMaskToCidr(subnetMask);
            const cidrNotation = `${networkAddress}/${cidrBits}`;

            // Calculate host addresses
            const firstHostParts = [...networkParts];
            if(firstHostParts[3] !== undefined) firstHostParts[3] += 1;
            const firstHostAddress = firstHostParts.join('.');

            const lastHostParts = [...broadcastParts];
            if(lastHostParts[3] !== undefined) lastHostParts[3] -= 1;
            const lastHostAddress = lastHostParts.join('.');

            // Calculate host counts
            const hostBits = 32 - cidrBits;
            const totalHosts = Math.pow(2, hostBits);
            const usableHosts = Math.max(0, totalHosts - 2); // Subtract network and broadcast

            // Determine network class and type
            const networkClass = this.getNetworkClass(ipAddress);
            const isPrivate = this.isPrivateIpAddress(ipAddress);

            // Calculate binary representations
            const binaryNetworkAddress = this.ipToBinary(networkAddress);
            const binarySubnetMask = this.ipToBinary(subnetMask);
            const binaryWildcardMask = this.ipToBinary(wildcardMask);

            // Calculate subnetting information
            const numberOfSubnets = this.calculateNumberOfSubnets(subnetMask, networkClass);
            const hostsPerSubnet = usableHosts;

            return {
                inputIpAddress: ipAddress,
                inputSubnetMask: subnetMask,
                networkAddress,
                broadcastAddress,
                subnetMask,
                wildcardMask,
                cidrNotation,
                firstHostAddress,
                lastHostAddress,
                totalHosts,
                usableHosts,
                networkClass,
                isPrivate,
                binaryNetworkAddress,
                binarySubnetMask,
                binaryWildcardMask,
                numberOfSubnets,
                hostsPerSubnet,
                isValidNetwork: true,
            };
        }
        catch(error) {
            return this.createErrorResult(
                ipAddress,
                subnetMask,
                error instanceof Error ? error.message : 'Unknown calculation error',
            );
        }
    }

    // Validate subnet mask
    private static validateSubnetMask(subnetMask: string): { isValid: boolean; errorMessage?: string } {
        // Check if it's in CIDR format (e.g., /24)
        if(subnetMask.startsWith('/')) {
            const cidr = parseInt(subnetMask.substring(1));
            if(isNaN(cidr) || cidr < 0 || cidr > 32) {
                return { isValid: false, errorMessage: 'CIDR notation must be between 0 and 32' };
            }
            return { isValid: true };
        }

        // Validate as dotted decimal notation
        const ipValidation = IpAddressValidation.validateIpv4Format(subnetMask);
        if(!ipValidation.isValid) {
            return { isValid: false, errorMessage: 'Invalid subnet mask format' };
        }

        // Check if it's a valid subnet mask
        const parts = subnetMask.split('.').map(Number);
        const binaryMask = parts.map((octet) => octet.toString(2).padStart(8, '0')).join('');

        // Subnet mask should have contiguous 1s followed by contiguous 0s
        const match = binaryMask.match(/^(1*)(0*)$/);
        if(!match) {
            return { isValid: false, errorMessage: 'Invalid subnet mask - must have contiguous bits' };
        }

        return { isValid: true };
    }

    // Convert subnet mask to CIDR notation
    private static subnetMaskToCidr(subnetMask: string): number {
        // Handle CIDR format input
        if(subnetMask.startsWith('/')) {
            return parseInt(subnetMask.substring(1));
        }

        // Convert dotted decimal to CIDR
        if(SUBNET_MASK_TO_CIDR[subnetMask]) {
            return SUBNET_MASK_TO_CIDR[subnetMask];
        }

        // Calculate manually
        const parts = subnetMask.split('.').map(Number);
        const binaryMask = parts.map((octet) => octet.toString(2).padStart(8, '0')).join('');

        return binaryMask.split('1').length - 1;
    }

    // Convert CIDR to subnet mask
    public static cidrToSubnetMask(cidr: number): string {
        return CIDR_TO_SUBNET_MASK[cidr] || '255.255.255.255';
    }

    // Determine network class
    private static getNetworkClass(ipAddress: string): 'A' | 'B' | 'C' | 'D' | 'E' | 'Private' | 'Loopback' | 'APIPA' {
        const firstOctet = parseInt(ipAddress.split('.')[0] || '0');

        // Special cases
        if(ipAddress.startsWith('127.')) return 'Loopback';
        if(ipAddress.startsWith('169.254.')) return 'APIPA';
        if(this.isPrivateIpAddress(ipAddress)) return 'Private';

        // Standard classes
        if(firstOctet >= 1 && firstOctet <= 126) return 'A';
        if(firstOctet >= 128 && firstOctet <= 191) return 'B';
        if(firstOctet >= 192 && firstOctet <= 223) return 'C';
        if(firstOctet >= 224 && firstOctet <= 239) return 'D';
        if(firstOctet >= 240 && firstOctet <= 255) return 'E';

        return 'C'; // Default fallback
    }

    // Check if IP address is private
    private static isPrivateIpAddress(ipAddress: string): boolean {
        const parts = ipAddress.split('.').map(Number);
        const [a, b] = parts;

        // 10.0.0.0 - 10.255.255.255
        if(a === 10) return true;

        // 172.16.0.0 - 172.31.255.255
        if(a === 172 && b !== undefined && b >= 16 && b <= 31) return true;

        // 192.168.0.0 - 192.168.255.255
        if(a === 192 && b === 168) return true;

        return false;
    }

    // Convert IP address to binary
    private static ipToBinary(ipAddress: string): string {
        return ipAddress
            .split('.')
            .map((octet) => parseInt(octet).toString(2).padStart(8, '0'))
            .join('.');
    }

    // Calculate number of subnets
    private static calculateNumberOfSubnets(
        subnetMask: string,
        networkClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'Private' | 'Loopback' | 'APIPA',
    ): number {
        const cidrBits = this.subnetMaskToCidr(subnetMask);

        // Default subnet bits based on class
        let defaultClassBits = 24; // Class C default
        if(networkClass === 'A') defaultClassBits = 8;
        else if(networkClass === 'B') defaultClassBits = 16;

        const subnetBits = Math.max(0, cidrBits - defaultClassBits);
        return Math.pow(2, subnetBits);
    }

    // Create error result
    private static createErrorResult(
        ipAddress: string,
        subnetMask: string,
        errorMessage: string,
    ): SubnetCalculationResultInterface {
        return {
            inputIpAddress: ipAddress,
            inputSubnetMask: subnetMask,
            networkAddress: '',
            broadcastAddress: '',
            subnetMask: '',
            wildcardMask: '',
            cidrNotation: '',
            firstHostAddress: '',
            lastHostAddress: '',
            totalHosts: 0,
            usableHosts: 0,
            networkClass: 'C',
            isPrivate: false,
            binaryNetworkAddress: '',
            binarySubnetMask: '',
            binaryWildcardMask: '',
            numberOfSubnets: 0,
            hostsPerSubnet: 0,
            isValidNetwork: false,
            errorMessage,
        };
    }

    // Normalize subnet mask input (convert CIDR to dotted decimal if needed)
    public static normalizeSubnetMask(input: string): string {
        if(input.startsWith('/')) {
            const cidr = parseInt(input.substring(1));
            return this.cidrToSubnetMask(cidr);
        }
        return input;
    }

    // Get common subnet masks for suggestions
    public static getCommonSubnetMasks(): Array<{ label: string; value: string; cidr: number }> {
        return [
            { label: '255.255.255.0 (/24)', value: '255.255.255.0', cidr: 24 },
            { label: '255.255.255.128 (/25)', value: '255.255.255.128', cidr: 25 },
            { label: '255.255.255.192 (/26)', value: '255.255.255.192', cidr: 26 },
            { label: '255.255.255.224 (/27)', value: '255.255.255.224', cidr: 27 },
            { label: '255.255.255.240 (/28)', value: '255.255.255.240', cidr: 28 },
            { label: '255.255.255.248 (/29)', value: '255.255.255.248', cidr: 29 },
            { label: '255.255.255.252 (/30)', value: '255.255.255.252', cidr: 30 },
            { label: '255.255.0.0 (/16)', value: '255.255.0.0', cidr: 16 },
            { label: '255.0.0.0 (/8)', value: '255.0.0.0', cidr: 8 },
        ];
    }
}
