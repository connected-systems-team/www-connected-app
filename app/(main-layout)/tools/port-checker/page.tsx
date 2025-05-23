// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Port Checker',
    };
}

// Page - Port Checker
export { PortCheckerPage as default } from '@project/app/(main-layout)/tools/port-checker/PortCheckerPage';
