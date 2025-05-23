'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import { Broadcast } from '@phosphor-icons/react';

// Component - PortCheckerPage
export function PortCheckerPage() {
    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="flex items-center justify-between gap-3">
                <span>Port Checker</span>
                <Broadcast size={24} weight="regular" className="text-content" />
            </h1>
            <p className="mt-4 max-w-screen-sm text-sm text-foreground-secondary">
                Port Checker is a tool which allows you to check the state of ports on any IP address or domain using
                our servers around the world. Whether you are setting up port forwarding, troubleshooting server
                application issues, or protecting your network, this tool helps ensure your configurations are correct.
            </p>
            <hr className="my-6" />
            <div className="mt-10">
                <p>Tool goes here</p>
            </div>
        </div>
    );
}
