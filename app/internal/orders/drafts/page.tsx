// Dependencies - React and Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Drafts • Orders • Internal',
    };
}

// Shim the default export from Structure
export { default } from '@structure/source/modules/commerce/pages/internal/OrdersDraftsPage';
