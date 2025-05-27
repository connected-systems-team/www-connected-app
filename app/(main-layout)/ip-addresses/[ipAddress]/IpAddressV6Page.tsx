// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { Link } from '@structure/source/common/navigation/Link';
import { IpAddressIdenticon } from '@project/app/(main-layout)/ip-addresses/_components/IpAddressIdenticon';

// Interface - IpAddressV6PageProperties
interface IpAddressV6PageProperties {
    ipAddress: string;
}

// Component - IpAddressV6Page
export function IpAddressV6Page(properties: IpAddressV6PageProperties) {
    // Render the component
    return (
        <div className="container pt-8">
            <div className="float-end">
                <IpAddressIdenticon className="" ipAddress={properties.ipAddress} />
            </div>

            <div className="mb-4">
                <p className="text-sm uppercase text-neutral">IPv6 Address</p>
                <h1 className="">{properties.ipAddress}</h1>
            </div>
            <nav className="mt-16">
                <ul className="flex space-x-3 text-sm">
                    <li>
                        <a href="#overview">Overview</a>
                    </li>
                    <li>
                        <a href="#general-info">General Info</a>
                    </li>
                    <li>
                        <a href="#security">Security</a>
                    </li>
                    <li>
                        <a href="#historical-data">Historical Data</a>
                    </li>
                    <li>
                        <a href="#tools">Tools</a>
                    </li>
                    <li>
                        <a href="#fun-features">Fun Features</a>
                    </li>
                    <li>
                        <a href="#download-api">Download & API</a>
                    </li>
                </ul>
            </nav>
            <div className="max-w-[640px]">
                <div className="mb-1 text-sm uppercase text-neutral">Version</div>
                <ul className="flex">
                    <li>
                        <Link className="flex rounded-medium border bg-[#006EFC] px-2 py-0.5" href="/protocols/ipv6">
                            6
                        </Link>
                    </li>
                </ul>

                <main>
                    <section id="overview" className="mt-8">
                        <h2>Overview</h2>
                        <div>
                            <p>IPv6 Address: {properties.ipAddress}</p>
                            <p>Compressed: [Compressed representation]</p>
                            <p>Expanded: [Full expanded representation]</p>
                            <p>IP Version: 6</p>
                            <p>Address Type: [Unicast/Multicast/Anycast]</p>
                            <p>Scope: [Global/Link-local/Site-local]</p>
                            <p>Location: [Geographic location if available]</p>
                            <p>Current Status: Active</p>
                            <p>ISP: [Internet Service Provider]</p>
                            <p>Registered Organization: [Organization]</p>
                        </div>
                    </section>

                    <section id="general-info" className="mt-8">
                        <h2>General Info</h2>
                        <div>
                            <p>Assignment: [Static/Dynamic]</p>
                            <p>Hostname: [Reverse DNS if available]</p>
                            <p>Prefix Length: [Network prefix]</p>
                            <p>Interface ID: [Interface identifier]</p>
                            <p>Address Categories: [Global/Unique Local/Link Local]</p>
                        </div>
                    </section>

                    <section id="security" className="mt-8">
                        <h2>Security</h2>
                        <div>
                            <p>Blacklist Status: Not blacklisted</p>
                            <p>Known Vulnerabilities: None</p>
                            <p>Security Recommendations: Ensure firewall is configured</p>
                            <p>Privacy Extensions: [Enabled/Disabled]</p>
                            <p>Abuse Contact Information: [Contact details]</p>
                        </div>
                    </section>

                    <section id="historical-data" className="mt-8">
                        <h2>Historical Data</h2>
                        <div>
                            <p>Historical Changes: [Timeline of changes]</p>
                            <p>IP Ownership History: [Ownership details]</p>
                            <p>Last Seen: [Last activity date]</p>
                            <p>Known Aliases: [Alternative representations]</p>
                            <p>Notable Activity: [Significant events]</p>
                        </div>
                    </section>

                    <section id="tools" className="mt-8">
                        <h2>Tools</h2>
                        <div>
                            <p>
                                <a href="ping.html">Ping</a>
                            </p>
                            <p>
                                <a href="whois.html">Whois</a>
                            </p>
                            <p>
                                <a href="traceroute.html">Traceroute</a>
                            </p>
                            <p>
                                <a href="dnslookup.html">DNS Lookup</a>
                            </p>
                            <p>
                                <a href="mtrreport.html">MTR Report</a>
                            </p>
                            <p>Connection Tests: [Results from various locations]</p>
                            <p>Autonomous System Path: [AS path information]</p>
                            <p>Reverse WHOIS: [Linked domains]</p>
                        </div>
                    </section>

                    <section id="fun-features" className="mt-8">
                        <h2>Fun Features</h2>
                        <div>
                            <p>IPv6 Address Persona: The Futurist</p>
                            <p>Address Patterns: [Hexadecimal patterns]</p>
                            <p>Zero Compression: [:: notation usage]</p>
                            <p>Embedded IPv4: [If applicable]</p>
                            <p>Mathematical Properties: [Numerical analysis]</p>
                            <p>Address in Different Notations:</p>
                            <ul>
                                <li>Full Form: [Complete representation]</li>
                                <li>Compressed: [Using :: notation]</li>
                                <li>Mixed: [With embedded IPv4 if applicable]</li>
                            </ul>
                        </div>
                    </section>

                    <section id="download-api" className="mt-8">
                        <h2>Download & API</h2>
                        <div>
                            <p>Downloadable Reports:</p>
                            <ul>
                                <li>
                                    <a href="report.pdf">PDF Report</a>
                                </li>
                                <li>
                                    <a href="report.csv">CSV Report</a>
                                </li>
                            </ul>

                            <p>
                                API Access and Documentation: <a href="api.html">View API Documentation</a>
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
