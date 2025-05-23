// Dependencies - React and Next.js
import React from 'react';
import { Metadata } from 'next';

// Dependencies - Main Components
import { Link } from '@structure/source/common/navigation/Link';

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
        <div className="container pt-8">
            <h1>About Connected</h1>

            <hr className="my-6" />

            <h4 className="mb-3">Mission and Vision</h4>
            <div className="text-foreground-secondary">
                <p>
                    At Connected Systems, LLC, our mission is to provide foundational network and Internet services that
                    enhance connectivity and improve the digital experience for users worldwide. Through our flagship
                    product, connected.app, we aim to offer reliable and secure network management tools that empower
                    individuals and businesses to monitor and maintain their online presence effectively.
                </p>
            </div>

            <h4 className="mb-3 mt-6">Our Story</h4>
            <div className="text-foreground-secondary">
                <p>
                    Connected Systems, LLC was founded by Kirk Ouimet and Kameron Sheffield, who both have passion for
                    technology and network solutions. The journey began over 15 years ago with Kirk&apos;s creation of{' '}
                    <Link href="https://www.yougetsignal.com/" target="_blank" className="link-blue">
                        YouGetSignal
                    </Link>
                    , a popular network tool website. Building on the success and experience gained from YouGetSignal,
                    Kirk and Kam envisioned a more advanced and comprehensive solution, leading to the development of
                    connected.app.
                </p>
                <p className="mt-2">
                    Connected.app is designed to be the successor to YouGetSignal, incorporating advanced features such
                    as port checking, port monitoring, uptime tracking, and various network management tools. Our
                    commitment to continuous improvement and innovation drives us to expand our services, ensuring we
                    meet the evolving needs of our users.
                </p>
            </div>

            <h4 className="mb-3 mt-6">Our Team</h4>
            <div className="text-foreground-secondary">
                <p>
                    Connected Systems, LLC is led by Kirk Ouimet and Kameron Sheffield, who bring a wealth of experience
                    in technology and network services. Both were senior engineers and managers at Snap Inc., where they
                    were responsible for the experience of 450 million daily active users. Our dedicated team comprises
                    experts in software development, network security, customer support, and marketing, all working
                    together to deliver exceptional service to our users.
                </p>
            </div>

            <h4 className="mb-3 mt-6">Core Values</h4>
            <div className="text-foreground-secondary">
                <ul className="ml-4 list-disc">
                    <li>
                        <strong>Innovation:</strong> We strive to stay at the forefront of technology, constantly
                        improving our services to offer cutting-edge solutions.
                    </li>
                    <li>
                        <strong>Reliability:</strong> Our users depend on us for accurate and consistent performance,
                        and we take this responsibility seriously.
                    </li>
                    <li>
                        <strong>Security:</strong> Protecting user data and ensuring secure network operations are our
                        top priorities.
                    </li>
                    <li>
                        <strong>Customer Focus:</strong> We listen to our users and continuously seek feedback to
                        enhance our offerings.
                    </li>
                    <li>
                        <strong>Transparency:</strong> We maintain open and honest communication with our users about
                        our services and practices.
                    </li>
                </ul>
            </div>

            {/* Why Choose Connected? */}
            <h4 className="mb-3 mt-6">Why Choose Connected?</h4>
            <div className="text-foreground-secondary">
                <p>
                    Connected.app stands out in the market due to its robust and comprehensive set of features designed
                    to meet diverse network management needs. Our platform offers unparalleled reliability, security,
                    and user-friendly tools that simplify complex network tasks. Whether you&apos;re an individual user
                    or a business, connected.app provides the essential tools to keep your network running smoothly and
                    efficiently.
                </p>
            </div>
        </div>
    );
}
