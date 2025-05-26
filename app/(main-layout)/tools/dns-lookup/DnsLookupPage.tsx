'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { DnsLookup } from '@project/app/(main-layout)/tools/dns-lookup/_components/DnsLookup';

// Dependencies - Assets
import { GlobeSimple } from '@phosphor-icons/react';

// Component - DnsLookupPage
export interface DnsLookupPageProperties {
    countryCode?: string;
}
export function DnsLookupPage(properties: DnsLookupPageProperties) {
    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>DNS Lookup</span>
                <GlobeSimple size={22} weight="regular" className="text-content" />
            </h1>
            <div className="mt-4 max-w-xl text-sm text-foreground-secondary">
                <p>
                    Resolve domain names to IP addresses and look up various DNS record types using our global network.
                </p>
            </div>

            <DnsLookup className="" countryCode={properties.countryCode} />

            <div className="mt-6">
                <h3 className="">About</h3>

                <div className="mt-4 max-w-xl text-sm text-foreground-secondary">
                    <p>
                        DNS (Domain Name System) translates human-readable domain names into IP addresses that computers
                        use to connect to websites and services. This tool helps you troubleshoot DNS issues, verify
                        record configurations, and understand how domains resolve across different regions.
                    </p>
                </div>
            </div>
        </div>
    );
}
