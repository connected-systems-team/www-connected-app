// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Transfers • Inventory • Ops',
    };
}

// Shim the default export from Structure
export { default } from '@structure/source/ops/pages/inventory/InventoryTransfersPage';
