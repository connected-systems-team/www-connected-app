// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Products • Ops',
    };
}

// Shim the default export from Structure
export { ProductsPage as default } from '@structure/source/ops/pages/products/ProductsPage';
