// Dependencies - Next.js
import { Metadata, ResolvingMetadata } from 'next';

// Dependencies - Utilities
import { getUrlPathFromMetadata } from '@structure/source/utilities/next/Next';

// Metadata
export async function generateMetadata(properties: unknown, parentMetadata: ResolvingMetadata): Promise<Metadata> {
    // Get the URL path from the metadata state
    const urlPath = getUrlPathFromMetadata(parentMetadata) ?? '';

    // Get the domain from the URL path
    const domain = urlPath.split('/').pop();

    // Set the title
    const title = domain ? domain + ' • Domains' : 'Domains';

    return {
        title: title,
    };
}

// Page - Home
export { default } from '@project/app/(main-layout)/domains/[domain]/DomainPage';
