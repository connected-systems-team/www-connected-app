// Dependencies - React and Next.js
import { Metadata } from 'next';

// Dependencies - Main Components
import { OrderPage } from '@structure/source/modules/commerce/pages/ops/OrderPage';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Order • Ops',
    };
}

// Component - Page
export default function Page(properties: {
    params: {
        orderId: string;
    };
}) {
    return <OrderPage orderId={properties.params.orderId} />;
}
