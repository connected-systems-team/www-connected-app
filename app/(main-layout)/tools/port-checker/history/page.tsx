// Dependencies - React and Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'History • Port Checker',
    };
}

// Page - Home
export { PortCheckerHistoryPage as default } from '@project/app/(main-layout)/tools/port-checker/history/PortCheckerHistoryPage';
