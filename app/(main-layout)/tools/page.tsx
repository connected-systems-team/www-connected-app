// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Network Tools',
    };
}

// Page - Home
export { ToolsPage as default } from '@project/app/(main-layout)/tools/ToolsPage';
