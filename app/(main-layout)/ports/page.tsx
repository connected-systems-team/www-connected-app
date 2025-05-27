// Dependencies - Next.js
import { Metadata } from 'next';

// Dependencies - Utilities
import { addCommas } from '@structure/source/utilities/Number';

// Metadata
export async function generateMetadata(properties: {
    searchParams: { page?: string; itemsPerPage?: string };
}): Promise<Metadata> {
    // Get search parameters
    const page = parseInt(properties.searchParams.page || '1');
    const itemsPerPage = parseInt(properties.searchParams.itemsPerPage || '10');

    // If we have pagination parameters, create a dynamic title
    if(properties.searchParams.page || properties.searchParams.itemsPerPage) {
        // Calculate port range
        const startPort = (page - 1) * itemsPerPage + 1;
        const endPort = Math.min(page * itemsPerPage, 65535);

        const title = `Ports ${addCommas(startPort)} - ${addCommas(endPort)} • Network Ports`;
        const description = `Browse TCP and UDP ports ${addCommas(startPort)} through ${addCommas(
            endPort,
        )} out of 65,535 total network ports.`;

        return {
            title,
            description,
        };
    }

    // Default title when no parameters
    return {
        title: 'Network Ports • Browse TCP and UDP Ports 1 through 65,535',
        description: 'Browse through all valid TCP and UDP port numbers, 1 through 65,535.',
    };
}

// Dependencies - App Components
import { PortsPage } from './PortsPage';

// Export - Default
export default function Page() {
    return <PortsPage />;
}
