// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Finances • Ops',
    };
}

// Shim the default export from Structure
export { FinancesPage as default } from '@structure/source/ops/pages/finances/FinancesPage';
