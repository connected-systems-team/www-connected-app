// Dependencies - Next.js
import { Metadata } from 'next';

// Dependencies - Main Components
import { MonitorPage } from './MonitorPage';

// Next.js Metadata
export const metadata: Metadata = {
    title: 'Port Monitors | Connected',
    description: 'Create and manage port monitors to track your services',
};

// Export - Default
export default function Page() {
    return <MonitorPage />;
}
