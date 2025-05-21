// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Metrics • Developers • Ops',
    };
}

// Shim the default export from Structure
export { DevelopersMetricsPage as default } from '@structure/source/ops/pages/developers/DevelopersMetricsPage';
