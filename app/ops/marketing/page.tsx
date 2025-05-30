// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Marketing • Ops',
    };
}

// Shim the default export from Structure
export { MarketingPage as default } from '@structure/source/ops/pages/marketing/MarketingPage';
