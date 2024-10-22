// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Tests',
    };
}

// Page - Home
export { default } from '@project/app/(main-layout)/tests/TestsPage';
