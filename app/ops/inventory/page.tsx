// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Inventory • Ops',
    };
}

// Shim the default export from Structure
export { InventoryPage as default } from '@structure/source/ops/pages/inventory/InventoryPage';
