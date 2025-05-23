'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { PortChecker } from '@project/app/(main-layout)/tools/port-checker/_components/PortChecker';

// Dependencies - Assets
import { Broadcast } from '@phosphor-icons/react';

// Component - PortCheckerPage
export interface PortCheckerPageProperties {
    publicIpAddress?: string;
    countryCode?: string;
}
export function PortCheckerPage(properties: PortCheckerPageProperties) {
    // Render the component
    return (
        <div className="container max-w-screen-md pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>Port Checker</span>
                <Broadcast size={22} weight="regular" className="text-content" />
            </h1>
            <div className="mt-4 text-sm text-foreground-secondary">
                <p>Check the state of ports on any IP address or domain using our servers around the world.</p>
            </div>

            <PortChecker
                className="mt-6"
                publicIpAddress={properties.publicIpAddress ?? undefined}
                countryCode={properties.countryCode}
            />

            <div className="mt-6">
                <h3 className="">About</h3>

                <div className="mt-4 text-sm text-foreground-secondary">
                    <p>
                        Whether you are setting up port forwarding, troubleshooting server application issues, or
                        protecting your network, this tool helps ensure your configurations are correct.
                    </p>
                </div>
            </div>
        </div>
    );
}
