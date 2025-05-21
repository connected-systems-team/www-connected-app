// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Team • Ops',
    };
}

// Shim the default export from Structure
export { TeamPage as default } from '@structure/source/ops/pages/team/TeamPage';
