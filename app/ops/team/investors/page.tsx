// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Investors • Team • Ops',
    };
}

// Shim the default export from Structure
export { TeamInvestorsPage as default } from '@structure/source/ops/pages/team/TeamInvestorsPage';
