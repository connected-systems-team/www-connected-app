// Dependencies - Next.js
import { Metadata } from 'next';

// Dependencies - Utilities
import { addCommas } from '@structure/source/utilities/Number';
import { getCountryCodeFromHeaders, getPublicIpAddressFromHeaders } from '@structure/source/utilities/next/NextHeaders';

// Function to convert number to IP address
function numberToIpAddress(ipNumber: number): string {
    const a = Math.floor(ipNumber / 16777216) % 256;
    const b = Math.floor(ipNumber / 65536) % 256;
    const c = Math.floor(ipNumber / 256) % 256;
    const d = ipNumber % 256;
    return `${a}.${b}.${c}.${d}`;
}

// Metadata
export async function generateMetadata(properties: {
    searchParams: { page?: string; itemsPerPage?: string };
}): Promise<Metadata> {
    // Get search parameters
    const page = parseInt(properties.searchParams.page || '1');
    const itemsPerPage = parseInt(properties.searchParams.itemsPerPage || '10');

    // Constants
    const totalIpAddresses = 4294967296; // 2^32 IPv4 addresses

    // If we have pagination parameters, create a dynamic title
    if (properties.searchParams.page || properties.searchParams.itemsPerPage) {
        // Calculate IP address range
        const startIpNumber = (page - 1) * itemsPerPage;
        const endIpNumber = Math.min(page * itemsPerPage - 1, totalIpAddresses - 1);
        
        const startIpAddress = numberToIpAddress(startIpNumber);
        const endIpAddress = numberToIpAddress(endIpNumber);

        const title = `${startIpAddress} - ${endIpAddress} • IPv4 Addresses • Connected`;
        const description = `Browse IPv4 addresses ${startIpAddress} through ${endIpAddress} (#{addCommas(startIpNumber + 1)} - #{addCommas(endIpNumber + 1)} out of ${addCommas(totalIpAddresses)} total).`;

        return {
            title,
            description,
        };
    }

    // Default title when no parameters
    return {
        title: 'IPv4 Addresses • Browse All 4.3 Billion IPv4 Addresses',
        description: 'Browse through all 4,294,967,296 possible IPv4 addresses from 0.0.0.0 to 255.255.255.255. View detailed information about public, private, and reserved IP ranges.',
    };
}

// Dependencies - App Components
import { IpAddressesPage } from './IpAddressesPage';

// Component - IpAddressesRoutePage
export function IpAddressesRoutePage() {
    // Get country code and IP address using utility functions
    const countryCode = getCountryCodeFromHeaders();
    const publicIpAddress = getPublicIpAddressFromHeaders();

    // Render the component
    return <IpAddressesPage publicIpAddress={publicIpAddress} countryCode={countryCode} />;
}

// Export - Default
export default IpAddressesRoutePage;