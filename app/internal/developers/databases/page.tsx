// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Databases • Developers • Internal',
    };
}

// Shim the default export from Structure
export { default } from '@structure/source/internal/pages/developers/DevelopersDatabasesPage';
