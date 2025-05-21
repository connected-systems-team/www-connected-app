// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Communication • Ops',
    };
}

// Shim the default export from Structure
export { CommunicationPage as default } from '@structure/source/ops/pages/communication/CommunicationPage';
