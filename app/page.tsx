// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Connected • Network Monitoring and Security',
    };
}

// Page - Home
export { HomePage as default } from '@project/app/HomePage';
