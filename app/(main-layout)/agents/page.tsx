// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Agents',
    };
}

// Page - AI Agents
export { AgentsPage as default } from '@project/app/(main-layout)/agents/AgentsPage';
