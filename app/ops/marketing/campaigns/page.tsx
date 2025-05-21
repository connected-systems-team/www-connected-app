// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Campaigns • Marketing • Ops',
    };
}

// Shim the default export from Structure
export { MarketingCampaignsPage as default } from '@structure/source/ops/pages/marketing/MarketingCampaignsPage';
