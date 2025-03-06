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
    const { title, content } = getPortStateInformation(properties.portState);

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
function getPortStateInformation(portState: PortState): { title: string; content: React.ReactNode } {
    switch(portState) {
        case 'open':
            return {
                title: 'What is an open port?',
                content: (
                    <div className="space-y-4 text-sm">
                        <p>
                            An open port means the server is actively listening for and responding to connection
                            requests.
                        </p>

                        <div>
                            <p className="">Key points:</p>

                            <ul className="mt-2 list-disc space-y-1 pl-5">
                                <li>The server is actively listening on this port.</li>
                                <li>A service is running and ready to accept connections.</li>
                                <li>You can successfully establish a connection.</li>
                                <li>Data can be sent and received via this port.</li>
                            </ul>
                        </div>

                        <p>
                            Open ports are normal for active services. For instance, web servers typically keep port 80
                            (HTTP) or port 443 (HTTPS) open to serve content.
                        </p>
                    </div>
                ),
            };

        case 'closed':
            return {
                title: 'What is a closed port?',
                content: (
                    <div className="space-y-4">
                        <p className="leading-relaxed">
                            A closed port indicates that the system is actively refusing connections. Unlike filtered
                            ports that drop packets silently, a closed port explicitly sends back a response indicating
                            that no service is listening on that port.
                        </p>

                        <div className="rounded-md border border-red-100 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
                            <h3 className="text-sm font-medium text-red-800 dark:text-red-300">What this means:</h3>

                            <ul className="mt-2 list-disc space-y-1 pl-5 text-red-700 dark:text-red-400">
                                <li>The system is reachable and responding to connection attempts</li>
                                <li>No service is currently running on this specific port</li>
                                <li>
                                    The system actively refuses connections by sending back a &quot;connection
                                    refused&quot; response
                                </li>
                                <li>The port is not blocked by a firewall - it&apos;s simply not in use</li>
                            </ul>
                        </div>

                        <h3 className="font-medium">Technical explanation</h3>
                        <p className="leading-relaxed">
                            When a port is closed, the system responds with a RST (reset) packet for TCP connections or
                            an ICMP &quot;port unreachable&quot; message for UDP connections. This is different from
                            filtered ports, which do not send any response back.
                        </p>

                        <p className="leading-relaxed">
                            A closed port is generally not a security concern, as it indicates that the system is
                            working normally and is simply not offering any services on that specific port.
                        </p>

                        <div className="rounded-md border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                            <h3 className="text-sm font-medium">Comparison with other port states:</h3>

                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <div className="font-medium">Open port:</div>
                                <div>Actively accepts connections</div>

                                <div className="font-medium">Closed port:</div>
                                <div>Actively rejects connections</div>

                                <div className="font-medium">Filtered port:</div>
                                <div>Silently drops connection attempts</div>
                            </div>
                        </div>
                    </div>
                ),
            };

        case 'filtered':
            return {
                title: 'What is a filtered port?',
                content: (
                    <div className="space-y-4">
                        <p className="leading-relaxed">
                            A filtered port indicates that a computer is actively monitoring the connection and
                            deliberately filtering traffic. Unlike a closed port, which immediately rejects connections,
                            a filtered port suggests that security systems are evaluating and processing your request.
                        </p>

                        <div className="bg-blue-50 dark:bg-blue-950 border-blue-100 dark:border-blue-900 rounded-md border p-4">
                            <h3 className="text-blue-800 dark:text-blue-300 text-sm font-medium">
                                This could indicate:
                            </h3>

                            <ul className="text-blue-700 dark:text-blue-400 mt-2 list-disc space-y-1 pl-5">
                                <li>A firewall is actively screening incoming connections</li>
                                <li>Security systems are analyzing the traffic</li>
                                <li>The server is configured to silently drop specific types of requests</li>
                                <li>Network filtering rules are in place</li>
                            </ul>
                        </div>

                        <h3 className="font-medium">Technical explanation</h3>
                        <p className="leading-relaxed">
                            When a port is filtered, packets are typically dropped without any response, making it
                            different from closed ports which explicitly reject connections with a response.
                        </p>

                        <p className="leading-relaxed">
                            In network scanning terminology, a &quot;filtered&quot; response means that the scan was
                            unable to determine whether the port is open because packet filtering from a firewall or
                            router is preventing your probes from reaching the port.
                        </p>

                        <div className="rounded-md border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                            <h3 className="text-sm font-medium">Comparison with other port states:</h3>

                            <div className="mt-2 grid grid-cols-2 gap-2">
                                <div className="font-medium">Open port:</div>
                                <div>Actively accepts connections</div>

                                <div className="font-medium">Closed port:</div>
                                <div>Actively rejects connections</div>

                                <div className="font-medium">Filtered port:</div>
                                <div>Silently drops connection attempts</div>
                            </div>
                        </div>
                    </div>
                ),
            };

        case 'unfiltered':
            return {
                title: 'What is an unfiltered port?',
                content: (
                    <div className="space-y-4">
                        <p className="leading-relaxed">
                            An unfiltered port indicates that the port is reachable and not blocked by any filtering
                            device like a firewall, but it&apos;s not necessarily open. This is a fairly uncommon state
                            that is primarily seen during specific types of scans like ACK scans.
                        </p>

                        <div className="rounded-md border border-purple-100 bg-purple-50 p-4 dark:border-purple-900 dark:bg-purple-950">
                            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300">
                                What this means:
                            </h3>

                            <ul className="mt-2 list-disc space-y-1 pl-5 text-purple-700 dark:text-purple-400">
                                <li>The port is accessible and not being filtered by any firewall</li>
                                <li>The port is responding to probes, but not necessarily accepting connections</li>
                                <li>Additional scanning may be needed to determine if the port is actually open</li>
                                <li>This state is primarily seen during special scanning techniques</li>
                            </ul>
                        </div>

                        <h3 className="font-medium">Technical explanation</h3>
                        <p className="leading-relaxed">
                            The &quot;unfiltered&quot; state is most commonly seen during ACK scanning, which is used to
                            map firewall rulesets. When an ACK packet is sent to an unfiltered port, it responds with an
                            RST (reset) packet, indicating that the port is reachable but not necessarily listening for
                            connections.
                        </p>

                        <p className="leading-relaxed">
                            To determine if an unfiltered port is actually open, additional scanning techniques like SYN
                            or connect scans would be required. This state essentially tells you the port is not behind
                            a firewall but doesn&apos;t confirm whether a service is actively running.
                        </p>
                    </div>
                ),
            };

        case 'open|filtered':
            return {
                title: 'What is an open|filtered port?',
                content: (
                    <div className="space-y-4">
                        <p className="leading-relaxed">
                            An &quot;open|filtered&quot; port state indicates that the scanner cannot definitively
                            determine whether the port is open or filtered. This ambiguous state occurs when a port
                            doesn&apos;t respond to probes, which could either mean it&apos;s being filtered (dropped by
                            a firewall) or it&apos;s open but the application isn&apos;t responding as expected.
                        </p>

                        <div className="rounded-md border border-yellow-100 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950">
                            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                                This could mean:
                            </h3>

                            <ul className="mt-2 list-disc space-y-1 pl-5 text-yellow-700 dark:text-yellow-400">
                                <li>
                                    The port might be open but the service isn&apos;t responding to the specific probe
                                </li>
                                <li>A firewall could be filtering packets to the port</li>
                                <li>The port might be behind a packet filter that drops packets silently</li>
                                <li>Additional or different scanning techniques might be needed</li>
                            </ul>
                        </div>

                        <h3 className="font-medium">Technical explanation</h3>
                        <p className="leading-relaxed">
                            This state is commonly seen with UDP and certain TCP scanning methods where the scanner
                            sends a probe and receives no response. In UDP scanning, for example, open ports often
                            don&apos;t respond to empty probes, and neither do filtered ports - making it impossible to
                            distinguish between the two without further testing.
                        </p>

                        <p className="leading-relaxed">
                            For more definitive results, multiple scanning techniques might need to be combined, or
                            application-specific probes could be used to elicit a response from services that might be
                            running on those ports.
                        </p>

                        <div className="rounded-md border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                            <p className="text-sm">
                                This ambiguous state is more common with UDP ports and specialized TCP scanning
                                techniques. Standard TCP connect scans will typically not result in this state.
                            </p>
                        </div>
                    </div>
                ),
            };

        case 'closed|filtered':
            return {
                title: 'What is a closed|filtered port?',
                content: (
                    <div className="space-y-4">
                        <p className="leading-relaxed">
                            A &quot;closed|filtered&quot; port state indicates that the scanner cannot definitively
                            determine whether the port is closed or filtered. This means the port could either be closed
                            with no service running on it, or it could be filtered by a firewall that&apos;s blocking
                            the scanner&apos;s probes.
                        </p>

                        <div className="rounded-md border border-orange-100 bg-orange-50 p-4 dark:border-orange-900 dark:bg-orange-950">
                            <h3 className="text-sm font-medium text-orange-800 dark:text-orange-300">
                                This could mean:
                            </h3>

                            <ul className="mt-2 list-disc space-y-1 pl-5 text-orange-700 dark:text-orange-400">
                                <li>The port might be closed with no service listening</li>
                                <li>A firewall could be filtering and dropping probes to the port</li>
                                <li>
                                    The filtering device might be configured to block the specific scan type being used
                                </li>
                                <li>Different scanning techniques might provide more definitive results</li>
                            </ul>
                        </div>

                        <h3 className="font-medium">Technical explanation</h3>
                        <p className="leading-relaxed">
                            This ambiguous state typically occurs with certain scan types (like FIN, NULL, or XMAS
                            scans) where both closed and filtered ports can show the same behavior - no response. These
                            scanning techniques send packets with unusual flag combinations that closed ports would
                            normally respond to with RST packets, but some firewalls block these responses.
                        </p>

                        <p className="leading-relaxed">
                            When a scanner reports &quot;closed|filtered,&quot; it&apos;s indicating that it sent a
                            probe but received no response, which could happen either because:
                        </p>

                        <ul className="list-disc space-y-1 pl-5">
                            <li>The probe or response was dropped by a filtering device (filtered)</li>
                            <li>The port is closed but configured not to respond to certain types of probes</li>
                        </ul>

                        <div className="rounded-md border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
                            <p className="text-sm">
                                To get more definitive results, try different scanning techniques like SYN or connect
                                scans, which might provide clearer information about the port state.
                            </p>
                        </div>
                    </div>
                ),
            };

        default:
            return {
                title: 'Unknown Port State',
                content: (
                    <div className="space-y-4">
                        <p className="leading-relaxed">
                            The port state is unknown or unrecognized. This could happen due to:
                        </p>

                        <ul className="list-disc space-y-1 pl-5">
                            <li>Inconsistent responses from the target system</li>
                            <li>Network issues during scanning</li>
                            <li>Complex firewall rules creating unusual behaviors</li>
                            <li>Timeout or partial scan completion</li>
                        </ul>

                        <p className="leading-relaxed">
                            Try scanning again or using different scanning techniques to get more definitive results.
                        </p>
                    </div>
                ),
            };
    }
}

// Export - Default
export default PortStateDialog;
