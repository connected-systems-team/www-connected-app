// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components

// Component - About
export function About() {
    // Render the component
    return (
        <>
            <p className="mt-8 font-medium">About</p>
            <p className="r mt-1 text-sm">
                The Connected Port Checker is a tool which allows you to check the state of ports on any IP address or
                domain using our servers around the world. Whether you are setting up port forwarding, troubleshooting
                server application issues, or protecting your network, this tool helps ensure your configurations are
                correct.
            </p>
        </>
    );
}
