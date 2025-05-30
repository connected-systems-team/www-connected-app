// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Discounts • Ops',
    };
}

// Shim the default export from Structure
export { DiscountsPage as default } from '@structure/source/ops/pages/discounts/DiscountsPage';
