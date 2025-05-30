// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Automations • Marketing • Ops',
    };
}

// Shim the default export from Structure
export { MarketingAutomationsPage as default } from '@structure/source/ops/pages/marketing/MarketingAutomationsPage';
