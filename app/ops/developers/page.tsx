// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Developers • Ops',
    };
}

// Shim the default export from Structure
export { DevelopersPage as default } from '@structure/source/ops/pages/developers/DevelopersPage';
