// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Vouchers • Discounts • Ops',
    };
}

// Shim the default export from Structure
export { DiscountsVouchersPage as default } from '@structure/source/ops/pages/discounts/DiscountsVouchersPage';
