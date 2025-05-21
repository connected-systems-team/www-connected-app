// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Object Storage • Developers • Ops',
    };
}

// Shim the default export from Structure
export { DevelopersObjectStoragePage as default } from '@structure/source/ops/pages/developers/DevelopersObjectStoragePage';
