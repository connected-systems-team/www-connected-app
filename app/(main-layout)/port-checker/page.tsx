// Dependencies - React and Next.js
import React from 'react';
import { Metadata } from 'next';
import { headers } from 'next/headers';

// Dependencies - Main Components
import { PortCheckerPage } from '@project/app/(main-layout)/port-checker/PortCheckerPage';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Port Checker',
    };
}

// Component - PortCheckerRoutePage
export function PortCheckerRoutePage() {
    const header = headers();
    const publicIpAddress = header.get('x-forwarded-for') || header.get('x-real-ip');

    // Render the component
    return <PortCheckerPage publicIpAddress={publicIpAddress ?? undefined} />;
}

// Export - Default
export default PortCheckerRoutePage;
