// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Settings • Ops',
    };
}

// Shim the default export from Structure
export { SettingsPage as default } from '@structure/source/ops/pages/settings/SettingsPage';
