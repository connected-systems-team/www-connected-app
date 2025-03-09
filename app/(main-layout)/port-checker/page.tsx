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
    const allHeaders = Array.from(header.entries());
    console.log('All Headers:', JSON.stringify(allHeaders, null, 2));
    
    const forwardedFor = header.get('x-forwarded-for');
    const realIp = header.get('x-real-ip');
    const cfConnectingIp = header.get('cf-connecting-ip');
    const trueClientIp = header.get('true-client-ip');
    
    console.log('x-forwarded-for:', forwardedFor);
    console.log('x-real-ip:', realIp);
    console.log('cf-connecting-ip:', cfConnectingIp);
    console.log('true-client-ip:', trueClientIp);
    
    // Try multiple headers that might contain the client IP
    const publicIpAddress = forwardedFor || realIp || cfConnectingIp || trueClientIp;

    // Render the component
    return <PortCheckerPage publicIpAddress={publicIpAddress ?? undefined} />;
}

// Export - Default
export default PortCheckerRoutePage;
