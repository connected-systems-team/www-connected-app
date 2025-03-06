'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { DialogInterface, Dialog } from '@structure/source/common/dialogs/Dialog';

// Dependencies - Types
import { PortState } from '@project/source/modules/connected/types/PortTypes';

// Component - PortStateDialog
export interface PortStateDialogInterface extends DialogInterface {
    portState: PortState;
    isSystemError?: boolean;
    isTimeout?: boolean;
    errorMessage?: string;
}

export function PortStateDialog(properties: PortStateDialogInterface) {
    // State
    const [open, setOpen] = React.useState(properties.open ?? false);

    // Effect to update the open state when the open property changes
    React.useEffect(
        function () {
            setOpen(properties.open ?? false);
        },
        [properties.open],
    );

    // Function to intercept the onOpenChange event
    function onOpenChangeIntercept(open: boolean) {
        // Optionally call the onOpenChange callback
        properties.onOpenChange?.(open);

        // Update the open state
        setOpen(open);
    }

    // Get the dialog title and content based on the port state
    const { title, content } = getPortStateInformation(
        properties.portState,
        properties.isSystemError,
        properties.isTimeout,
        properties.errorMessage,
    );

    // Render the component
    return (
        <Dialog
            header={title}
            content={content}
            footerCloseButton={true}
            {...properties}
            // Spread these properties after all properties to ensure they are not overwritten
            open={open}
            onOpenChange={onOpenChangeIntercept}
        />
    );
}

// Function to get the title and content for a specific port state
function getPortStateInformation(
    portState: PortState,
    isSystemError?: boolean,
    isTimeout?: boolean,
    errorMessage?: string,
): { title: string; content: React.ReactNode } {
    // Special case for system errors
    if(isSystemError) {
        // If we have a specific error message, show it
        if(errorMessage) {
            return {
                title: 'Error Information',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>The port check service returned the following error:</p>
                        <div className="rounded bg-gray-100 p-2 dark:bg-gray-800">
                            <code>{errorMessage}</code>
                        </div>
                        <p>What this means:</p>
                        {errorMessage.toLowerCase().includes('no regions available') ? (
                            <ul className="list-disc space-y-1 pl-5">
                                <li>All of our regions are currently unavailable.</li>
                                <li>Our servers in this region may be down or at capacity.</li>
                                <li>Try again later when regions become available.</li>
                            </ul>
                        ) : (
                            <ul className="list-disc space-y-1 pl-5">
                                <li>This is likely a temporary issue with our service.</li>
                                <li>Our team has been notified of this error.</li>
                            </ul>
                        )}
                        <p>Please try again in a few minutes, or try using a different region.</p>
                    </div>
                ),
            };
        }

        // Default system error case
        return {
            title: 'System Error',
            content: (
                <div className="space-y-4 text-sm">
                    <p>The service encountered an error while processing your request.</p>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>This is a temporary issue with our system.</li>
                        <li>The error is not related to the port or host you are checking.</li>
                        <li>Our team has been notified of this issue.</li>
                    </ul>
                    <p>Please try again in awhile, or try using a different region.</p>
                </div>
            ),
        };
    }

    // Special case for timeouts
    if(isTimeout) {
        return {
            title: 'Request Timeout',
            content: (
                <div className="space-y-4 text-sm">
                    <p>Your request timed out without receiving a response.</p>
                    <ul className="list-disc space-y-1 pl-5">
                        <li>Your Internet connection might be unavailable or unstable.</li>
                        <li>Our servers may be down or experiencing connectivity issues.</li>
                    </ul>
                    <p>Please verify your Internet connection or try again in awhile.</p>
                </div>
            ),
        };
    }
    switch(portState) {
        case 'open':
            return {
                title: 'What is an open port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>This port is open, indicating the server is actively accepting connection requests.</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                            <li>A service (e.g., web or email server) is running here.</li>
                            <li>You can establish connections and exchange data through this port.</li>
                        </ul>
                        <p>
                            Open ports are normal when services are running. For example, web servers typically use
                            ports 80 (HTTP) or 443 (HTTPS).
                        </p>
                    </div>
                ),
            };

        case 'closed':
            return {
                title: 'What is a closed port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>This port is closed, meaning the server actively refuses connection requests.</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>No service is running here.</li>
                            <li>Connection attempts receive an immediate refusal.</li>
                        </ul>
                        <p>
                            Closed ports typically indicate that a port is intentionally unused or disabled. It&apos;s
                            not usually a security concern.
                        </p>
                    </div>
                ),
            };

        case 'filtered':
            return {
                title: 'What is a filtered port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            This port is filtered, indicating that connection attempts are being silently ignored,
                            likely due to firewall rules.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>No response is returned when trying to connect.</li>
                            <li>Firewalls or security policies are actively blocking this port.</li>
                        </ul>
                        <p>
                            Filtered ports are typically used to enhance security by preventing unauthorized
                            connections.
                        </p>
                    </div>
                ),
            };

        case 'unfiltered':
            return {
                title: 'What is an unfiltered port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            This port is unfiltered, meaning it is accessible, but there&apos;s no indication if a
                            service is actively listening.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>Port responds to connection attempts but may not have active services.</li>
                            <li>Further checks are required to determine if a service is running.</li>
                        </ul>
                    </div>
                ),
            };

        case 'open|filtered':
            return {
                title: 'What is an open|filtered port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>This port state is ambiguous, indicating it could be either open or filtered.</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>The port might be silently dropping packets.</li>
                            <li>Further scanning methods are necessary for clarity.</li>
                        </ul>
                    </div>
                ),
            };

        case 'closed|filtered':
            return {
                title: 'What is a closed|filtered port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            This port is closed or filtered, indicating uncertainty about whether it&apos;s refusing
                            connections or blocked by a firewall.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>No response to connection attempts.</li>
                            <li>Could be due to firewall rules or simply no active service.</li>
                        </ul>
                    </div>
                ),
            };

        case 'unknown':
            return {
                title: 'Why did the port check fail?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            The port check process encountered an issue and couldn&apos;t determine the port state. This
                            could happen for several reasons:
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>The scanning server may have experienced connectivity issues</li>
                            <li>The target host may be unreachable or may have blocked the scanning IP address</li>
                            <li>The port scan may have timed out due to high network latency</li>
                            <li>The scan may have been rejected by an intermediate firewall or security device</li>
                            <li>There may have been an internal system error in the port checking service</li>
                        </ul>
                        <p>You can try scanning again, or try from a different region to see if the issue persists.</p>
                    </div>
                ),
            };

        default:
            return {
                title: 'Unknown port state',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            The state of this port could not be determined. This might result from network issues or
                            complex firewall rules.
                        </p>
                    </div>
                ),
            };
    }
}

// Export - Default
export default PortStateDialog;
