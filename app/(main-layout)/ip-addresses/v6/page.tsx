// Dependencies - Next.js
import { Metadata } from 'next';

// Dependencies - Utilities
import { getCountryCodeFromHeaders, getPublicIpAddressFromHeaders } from '@structure/source/utilities/next/NextHeaders';

// Function to convert BigInt to IPv6 address
function bigIntToIpv6Address(ipNumber: bigint): string {
    // Convert to 128-bit hex string
    const hex = ipNumber.toString(16).padStart(32, '0');

    // Split into 8 groups of 4 hex digits
    const groups = [];
    for(let i = 0; i < 8; i++) {
        groups.push(hex.substr(i * 4, 4));
    }

    // Join with colons
    let ipv6 = groups.join(':');

    // Compress consecutive zeros (basic compression)
    ipv6 = ipv6.replace(/(:0{1,4})+/g, function (match) {
        return match.replace(/0{1,4}/g, '0');
    });

    // Replace consecutive :0: with ::
    ipv6 = ipv6.replace(/:0(:0)+/g, '::');

    // Handle edge cases for :: compression
    if(ipv6.startsWith('0::')) {
        ipv6 = '::' + ipv6.slice(3);
    }
    if(ipv6.endsWith('::0')) {
        ipv6 = ipv6.slice(0, -2);
    }

    return ipv6;
}

// Metadata
export async function generateMetadata(properties: {
    searchParams: { page?: string; itemsPerPage?: string };
}): Promise<Metadata> {
    // Get search parameters
    const page = parseInt(properties.searchParams.page || '1');
    const itemsPerPage = parseInt(properties.searchParams.itemsPerPage || '10');

    // Constants
    // const totalIpAddresses = BigInt('340282366920938463463374607431768211456'); // 2^128
    // const maxPracticalAddresses = BigInt('18446744073709551616'); // 2^64

    // If we have pagination parameters, create a dynamic title
    if(properties.searchParams.page || properties.searchParams.itemsPerPage) {
        // Calculate IPv6 address range
        const startIpNumber = BigInt((page - 1) * itemsPerPage);
        const endIpNumber = startIpNumber + BigInt(itemsPerPage) - BigInt(1);

        const startIpAddress = bigIntToIpv6Address(startIpNumber);
        const endIpAddress = bigIntToIpv6Address(endIpNumber);

        const title = `${startIpAddress} - ${endIpAddress} • IPv6 Addresses • Connected`;
        const description = `Browse IPv6 addresses ${startIpAddress} through ${endIpAddress} (position #${(
            startIpNumber + BigInt(1)
        ).toLocaleString()} - #${(endIpNumber + BigInt(1)).toLocaleString()} in the 128-bit address space).`;

        return {
            title,
            description,
        };
    }

    // Default title when no parameters
    return {
        title: 'IPv6 Addresses • Browse 340 Undecillion IPv6 Addresses',
        description:
            "Browse through the IPv6 address space with 2^128 possible addresses. That's 340,282,366,920,938,463,463,374,607,431,768,211,456 addresses - more than atoms in the observable universe!",
    };
}

// Dependencies - App Components
import { Ipv6AddressesPage } from './Ipv6AddressesPage';

// Component - Ipv6AddressesRoutePage
export function Ipv6AddressesRoutePage() {
    // Get country code and IP address using utility functions
    const countryCode = getCountryCodeFromHeaders();
    const publicIpAddress = getPublicIpAddressFromHeaders();

    // Render the component
    return <Ipv6AddressesPage publicIpAddress={publicIpAddress} countryCode={countryCode} />;
}

// Export - Default
export default Ipv6AddressesRoutePage;
