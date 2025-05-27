// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Domains',
    };
}

// Dependencies - App Components
export { DomainsPage as default } from './DomainsPage';
