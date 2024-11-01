// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'About',
    };
}

// Page - Home
export { default } from '@project/app/(main-layout)/about/AboutPage';
