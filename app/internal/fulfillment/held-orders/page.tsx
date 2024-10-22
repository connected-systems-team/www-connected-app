// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Held Orders • Fulfillment • Internal',
    };
}

// Shim the default export from Structure
export { default } from '@structure/source/internal/pages/fulfillment/FulfillmentHeldOrdersPage';
