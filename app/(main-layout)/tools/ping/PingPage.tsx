'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { Ping } from '@project/app/(main-layout)/tools/ping/_components/Ping';

// Dependencies - Assets
import { CellTower } from '@phosphor-icons/react';

// Component - PingPage
export interface PingPageProperties {
    countryCode?: string;
}
export function PingPage(properties: PingPageProperties) {
    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>Ping</span>
                <CellTower size={22} weight="regular" className="text-content" />
            </h1>
            <div className="mt-4 max-w-xl text-sm text-foreground-secondary">
                <p>Test the reachability of a host and measure network response times using our global network.</p>
            </div>

            <Ping className="" countryCode={properties.countryCode} />

            <div className="mt-6">
                <h3 className="">About</h3>

                <div className="mt-4 max-w-xl text-sm text-foreground-secondary">
                    <p>
                        Ping is a network utility that tests the reachability of a host and measures the round-trip time
                        for packets sent from the local host to a destination computer. This tool helps you diagnose
                        network connectivity issues and measure network latency across different regions.
                    </p>
                </div>
            </div>
        </div>
    );
}
