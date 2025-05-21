// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Data • Developers • Ops',
    };
}

// Shim the default export from Structure
export { DevelopersDataPage as default } from '@structure/source/ops/pages/developers/DevelopersDataPage';
