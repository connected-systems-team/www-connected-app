'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import { FingerprintSimple } from '@phosphor-icons/react';

// Component - SslTlsCheckerPage
export function SslTlsCheckerPage() {
    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>SSL/TLS Checker</span>
                <FingerprintSimple size={24} weight="regular" className="text-content" />
            </h1>
            <p className="mt-4 text-foreground-secondary">
                Inspect the validity and security of a domain&apos;s SSL certificate.
            </p>
            <hr className="my-6" />
            <div className="mt-10">
                <p>Tool goes here</p>
            </div>
        </div>
    );
}
