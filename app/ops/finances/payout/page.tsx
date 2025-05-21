// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Payout • Finances • Ops',
    };
}

// Shim the default export from Structure
export { FinancesPayoutPage as default } from '@structure/source/ops/pages/finances/FinancesPayoutPage';
