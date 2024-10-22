// Dependencies - Next.js
import { Metadata, ResolvingMetadata } from 'next';

// Dependencies - Utilities
import { getUrlPathFromMetadata } from '@structure/source/utilities/next/Next';

// Metadata
export async function generateMetadata(properties: unknown, parentMetadata: ResolvingMetadata): Promise<Metadata> {
    // Get the URL path from the metadata state
    const urlPath = getUrlPathFromMetadata(parentMetadata) ?? '';

    // Get the domain from the URL path
    const port = urlPath.split('/').pop();

    // Set the title
    const title = port ? 'Port ' + port + ' • Ports' : 'Ports';

    return {
        title: title,
    };
}

// Page - Home
export { default } from '@project/app/(main-layout)/ports/[port]/PortPage';
