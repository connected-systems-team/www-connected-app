// Dependencies - API
import { ToolContentPart, ToolResultItemBase } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';

// Dependencies - Form Input Interface
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';

// Legacy type alias for backward compatibility
export type SubnetCalculatorContentPart = ToolContentPart;

// Subnet Input Interface
export interface SubnetCalculatorInputInterface {
    ipAddress: string;
    subnetMask: string;
}

// Subnet Calculation Result Interface
export interface SubnetCalculationResultInterface {
    // Input
    inputIpAddress: string;
    inputSubnetMask: string;

    // Network Information
    networkAddress: string;
    broadcastAddress: string;
    subnetMask: string;
    wildcardMask: string;
    cidrNotation: string;

    // Host Information
    firstHostAddress: string;
    lastHostAddress: string;
    totalHosts: number;
    usableHosts: number;

    // Network Class
    networkClass: 'A' | 'B' | 'C' | 'D' | 'E' | 'Private' | 'Loopback' | 'APIPA';
    isPrivate: boolean;

    // Binary Representations
    binaryNetworkAddress: string;
    binarySubnetMask: string;
    binaryWildcardMask: string;

    // Subnetting Information
    numberOfSubnets: number;
    hostsPerSubnet: number;

    // Additional Information
    isValidNetwork: boolean;
    errorMessage?: string;
}

// Subnet Calculator Result Item Interface
export interface SubnetCalculatorResultItemInterface extends ToolResultItemBase {
    calculation?: SubnetCalculationResultInterface;
    ipAddress?: string;
    subnetMask?: string;
}

// Subnet Calculator Form Properties Interface
export interface SubnetCalculatorFormProperties {
    className?: string;
    ipAddressReference: React.RefObject<FormInputReferenceInterface>;
    subnetMaskReference: React.RefObject<FormInputReferenceInterface>;
    performSubnetCalculation: (ipAddress: string, subnetMask: string) => void;
}

// Subnet Calculator Results Properties Interface
export interface SubnetCalculatorResultsAnimatedListProperties {
    resultItems: SubnetCalculatorResultItemInterface[];
}

// Subnet Calculator Main Component Properties Interface
export type SubnetCalculatorProperties = object;

// Subnet Calculator Page Properties Interface
export type SubnetCalculatorPageProperties = object;

// CIDR to Subnet Mask Mapping
export const CIDR_TO_SUBNET_MASK: Record<number, string> = {
    1: '128.0.0.0',
    2: '192.0.0.0',
    3: '224.0.0.0',
    4: '240.0.0.0',
    5: '248.0.0.0',
    6: '252.0.0.0',
    7: '254.0.0.0',
    8: '255.0.0.0',
    9: '255.128.0.0',
    10: '255.192.0.0',
    11: '255.224.0.0',
    12: '255.240.0.0',
    13: '255.248.0.0',
    14: '255.252.0.0',
    15: '255.254.0.0',
    16: '255.255.0.0',
    17: '255.255.128.0',
    18: '255.255.192.0',
    19: '255.255.224.0',
    20: '255.255.240.0',
    21: '255.255.248.0',
    22: '255.255.252.0',
    23: '255.255.254.0',
    24: '255.255.255.0',
    25: '255.255.255.128',
    26: '255.255.255.192',
    27: '255.255.255.224',
    28: '255.255.255.240',
    29: '255.255.255.248',
    30: '255.255.255.252',
    31: '255.255.255.254',
    32: '255.255.255.255',
};

// Subnet Mask to CIDR Mapping
export const SUBNET_MASK_TO_CIDR: Record<string, number> = Object.entries(CIDR_TO_SUBNET_MASK).reduce(
    (acc, [cidr, mask]) => {
        acc[mask] = parseInt(cidr);
        return acc;
    },
    {} as Record<string, number>,
);
