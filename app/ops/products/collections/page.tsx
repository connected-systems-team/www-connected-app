// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Collections • Products • Ops',
    };
}

// Shim the default export from Structure
export { ProductsCollectionsPage as default } from '@structure/source/ops/pages/products/ProductsCollectionsPage';
