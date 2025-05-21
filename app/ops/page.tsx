// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Ops',
    };
}

// Shim the default export from Structure
export { OpsHomePage as default } from '@structure/source/ops/pages/home/OpsHomePage';
