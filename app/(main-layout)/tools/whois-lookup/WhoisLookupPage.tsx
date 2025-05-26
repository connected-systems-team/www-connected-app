'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { WhoisLookup } from '@project/app/(main-layout)/tools/whois-lookup/_components/WhoisLookup';

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
            <p className="mt-4 text-foreground-secondary">Fetch domain registration and ownership details.</p>
            <hr className="my-6" />

            <WhoisLookup />
        </div>
    );
}
