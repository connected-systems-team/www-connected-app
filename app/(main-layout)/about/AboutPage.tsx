// Dependencies - React and Next.js
import React from 'react';
import { Metadata } from 'next';

// Dependencies - Main Components
import { Link } from '@structure/source/common/navigation/Link';
import { Atlas } from '@project/app/(main-layout)/atlas/_components/Atlas';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'About',
    };
}

// Component - AboutPage
export function AboutPage() {
    // Render the component
    return (
        <div className="container pt-12">
            <h1>About Connected</h1>

            <hr className="my-6" />

            <Atlas particlesEnabled={false} scale={1.0} className="mx-auto my-16 w-32" />

            {/* <hr className="my-6" /> */}

            <div className="mx-auto max-w-screen-sm">
                <h4 className="mb-3">Mission and Vision</h4>
                <div className="text-foreground-secondary">
                    <p>
                        Our mission is to provide foundational network and Internet services that enhance connectivity
                        and improve the digital experience for users worldwide.
                    </p>
                </div>

                <h4 className="mb-3 mt-6">Our Story</h4>
                <div className="text-foreground-secondary">
                    <p>
                        Connected was founded by Kirk Ouimet and Kameron Sheffield, who both have passion for
                        technology. The journey began over 15 years ago with Kirk&apos;s creation of{' '}
                        <Link href="https://www.yougetsignal.com/" target="_blank" className="link-blue">
                            YouGetSignal
                        </Link>
                        , a popular network tools website. Building on the success and experience gained from
                        YouGetSignal, Kirk and Kam envisioned a more advanced and comprehensive solution, leading to the
                        development of connected.app.
                    </p>
                </div>
            </div>
        </div>
    );
}
