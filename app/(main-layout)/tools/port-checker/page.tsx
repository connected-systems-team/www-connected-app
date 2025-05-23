// Dependencies - React and Next.js
import React from 'react';
import { Metadata } from 'next';

// Dependencies - Main Components
import { PortCheckerPage } from '@project/app/(main-layout)/tools/port-checker/PortCheckerPage';

// Dependencies - Utilities
import { getCountryCodeFromHeaders, getPublicIpAddressFromHeaders } from '@structure/source/utilities/next/NextHeaders';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Port Checker • Check Open Ports Online',
    };
}

// Component - PortCheckerRoutePage
export function PortCheckerRoutePage() {
    // Get country code and IP address using utility functions
    const countryCode = getCountryCodeFromHeaders();
    const publicIpAddress = getPublicIpAddressFromHeaders();

    // Render the component
    return <PortCheckerPage publicIpAddress={publicIpAddress} countryCode={countryCode} />;
}

// Export - Default
export default PortCheckerRoutePage;
