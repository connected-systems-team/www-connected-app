// Dependencies - React and Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Abandoned Checkouts • Orders • Ops',
    };
}

// Shim the default export from Structure
export { OrdersAbandonedCheckoutsPage as default } from '@structure/source/modules/commerce/pages/ops/OrdersAbandonedCheckoutsPage';
