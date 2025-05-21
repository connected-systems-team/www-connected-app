// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Databases • Developers • Ops',
    };
}

// Import from Structure
export { DevelopersDatabasePage as default } from '@structure/source/ops/pages/developers/DevelopersDatabasesPage';
