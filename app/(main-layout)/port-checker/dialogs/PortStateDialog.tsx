'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { DialogInterface, Dialog } from '@structure/source/common/dialogs/Dialog';

// Dependencies - Types
import { PortStateType } from '@project/app/(main-layout)/port-checker/adapters/PortCheckStatusAdapter';

// Component - PortStateDialog
export interface PortStateDialogInterface extends DialogInterface {
    portState: PortStateType;
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
    portState: PortStateType,
    isSystemError?: boolean,
    isTimeout?: boolean,
    errorMessage?: string,
): { title: string; content: React.ReactNode } {
    // Special case for system errors
    if(isSystemError) {
        // If we have a specific error message, show it
        if(errorMessage) {
            // Special handling for "Failed to resolve host" error
            if(errorMessage.includes('Failed to resolve host')) {
                return {
                    title: 'Host Resolution Error',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The port check service returned the following error:</p>
                            <div className="">
                                <code>{errorMessage}</code>
                            </div>
                            <p>What this means:</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>The domain name you entered could not be resolved to an IP address.</li>
                                <li>This may be because the domain does not exist or has been misspelled.</li>
                                <li>DNS servers may be experiencing issues resolving this domain.</li>
                                <li>
                                    If you&apos;re using a private or internal hostname, it may not be publicly
                                    resolvable.
                                </li>
                            </ul>
                            <p>
                                Please check the hostname and try again. If using a domain name, verify that it&apos;s
                                correctly spelled and is a valid, publicly accessible domain.
                            </p>
                        </div>
                    ),
                };
            }

            // Special handling for disallowed IP addresses/hosts
            if(errorMessage.includes('Invalid or disallowed host')) {
                return {
                    title: 'Disallowed Host',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The port check service returned the following error:</p>
                            <div className="">
                                <code>{errorMessage}</code>
                            </div>
                            <p>What this means:</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>
                                    The host you entered resolves to an IP address that is not allowed for scanning.
                                </li>
                                <li>This may be an internal IP address or a host that is restricted by our service.</li>
                                <li>
                                    For security reasons, our service does not allow scanning of our own infrastructure
                                    or certain protected networks.
                                </li>
                            </ul>
                            <p>Please try scanning a different public host or domain.</p>
                        </div>
                    ),
                };
            }

            // Special handling for private IP addresses
            if(errorMessage === 'Private IP Address') {
                return {
                    title: 'Private IP Address',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The IP address you entered is a private/internal network address.</p>

                            <p>Private IP addresses include:</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>
                                    <code>10.0.0.0</code> to <code>10.255.255.255</code> (10.0.0.0/8)
                                </li>
                                <li>
                                    <code>172.16.0.0</code> to <code>172.31.255.255</code> (172.16.0.0/12)
                                </li>
                                <li>
                                    <code>192.168.0.0</code> to <code>192.168.255.255</code> (192.168.0.0/16)
                                </li>
                                <li>
                                    <code>127.0.0.0</code> to <code>127.255.255.255</code> (localhost)
                                </li>
                            </ul>

                            <p>Why can&apos;t we scan these addresses?</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Private IP addresses are only accessible within your local network.</li>
                                <li>Our servers are on the public Internet and cannot reach your internal network.</li>
                                <li>
                                    This is by design&mdash;private networks are isolated from the internet for security
                                    reasons.
                                </li>
                            </ul>

                            <p>What you can do instead:</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Use a local port scanning tool from within your network, such as nmap.</li>
                                <li>Check your firewall or router settings to see port configurations.</li>
                                <li>Use our tool to check public IP addresses or domains instead.</li>
                            </ul>
                        </div>
                    ),
                };
            }

            // Special handling for "Host is down" error
            if(errorMessage && errorMessage.includes('Host is down')) {
                return {
                    title: 'Host Down Error',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>
                                Port check result: <strong>Host is down or not responding</strong>
                            </p>
                            <p>What this means:</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>The host you&apos;re trying to reach did not respond to our scan.</li>
                                <li>The host might be offline or unreachable from our network.</li>
                                <li>The host might be configured to block or ignore our scan packets.</li>
                                <li>The host exists but may have firewalls preventing any response.</li>
                            </ul>
                            <p>
                                You can try again later, try using a different region, or verify that the host is
                                actually online using other methods like ping or traceroute.
                            </p>
                        </div>
                    ),
                };
            }

            // Special handling for invalid format errors
            if(errorMessage && errorMessage.includes('Invalid format')) {
                return {
                    title: 'Invalid Address Format',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The address you entered has an invalid format.</p>
                            <p>Valid formats include:</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>
                                    Domain names (e.g., <code>example.com</code>, <code>sub.domain.co.uk</code>)
                                </li>
                                <li>
                                    IPv4 addresses (e.g., <code>8.8.8.8</code>, <code>192.0.2.1</code>)
                                </li>
                                <li>
                                    IPv6 addresses (e.g., <code>2001:4860:4860::8888</code>,{' '}
                                    <code>2606:4700:4700::1111</code>)
                                </li>
                            </ul>
                            <p>Please check your input and try again with a valid domain name or IP address.</p>
                        </div>
                    ),
                };
            }

            // Regular error handling for other cases
            return {
                title: 'Error Information',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>The port check service returned the following error:</p>
                        <div className="">
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
        case PortStateType.Open:
            return {
                title: 'What is an open port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>This port is open and the server is accepting connection requests.</p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                            <li>A service is running here.</li>
                            <li>You can establish connections and exchange data through this port.</li>
                        </ul>
                    </div>
                ),
            };

        case PortStateType.Closed:
            return {
                title: 'What is a closed port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>The server is reachable but actively refusing connections on this port.</p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>No service is running on this port on this server.</li>
                            <li>Connection attempts receive an immediate refusal from the server.</li>
                        </ul>
                        <p>
                            To open this port, ensure the intended service or application is running on your server and
                            configured to listen on this port.
                        </p>
                    </div>
                ),
            };

        case PortStateType.Filtered:
            return {
                title: 'What is a filtered port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            Connection attempts to this port are being silently ignored or blocked. It is unclear if the
                            server behind this port is online or offline.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>
                                A firewall, router, or security policy might be silently dropping connection attempts.
                            </li>
                            <li>
                                The port forwarding settings might not be correctly directing traffic to the intended
                                server.
                            </li>
                            <li>
                                The server itself may be offline or configured to ignore incoming traffic on this port.
                            </li>
                        </ul>
                        <p>
                            To open this port, check your firewall settings and ensure they allow incoming traffic.
                            Also, confirm that the intended application or service is actively listening on this port.
                        </p>
                    </div>
                ),
            };

        case PortStateType.Unfiltered:
            return {
                title: 'What is an unfiltered port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            The port is reachable and not actively blocked by firewalls or security rules. However,
                            it&apos;s unclear whether an application or service is actually listening.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>
                                The port accepts connection attempts, but there may not be an active service responding.
                            </li>
                            <li>
                                Check the server to confirm if the intended application or service is running and
                                listening on this port.
                            </li>
                        </ul>
                    </div>
                ),
            };

        case PortStateType.OpenFiltered:
            return {
                title: 'What is an open|filtered port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            This port state is ambiguous, meaning it&apos;s unclear whether the port is open or
                            filtered. Connection attempts aren&apos;t receiving clear responses.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>The port could be open with responses blocked by network security settings.</li>
                            <li>A firewall or router might be silently dropping connection attempts.</li>
                        </ul>
                    </div>
                ),
            };

        case PortStateType.ClosedFiltered:
            return {
                title: 'What is a closed|filtered port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            This port is reported as closed or filtered, meaning connection attempts aren&apos;t
                            receiving clear responses. It&apos;s uncertain if the server is actively refusing
                            connections or if a firewall is silently blocking them.
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                            <li>The server may be configured to reject connections without responding.</li>
                            <li>Firewall or network security rules could be silently dropping incoming packets.</li>
                        </ul>
                    </div>
                ),
            };

        case PortStateType.Unknown:
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
