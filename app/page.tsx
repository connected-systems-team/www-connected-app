// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Connected • Network Monitoring and Security',
    };
}

// Page - Wait List
export { default } from '@structure/source/modules/wait-list/WaitListPage';

// Page - Home
// export { default } from '@structure/source/pages/home/HomePage';
