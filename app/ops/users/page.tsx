// Dependencies - React and Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Users • Ops',
    };
}

// Shim the default export from Structure
export { UsersPage as default } from '@structure/source/modules/account/pages/ops/UsersPage';
