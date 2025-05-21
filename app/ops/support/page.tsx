// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Support • Ops',
    };
}

// Shim the default export from Structure
export { SupportPage as default } from '@structure/source/ops/pages/support/SupportPage';
