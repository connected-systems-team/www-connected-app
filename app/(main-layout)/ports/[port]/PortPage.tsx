'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import Link from 'next/link';

// Dependencies - Main Components

// Dependencies - Utilities
import { useUrlParameters } from '@structure/source/utilities/next/NextNavigation';

// Component - PortPage
export function PortPage() {
    // Hooks
    const urlParameters = useUrlParameters() as { port: string };

    // Render the component
    return (
        <div className="container pt-8">
            <div className="float-end flex flex-col items-center rounded-md border px-4 py-2.5">
                <div className="text-sm uppercase text-neutral">Port</div>
                <div className="text-4xl leading-none">{urlParameters.port}</div>
            </div>

            <h1 className="mb-4">Port {urlParameters.port}</h1>

            <div className="max-w-[640px]">
                <div className="mb-1 text-sm uppercase text-neutral">Protocols</div>
                <ul className="flex">
                    <li>
                        <Link className="flex rounded-md border bg-[#006EFC] px-2 py-0.5" href="/protocols/http">
                            HTTP
                        </Link>
                    </li>
                </ul>

                <h4 className="mt-4 leading-normal">
                    Port 80 is the default port for HTTP traffic. It is used by web browsers to communicate with web
                    servers.
                </h4>

                <section className="mt-8" id="details">
                    <div className="mb-1 text-sm uppercase text-neutral">Security Considerations</div>
                    <p>
                        Since HTTP traffic on Port 80 is not encrypted, it is susceptible to eavesdropping and
                        man-in-the-middle attacks. It&apos;s recommended to use HTTPS on Port 443 for secure
                        communication.
                    </p>
                </section>

                <section className="mt-8" id="applications">
                    <div className="mb-1 text-sm uppercase text-neutral">Applications Using Port 80</div>
                    <ul className="flex space-x-2">
                        <li>
                            <Link className="flex rounded-md border bg-[#006EFC] px-2 py-0.5" href="/protocols/http">
                                Apache Web Server
                            </Link>
                        </li>
                        <li>
                            <Link className="flex rounded-md border bg-[#006EFC] px-2 py-0.5" href="/protocols/http">
                                NGINX
                            </Link>
                        </li>
                    </ul>
                </section>

                <section className="mt-8" id="history">
                    <h2>History</h2>
                    <h3>Origin and Development</h3>
                    <p>
                        Port 80 was officially assigned to HTTP by IANA (Internet Assigned Numbers Authority). HTTP was
                        developed by Tim Berners-Lee at CERN in the late 1980s and early 1990s.
                    </p>

                    <p>who claimed the port, when, why, and what is their picture?</p>

                    <p>is it a well-known port and what does that mean?</p>

                    <h3>Significant Events</h3>
                    <p>
                        The introduction of HTTP/1.0 in 1996 standardized web communications. In 1999, HTTP/1.1 brought
                        performance improvements. The 2015 introduction of HTTP/2 improved efficiency, and HTTP/3
                        (introduced in 2020) further optimized performance and security.
                    </p>
                    <h3>Adoption and Usage</h3>
                    <p>
                        Port 80 became the standard due to its early adoption and widespread use in web browsers and
                        servers. The shift towards HTTPS (Port 443) has been driven by security concerns and initiatives
                        like Let&apos;s Encrypt.
                    </p>
                </section>

                <section className="mt-8" id="famous-hacks">
                    <h2>Famous Hacks and Exploits</h2>
                    <p>
                        Detailed accounts of famous hacks that exploited Port 80, like the Code Red worm in 2001.
                        Discussion on the impact of these exploits and how they shaped security practices.
                    </p>
                </section>

                <section className="mt-8" id="trivia">
                    <h2>Trivia and Fun Facts</h2>
                    <p>
                        Lesser-known details about Port 80, such as its early adoption by Tim Berners-Lee for the World
                        Wide Web. Anecdotes from the early internet era about Port 80’s usage.
                    </p>
                </section>

                <section className="mt-8" id="pop-culture">
                    <h2>Pop Culture References</h2>
                    <p>
                        Examples of references to Port 80 in popular media. Analysis of how accurate these portrayals
                        are.
                    </p>
                </section>

                <section className="mt-8" id="comparison-charts">
                    <h2>Comparison Charts</h2>
                    <p>
                        Charts comparing Port 80 with similar ports, such as Port 8080, highlighting differences and
                        specific uses. Visualizations of usage patterns, performance, and security aspects.
                    </p>
                </section>

                <section className="mt-8" id="port-scan">
                    <h2>Port Scan Results</h2>
                    <p>
                        An embedded tool allowing users to scan their own network for open ports. Explanations of the
                        results, focusing on the significance of each detected port and recommended actions.
                    </p>
                </section>
            </div>
        </div>
    );
}

// Export - Default
export default PortPage;
