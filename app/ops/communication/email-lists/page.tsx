// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Email Lists • Communication • Ops',
    };
}

// Shim the default export from Structure
export { default } from '@structure/source/ops/pages/communication/EmailListsPage';
