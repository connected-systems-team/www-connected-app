// Dependencies - React and Next.js
import React from 'react';
import Link from 'next/link';

// Dependencies - Main Components
// import { ConnectedOutlineIcon } from '@project/source/common/ConnectedOutlineIcon';

// Common ports
const commonPorts = [
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 23, service: 'TELNET' },
    { port: 25, service: 'SMTP' },
    { port: 53, service: 'DNS' },
    { port: 80, service: 'HTTP' },
    { port: 110, service: 'POP3' },
    { port: 115, service: 'SFTP' },
    { port: 135, service: 'RPC' },
    { port: 139, service: 'NetBIOS' },
    { port: 143, service: 'IMAP' },
    { port: 194, service: 'IRC' },
    { port: 443, service: 'SSL' },
    { port: 445, service: 'SMB' },
    { port: 1433, service: 'MSSQL' },
    { port: 3306, service: 'MySQL' },
    { port: 3389, service: 'Remote Desktop' },
    { port: 5632, service: 'PCAnywhere' },
    { port: 5900, service: 'VNC' },
    { port: 25565, service: 'Minecraft' },
];

// Component - CommonPorts
export interface CommonPortsInterface {
    portSelected: (port: number) => void;
}
export function CommonPorts(properties: CommonPortsInterface) {
    // Render the component
    return (
        <div className="mt-4 min-w-60 md:mt-0 md:pl-12">
            <p className="font-medium">Common Ports</p>
            <ul className="mt-1 text-sm">
                {commonPorts.map(function (commonPort, commonPortIndex) {
                    return (
                        <li key={commonPortIndex} className="flex select-none items-center space-x-1.5">
                            <span
                                className="group flex cursor-pointer space-x-1.5"
                                onClick={function () {
                                    properties.portSelected(commonPort.port);
                                }}
                            >
                                <span className="text-theme-light-primary hover:text-dark dark:text-theme-dark-primary dark:group-hover:text-light">
                                    {commonPort.port}
                                </span>
                                <span>{commonPort.service}</span>
                            </span>
                            {/* <Link
                                href={`/ports/${commonPort.port}`}
                                target="_blank"
                                title={'Learn more about port ' + commonPort.port}
                            >
                                <ConnectedOutlineIcon className="h-3 w-3" />
                            </Link> */}
                        </li>
                    );
                })}
            </ul>

            <Link className="primary mt-4 block text-sm" href="/port-checker/history" prefetch={false}>
                History
            </Link>
        </div>
    );
}

// Export - Default
export default CommonPorts;
