// Dependencies - React and Next.js
import React from 'react';
import { headers } from 'next/headers';

// Dependencies - Main Components
import { AuthorizationLayout } from '@structure/source/layouts/AuthorizationLayout';
import { PortCheckerPage } from '@project/app/(main-layout)/port-checker/PortCheckerPage';

// Component - HomePage
export function HomePage() {
    const header = headers();
    const publicIpAddress = header.get('x-forwarded-for') || header.get('x-real-ip');

    // Render the component
    return (
        <AuthorizationLayout>
            <PortCheckerPage publicIpAddress={publicIpAddress ?? undefined} />
        </AuthorizationLayout>
    );
}

// Export - Default
export default HomePage;
