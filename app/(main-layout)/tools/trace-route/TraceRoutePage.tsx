'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import { Path } from '@phosphor-icons/react';

// Component - TraceRoutePage
export function TraceRoutePage() {
    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>Trace Route</span>
                <Path size={24} weight="regular" className="text-content" />
            </h1>
            <p className="mt-4 text-foreground-secondary">Map the path and latency of packets to a destination host.</p>
            <hr className="my-6" />
            <div className="mt-10">
                <p>Tool goes here</p>
            </div>
        </div>
    );
}
