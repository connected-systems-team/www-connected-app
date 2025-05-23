'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import { CellTower } from '@phosphor-icons/react';

// Component - PingPage
export function PingPage() {
    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>Ping</span>
                <CellTower size={24} weight="regular" className="text-content" />
            </h1>
            <p className="mt-5 text-foreground-secondary">Test the reachability of a host and measure response time.</p>
            <div className="mt-10">
                <p>Tool goes here</p>
            </div>
        </div>
    );
}
