// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Ship Orders • Fulfillment • Ops',
    };
}

// Shim the default export from Structure
export { FulfillmentShipOrdersPage as default } from '@structure/source/ops/pages/fulfillment/FulfillmentShipOrdersPage';
