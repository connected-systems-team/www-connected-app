'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import { PortStateType } from '@project/app/(main-layout)/port-checker/adapters/PortCheckStatusAdapter';

// Dependencies - Main Components
import { DialogProperties, Dialog } from '@structure/source/common/dialogs/Dialog';

// Dependencies - Services
import { PortCheckFlowServiceErrors } from '@project/source/modules/connected/port-check/PortCheckFlowService';
import { FlowServiceErrors } from '@project/source/modules/flow/FlowService';

// Component - PortStateDialog
export interface PortStateDialogProperties extends DialogProperties {
    portState: PortStateType;
    errorCode?: string; // Error code from PortCheckFlowServiceErrors or FlowServiceErrors
}
export function PortStateDialog(properties: PortStateDialogProperties) {
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

    // Get the dialog title and content based on the port state and error code
    const { title, content } = getPortStateInformation(properties.portState, properties.errorCode);

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

// Function to get the title and content for a specific port state or error code
function getPortStateInformation(
    portState: PortStateType,
    errorCode?: string,
): { title: string; content: React.ReactNode } {
    // If we have an error code, handle it first
    if(errorCode) {
        // Handle different error codes with a switch statement
        switch(errorCode) {
            // IPv6 not supported error
            case PortCheckFlowServiceErrors.Ipv6NotSupportedError.code:
                return {
                    title: 'IPv6 Not Supported',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>IPv6 addresses are not currently supported by our port checking service.</p>
                            <p>You can use:</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>
                                    Domain names (e.g., <code>example.com</code>, <code>sub.domain.co.uk</code>)
                                </li>
                                <li>
                                    IPv4 addresses (e.g., <code>8.8.8.8</code>, <code>192.0.2.1</code>)
                                </li>
                            </ul>
                            <p>
                                If you need to check an IPv6 address, please try a domain name that resolves to that
                                address instead. IPv6 support will be added in a future update.
                            </p>
                        </div>
                    ),
                };

            // Invalid hostname format
            case PortCheckFlowServiceErrors.InvalidHostError.code:
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
                            </ul>
                            <p>Please check your input and try again with a valid domain name or IP address.</p>
                        </div>
                    ),
                };

            // Invalid IP address format
            case PortCheckFlowServiceErrors.InvalidIpError.code:
                return {
                    title: 'Invalid IP Address',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The IP address you entered is not valid.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Each part (octet) of an IPv4 address must be a number between 0 and 255.</li>
                                <li>
                                    Example of a valid IP address: <code>192.168.1.1</code>
                                </li>
                                <li>
                                    Example of an invalid IP address: <code>192.168.1.256</code> (256 is greater than
                                    255)
                                </li>
                            </ul>
                            <p>Please check your input and try again with a valid IP address.</p>
                        </div>
                    ),
                };

            // Invalid port number
            case PortCheckFlowServiceErrors.InvalidPortError.code:
                return {
                    title: 'Invalid Port Number',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The port number you entered is invalid.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Port numbers must be between 1 and 65535.</li>
                                <li>Common ports include 80 (HTTP), 443 (HTTPS), 22 (SSH), and 21 (FTP).</li>
                            </ul>
                            <p>Please try again with a valid port number.</p>
                        </div>
                    ),
                };

            // Private IP address error
            case PortCheckFlowServiceErrors.PrivateIpError.code:
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
                            <p>Why can&apos;t we check these addresses?</p>
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
                                <li>Use a local port checking tool from within your network, such as nmap.</li>
                                <li>Check your firewall or router settings to see port configurations.</li>
                                <li>Use our tool to check public IP addresses or domains instead.</li>
                            </ul>
                        </div>
                    ),
                };

            // Host resolution failed
            case PortCheckFlowServiceErrors.HostResolutionFailed.code:
                return {
                    title: 'Host Resolution Error',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The domain name you entered could not be resolved to an IP address.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>The domain may not exist or may have been misspelled.</li>
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

            // Host down error
            case PortCheckFlowServiceErrors.HostDown.code:
                return {
                    title: 'Host Down Error',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>
                                <strong>Host is down or not responding</strong>
                            </p>
                            <p>What this means:</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>The host you&apos;re trying to reach did not respond to our check.</li>
                                <li>The host might be offline or unreachable from our network.</li>
                                <li>The host might be configured to block or ignore our check packets.</li>
                                <li>The host exists but may have firewalls preventing any response.</li>
                            </ul>
                            <p>
                                You can try again later, try using a different region, or verify that the host is
                                actually online using other methods like ping or traceroute.
                            </p>
                        </div>
                    ),
                };

            // Connection timeout
            case PortCheckFlowServiceErrors.ConnectionTimeout.code:
                return {
                    title: 'Connection Timeout',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The connection to the target host timed out.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>The host may be blocking port check requests.</li>
                                <li>The host may be behind a firewall that drops connection attempts.</li>
                                <li>The network path to the host might be experiencing high latency.</li>
                            </ul>
                            <p>
                                This usually indicates the host exists but either is not accepting connections on this
                                port or deliberately not responding to check requests.
                            </p>
                        </div>
                    ),
                };

            // Disallowed host error
            case PortCheckFlowServiceErrors.DisallowedHost.code:
                return {
                    title: 'Disallowed Host',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The host you entered is not allowed for checking.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>
                                    The host you entered resolves to an IP address that is not allowed for checking.
                                </li>
                                <li>This may be an internal IP address or a host that is restricted by our service.</li>
                                <li>
                                    For security reasons, our service does not allow checking of our own infrastructure
                                    or certain protected networks.
                                </li>
                            </ul>
                            <p>Please try checking a different public host or domain.</p>
                        </div>
                    ),
                };

            // Regions unavailable error
            case PortCheckFlowServiceErrors.RegionsUnavailable.code:
                return {
                    title: 'Regions Unavailable',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>All of our regions are currently unavailable.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Our servers in this region may be down or at capacity.</li>
                                <li>Try again later when regions become available.</li>
                            </ul>
                            <p>Please try again in a few minutes.</p>
                        </div>
                    ),
                };

            // Internal server error
            case PortCheckFlowServiceErrors.InternalServerError.code:
                return {
                    title: 'Internal Server Error',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The port check service is currently experiencing issues.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>This is a temporary issue with our service.</li>
                                <li>Our team has been notified of this issue.</li>
                            </ul>
                            <p>Please try again in a few minutes, or try using a different region.</p>
                        </div>
                    ),
                };

            // Connection error
            case PortCheckFlowServiceErrors.ConnectionError.code:
                return {
                    title: 'Connection Error',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>A connection error occurred during the port check.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>There may be network issues between our servers and the target host.</li>
                                <li>The target host might be experiencing high load or connectivity problems.</li>
                                <li>Network routing issues could be preventing a successful connection.</li>
                            </ul>
                            <p>Please try again in a few minutes, or try using a different region.</p>
                        </div>
                    ),
                };

            // Host unreachable error
            case PortCheckFlowServiceErrors.HostUnreachable.code:
                return {
                    title: 'Host Unreachable',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The host exists but cannot be reached.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>The host may be behind a firewall that blocks our checking packets.</li>
                                <li>Network routing issues may be preventing our servers from reaching the host.</li>
                                <li>The host may be configured to not respond to certain types of traffic.</li>
                            </ul>
                            <p>You can try again later or try a different region.</p>
                        </div>
                    ),
                };

            // Missing data error
            case PortCheckFlowServiceErrors.MissingData.code:
                return {
                    title: 'Incomplete Scan Results',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>The port check completed but could not determine the exact status.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>We received partial or unclear results from the check.</li>
                                <li>This could be due to network inconsistencies or timing issues.</li>
                                <li>Some firewalls or security systems may return ambiguous results.</li>
                            </ul>
                            <p>You can try checking again or try a different region.</p>
                        </div>
                    ),
                };

            // General system errors
            case PortCheckFlowServiceErrors.UnknownError.code:
            case FlowServiceErrors.FlowError.code:
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
                            <p>Please try again in a few minutes, or try using a different region.</p>
                        </div>
                    ),
                };

            // Request timeout
            case FlowServiceErrors.FlowTimedOut.code:
                return {
                    title: 'Request Timeout',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>Your request timed out without receiving a response.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Your Internet connection might be unavailable or unstable.</li>
                                <li>Our servers may be down or experiencing connectivity issues.</li>
                            </ul>
                            <p>Please verify your Internet connection or try again in a few minutes.</p>
                        </div>
                    ),
                };

            // Network connectivity error
            case FlowServiceErrors.NetworkConnectionError.code:
                return {
                    title: 'Network Connection Error',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>Unable to connect to our servers to perform the port check.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>Your Internet connection appears to be offline or unstable.</li>
                                <li>Please check your network connection and try again.</li>
                                <li>
                                    If you&apos;re connected to a network but still seeing this error, your connection
                                    might be restricted or our servers might be experiencing issues.
                                </li>
                            </ul>
                            <p>
                                This error typically occurs when your device can&apos;t reach our servers due to
                                connectivity issues.
                            </p>
                        </div>
                    ),
                };

            // Generic execution failed
            case FlowServiceErrors.ExecutionFailed.code:
                return {
                    title: 'Service Error',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>Our service encountered an error while processing your request.</p>
                            <ul className="list-disc space-y-1 pl-5">
                                <li>This could be a temporary issue with our service.</li>
                                <li>The error has been logged and our team has been notified.</li>
                            </ul>
                            <p>Please try again in a few minutes. If the issue persists, please contact support.</p>
                        </div>
                    ),
                };

            // Default case for unknown error codes
            default:
                return {
                    title: 'Error',
                    content: (
                        <div className="space-y-4 text-sm">
                            <p>An error occurred while checking the port (Code: {errorCode}).</p>
                            <p>Please try again in a few minutes, or try using a different region.</p>
                        </div>
                    ),
                };
        }
    }

    // If no error code is provided, handle the port state
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
                            <li>The server checking may have experienced connectivity issues</li>
                            <li>The target host may be unreachable or may have blocked the checking IP address</li>
                            <li>The port check may have timed out due to high network latency</li>
                            <li>The check may have been rejected by an intermediate firewall or security device</li>
                            <li>There may have been an internal system error in the port checking service</li>
                        </ul>
                        <p>You can try checking again, or try from a different region to see if the issue persists.</p>
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
