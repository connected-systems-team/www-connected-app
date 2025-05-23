'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import { GlobeSimple } from '@phosphor-icons/react';

// Component - DnsLookupPage
export function DnsLookupPage() {
    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>DNS Lookup</span>
                <GlobeSimple size={24} weight="regular" className="text-content" />
            </h1>
            <p className="mt-5 text-foreground-secondary">Resolve a domain name to its corresponding IP address.</p>
            <div className="mt-10">
                <p>Tool goes here</p>
            </div>
        </div>
    );
}
