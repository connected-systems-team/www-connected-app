// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Sign Out',
    };
}

// Shim the default export from Structure
export { default } from '@structure/source/modules/account/pages/SignOutPage';
