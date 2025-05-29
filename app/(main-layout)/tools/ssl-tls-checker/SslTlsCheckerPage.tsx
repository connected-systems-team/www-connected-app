'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import { FingerprintSimple } from '@phosphor-icons/react';

// Dependencies - Components
import { SslTlsChecker } from '@project/app/(main-layout)/tools/ssl-tls-checker/_components/SslTlsChecker';

// Dependencies - Types
import { SslTlsCheckerPageProperties } from '@project/app/(main-layout)/tools/ssl-tls-checker/_types/SslTlsCheckerTypes';

// Component - SslTlsCheckerPage
export function SslTlsCheckerPage(properties: SslTlsCheckerPageProperties) {
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
            <SslTlsChecker countryCode={properties.countryCode} />
            <div className="mt-6">
                <h3 className="text-lg font-semibold">About SSL/TLS Certificate Checking</h3>
                <p className="mt-2 text-foreground-secondary">
                    SSL/TLS certificates secure communication between web browsers and servers. This tool analyzes
                    certificate validity, expiration dates, security levels, and certificate chain information to help
                    you ensure your domain&apos;s security configuration is properly set up.
                </p>
                <p className="mt-2 text-foreground-secondary">
                    The checker examines certificate details including issuer information, encryption algorithms, key
                    sizes, and alternative names while also validating the certificate chain and security protocols.
                </p>
            </div>
        </div>
    );
}
