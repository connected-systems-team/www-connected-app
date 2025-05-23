'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import { Binoculars } from '@phosphor-icons/react';

// Component - WhoisLookupPage
export function WhoisLookupPage() {
    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>WHOIS Lookup</span>
                <Binoculars size={24} weight="regular" className="text-content" />
            </h1>
            <p className="mt-5 text-foreground-secondary">Fetch domain registration and ownership details.</p>
            <div className="mt-10">
                <p>Tool goes here</p>
            </div>
        </div>
    );
}
