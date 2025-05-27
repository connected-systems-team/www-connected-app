'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { useSearchParams } from 'next/navigation';

// Dependencies - Main Components
import { Pagination } from '@structure/source/common/navigation/pagination/Pagination';
import { Button } from '@structure/source/common/buttons/Button';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import { addCommas } from '@structure/source/utilities/Number';

// Component - PortsPage
export function PortsPage() {
    // Hooks
    const searchParameters = useSearchParams();

    // Get current pagination values from URL
    const page = parseInt(searchParameters.get('page') || '1');
    const itemsPerPage = parseInt(searchParameters.get('itemsPerPage') || '10');

    // Constants
    const totalPorts = 65535; // Valid port range is 1-65535
    const pagesTotal = Math.ceil(totalPorts / itemsPerPage);

    // Calculate which ports to display on current page
    const startPort = (page - 1) * itemsPerPage + 1;
    const endPort = Math.min(page * itemsPerPage, totalPorts);
    const portsOnPage = Array.from({ length: endPort - startPort + 1 }, (port, portIndex) => startPort + portIndex);

    // Function to get port description for common ports
    const getPortDescription = React.useCallback(function (port: number): string {
        const commonPorts: Record<number, string> = {
            20: 'FTP Data',
            21: 'FTP Control',
            22: 'SSH',
            23: 'Telnet',
            25: 'SMTP',
            53: 'DNS',
            67: 'DHCP Server',
            68: 'DHCP Client',
            69: 'TFTP',
            80: 'HTTP',
            110: 'POP3',
            123: 'NTP',
            143: 'IMAP',
            161: 'SNMP',
            194: 'IRC',
            443: 'HTTPS',
            465: 'SMTPS',
            587: 'SMTP (Submission)',
            993: 'IMAPS',
            995: 'POP3S',
            1433: 'SQL Server',
            1521: 'Oracle',
            3306: 'MySQL',
            3389: 'RDP',
            5432: 'PostgreSQL',
            5900: 'VNC',
            6379: 'Redis',
            8080: 'HTTP Proxy',
            8443: 'HTTPS Alt',
            9200: 'Elasticsearch',
            27017: 'MongoDB',
        };

        return commonPorts[port] || '';
    }, []);

    // Render the component
    return (
        <div className="container pt-12">
            <h1 className="">Network Ports</h1>
            <p className="mt-4 text-sm text-foreground-secondary">
                Browse through all valid TCP and UDP port numbers, 1 through 65,535.
            </p>

            <hr className="my-6" />

            {/* Ports */}
            <div className="flex flex-col gap-2">
                {portsOnPage.map(function (port) {
                    const description = getPortDescription(port);
                    const isCommonPort = description !== '';

                    return (
                        <Button
                            key={port}
                            className={mergeClassNames('min-w-16', isCommonPort ? '' : '')}
                            href={`/ports/${port}`}
                        >
                            <div className="">
                                Port {addCommas(port)}
                                {description && (
                                    <>
                                        {' '}
                                        <span className="">({description})</span>
                                    </>
                                )}
                            </div>
                        </Button>
                    );
                })}
            </div>

            {/* Bottom Pagination */}
            <div className="mt-8">
                <Pagination
                    page={page}
                    itemsTotal={totalPorts}
                    itemsPerPage={itemsPerPage}
                    pagesTotal={pagesTotal}
                    useLinks={true}
                    itemsPerPageControl={true}
                    pageInputControl={true}
                    firstAndLastPageControl={true}
                />
            </div>
        </div>
    );
}
