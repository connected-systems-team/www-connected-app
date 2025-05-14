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

    // Get potential IP headers (prioritizing Cloudflare and x-real-ip headers)
    const cfConnectingIp = header.get('cf-connecting-ip');
    const realIp = header.get('x-real-ip');
    const trueClientIp = header.get('true-client-ip');
    const forwardedFor = header.get('x-forwarded-for');

    // Get the country code from the request headers
    const countryCode = header.get('cf-ipcountry') || header.get('x-country-code');

    // Prioritize headers that are working correctly in production
    // Use Cloudflare IPs first, then real-ip, then others
    let publicIpAddress = cfConnectingIp || realIp || trueClientIp;

    // Only use x-forwarded-for if it doesn't contain ::1 and the other headers are missing
    if(!publicIpAddress && forwardedFor && forwardedFor !== '::1') {
        // If there are multiple IPs in x-forwarded-for, take the first one
        if(forwardedFor.includes(',')) {
            const firstIp = forwardedFor.split(',')[0];
            if(firstIp) {
                publicIpAddress = firstIp.trim();
            }
            else {
                publicIpAddress = forwardedFor;
            }
        }
        else {
            publicIpAddress = forwardedFor;
        }
    }

    // Render the component
    return <PortCheckerPage publicIpAddress={publicIpAddress ?? undefined} countryCode={countryCode ?? undefined} />;
}

// Export - Default
export default PortCheckerRoutePage;
