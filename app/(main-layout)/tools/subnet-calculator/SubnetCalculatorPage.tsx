'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import { Network } from '@phosphor-icons/react';

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
            <hr className="my-6" />
            <div className="mt-10">
                <p>Tool goes here</p>
            </div>
        </div>
    );
}
