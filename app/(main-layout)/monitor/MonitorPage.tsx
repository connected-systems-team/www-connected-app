'use client'; // This component uses client-only features

// Dependencies - React
import React from 'react';

// Dependencies - Main Components

// Dependencies - Local Components
// import { MonitorForm } from './MonitorForm';
// import { MonitorList } from './MonitorList';

// Component - MonitorPage
export function MonitorPage() {
    // Render the component
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="mb-2 text-3xl font-bold">Port Monitors</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Create and manage port monitors to track the status of your services
                </p>
            </div>

            {/* <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="rounded-lg border p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-bold">Create Monitor</h2>
                        <MonitorForm />
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="rounded-lg border p-6 shadow-sm">
                        <h2 className="mb-4 text-xl font-bold">Your Monitors</h2>
                        <MonitorList />
                    </div>
                </div>
            </div> */}
        </div>
    );
}
