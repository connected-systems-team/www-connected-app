'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { Link } from '@structure/source/common/navigation/Link';
import { Dialog } from '@structure/source/common/dialogs/Dialog';

// Dependencies - Assets
import InformationCircledIcon from '@structure/assets/icons/status/InformationCircledIcon.svg';

// Dependencies - Utilities
import { useUrlParameters } from '@structure/source/utilities/next/NextNavigation';

// Component - PortPage
export function PortPage() {
    // Hooks
    const urlParameters = useUrlParameters() as { port: string };

    // Render the component
    return (
        <div>
            <div
                className="relative h-[38.198vh] w-full md:h-[61vh]"
                style={{
                    backgroundImage: 'url(https://assets.connected.app/ports/port-80.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute bottom-6 right-6">
                    <Dialog
                        className="p-12"
                        content={
                            <div className="flex flex-col space-y-4">
                                <p className="neutral text-sm uppercase">About This Image</p>
                                <p>
                                    In a surreal dreamscape awash in soft pastel hues, an enormous, luminous browser
                                    window floats effortlessly amidst fluffy, cotton candy clouds. Within the window
                                    frame, vibrant fragments of different websites swirl and coalesce, forming ephemeral
                                    landscapes of text, images, and interactive elements. Glittering threads of code,
                                    like delicate spider silk, connect these digital shards, weaving a tapestry of
                                    interconnected information.
                                </p>

                                <p>
                                    Below the browser window, a stylized cursor, shaped like a glowing butterfly,
                                    flutters playfully, leaving a trail of sparkling stardust in its wake as it
                                    navigates through this whimsical digital realm.
                                </p>

                                <p>
                                    The scene exudes an ethereal quality, blurring the lines between reality and the
                                    virtual world, capturing the essence of exploration and discovery inherent in web
                                    browsing.
                                </p>
                            </div>
                        }
                    >
                        <div className="flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-lg bg-dark/25 text-light hover:opacity-75 active:opacity-100">
                            <InformationCircledIcon className="h-6 w-6" />
                        </div>
                    </Dialog>
                </div>
            </div>

            <div className="container mt-10">
                <div className="float-end flex flex-col items-center rounded-medium border px-4 py-2.5">
                    <div className="text-sm uppercase text-neutral">Port</div>
                    <div className="text-4xl leading-none">{urlParameters.port}</div>
                </div>

                <h1 className="mb-4 text-4xl">Port {urlParameters.port}</h1>

                <div className="max-w-[640px]">
                    <h4 className="mt-4 leading-normal">
                        Port 80 is the default port for HTTP traffic. It is used by web browsers to communicate with web
                        servers.
                    </h4>

                    <div className="mb-1 mt-4 text-sm uppercase text-neutral">Protocols</div>
                    <ul className="flex">
                        <li>
                            <Link
                                className="flex rounded-medium border bg-[#006EFC] px-2 py-0.5"
                                href="/protocols/http"
                            >
                                HTTP
                            </Link>
                        </li>
                    </ul>

                    <section className="mt-8" id="applications">
                        <div className="mb-1 text-sm uppercase text-neutral">Applications Using Port 80</div>
                        <ul className="flex space-x-2">
                            <li>
                                <Link
                                    className="flex rounded-medium border bg-[#006EFC] px-2 py-0.5"
                                    href="/protocols/http"
                                >
                                    Apache Web Server
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="flex rounded-medium border bg-[#006EFC] px-2 py-0.5"
                                    href="/protocols/http"
                                >
                                    NGINX
                                </Link>
                            </li>
                        </ul>
                    </section>

                    <section className="mt-8" id="history">
                        <h2 className="text-2xl">History</h2>
                        <h3 className="mt-4">Origin and Development</h3>
                        <p className="mt-4">
                            Port 80 was officially assigned to HTTP by IANA (Internet Assigned Numbers Authority). HTTP
                            was developed by Tim Berners-Lee at CERN in the late 1980s and early 1990s.
                        </p>

                        <p className="mt-4">who claimed the port, when, why, and what is their picture?</p>

                        <p className="mt-4">is it a well-known port and what does that mean?</p>

                        <h3 className="mt-4">Significant Events</h3>
                        <p className="mt-4">
                            The introduction of HTTP/1.0 in 1996 standardized web communications. In 1999, HTTP/1.1
                            brought performance improvements. The 2015 introduction of HTTP/2 improved efficiency, and
                            HTTP/3 (introduced in 2020) further optimized performance and security.
                        </p>
                        <h3 className="mt-4">Adoption and Usage</h3>
                        <p className="mt-4">
                            Port 80 became the standard due to its early adoption and widespread use in web browsers and
                            servers. The shift towards HTTPS (Port 443) has been driven by security concerns and
                            initiatives like Let&apos;s Encrypt.
                        </p>
                    </section>

                    <section className="mt-8" id="details">
                        <div className="mb-1 text-sm uppercase text-neutral">Security Considerations</div>
                        <p className="mt-4">
                            Since HTTP traffic on Port 80 is not encrypted, it is susceptible to eavesdropping and
                            man-in-the-middle attacks. It&apos;s recommended to use HTTPS on Port 443 for secure
                            communication.
                        </p>
                    </section>

                    <section className="mt-8" id="famous-hacks">
                        <h2 className="mt-4 text-2xl">Famous Hacks and Exploits</h2>
                        <p className="mt-4">
                            Detailed accounts of famous hacks that exploited Port 80, like the Code Red worm in 2001.
                            Discussion on the impact of these exploits and how they shaped security practices.
                        </p>
                    </section>

                    <section className="mt-8" id="trivia">
                        <h2 className="mt-4 text-2xl">Trivia and Fun Facts</h2>
                        <p className="mt-4">
                            Lesser-known details about Port 80, such as its early adoption by Tim Berners-Lee for the
                            World Wide Web. Anecdotes from the early internet era about Port 80's usage.
                        </p>
                    </section>

                    <section className="mt-8" id="pop-culture">
                        <h2 className="mt-4 text-2xl">Pop Culture References</h2>
                        <p className="mt-4">
                            Examples of references to Port 80 in popular media. Analysis of how accurate these
                            portrayals are.
                        </p>
                    </section>

                    <section className="mt-8" id="comparison-charts">
                        <h2 className="mt-4 text-2xl">Comparison Charts</h2>
                        <p className="mt-4">
                            Charts comparing Port 80 with similar ports, such as Port 8080, highlighting differences and
                            specific uses. Visualizations of usage patterns, performance, and security aspects.
                        </p>
                    </section>

                    <section className="mt-8" id="port-scan">
                        <h2 className="mt-4 text-2xl">Port Scan Results</h2>
                        <p className="mt-4">
                            An embedded tool allowing users to scan their own network for open ports. Explanations of
                            the results, focusing on the significance of each detected port and recommended actions.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
