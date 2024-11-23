// Dependencies - React and Next.js
import React from 'react';
import { headers } from 'next/headers';

// Dependencies - Main Components
import { PortChecker } from '@project/app/(main-layout)/port-checker/PortChecker';

// Component - HomePage
export function HomePage() {
    const header = headers();
    const publicIpAddress = header.get('x-forwarded-for') || header.get('x-real-ip');

    // Render the component
    return (
        <div className="container flex w-full items-center justify-center pt-8">
            <PortChecker publicIpAddress={publicIpAddress ?? undefined} />
        </div>
    );
}

// Export - Default
export default HomePage;
