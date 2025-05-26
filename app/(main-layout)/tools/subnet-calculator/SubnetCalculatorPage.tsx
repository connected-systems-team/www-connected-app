'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import { Network } from '@phosphor-icons/react';

// Dependencies - Components
import { SubnetCalculator } from '@project/app/(main-layout)/tools/subnet-calculator/_components/SubnetCalculator';

// Component - SubnetCalculatorPage
export function SubnetCalculatorPage() {
    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>Subnet Calculator</span>
                <Network size={24} weight="regular" className="text-content" />
            </h1>
            <p className="mt-4 text-foreground-secondary">
                Calculate subnet information including network address, broadcast address, and host range.
            </p>
            <SubnetCalculator />
            <div className="mt-6">
                <h3 className="text-lg font-semibold">About Subnet Calculation</h3>
                <p className="mt-2 text-foreground-secondary">
                    Subnet calculation helps you understand how IP networks are divided into smaller segments. This tool
                    calculates network addresses, broadcast addresses, host ranges, and provides binary representations
                    to help you understand subnetting concepts.
                </p>
                <p className="mt-2 text-foreground-secondary">
                    You can input subnet masks in either dotted decimal notation (255.255.255.0) or CIDR notation (/24).
                    The calculator supports all valid IPv4 subnet masks and provides comprehensive information about
                    your network configuration.
                </p>
            </div>
        </div>
    );
}
