// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Atlas',
    };
}

// Page - Fun
export { default } from '@project/app/(main-layout)/atlas/AtlasPage';
