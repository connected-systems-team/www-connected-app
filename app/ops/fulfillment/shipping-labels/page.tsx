// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Shipping Labels • Fulfillment • Ops',
    };
}

// Shim the default export from Structure
export { FulfillmentShippingLabelsPage as default } from '@structure/source/ops/pages/fulfillment/FulfillmentShippingLabelsPage';
