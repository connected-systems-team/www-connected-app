'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

// Dependencies - Main Components
import { AuthorizationLayout } from '@structure/source/layouts/AuthorizationLayout';
import { Button } from '@structure/source/common/buttons/Button';
import { PortChecker } from '@project/app/(main-layout)/port-checker/PortChecker';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Port Checker',
    };
}

// Component - PortCheckerPage
export interface PortCheckerPageInterface {
    publicIpAddress?: string;
}
export function PortCheckerPage(properties: PortCheckerPageInterface) {
    // State
    const [isMounted, setIsMounted] = React.useState(false);
    const [isNoticeVisible, setIsNoticeVisible] = React.useState(false);

    // Effect to check if notice was previously dismissed
    React.useEffect(function () {
        const dismissedDate = localStorage.getItem('connectedPortCheckerNoticeDismissedDate');
        // If no dismissed date exists
        if(!dismissedDate) {
            setIsNoticeVisible(true);
        }
        setIsMounted(true);
    }, []);

    // Function to handle notice dismissal
    function handleDismissNotice() {
        localStorage.setItem('connectedPortCheckerNoticeDismissedDate', new Date().toISOString());
        setIsNoticeVisible(false);
    }

    // Render the component
    return (
        <AuthorizationLayout>
            <div className="container flex w-full flex-col items-center justify-center pt-8">
                {/* Dismissable Notice */}
                {isMounted && (
                    <div
                        className={`relative flex w-full flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                            isNoticeVisible ? 'mb-6 max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="rounded border border-purple-600 bg-purple-500 p-3 text-sm text-purple-100 dark:border-purple-400">
                            <p>
                                Welcome to the alpha version of Connected! We are honored to have you as one of our
                                first users.
                            </p>

                            <p className="mt-2">
                                We currently have 3 regions online, free for you to use. In the coming months we will be
                                adding features enabling you to monitor ports, get real-time notifications of downtime,
                                and much more. Bookmark this page and stay in touch at{' '}
                                <Link href="https://x.com/connecteddotapp" target="blank" className="underline">
                                    @connecteddotapp
                                </Link>{' '}
                                on X.
                            </p>

                            <p className="mt-2">&mdash; Kirk and Kam</p>

                            <Button
                                variant="unstyled"
                                className="mt-4 w-full rounded-sm bg-purple-800 hover:bg-purple-700 active:bg-purple-600"
                                onClick={handleDismissNotice}
                            >
                                Acknowledge
                            </Button>
                        </div>
                    </div>
                )}

                <PortChecker publicIpAddress={properties.publicIpAddress ?? undefined} />
            </div>
        </AuthorizationLayout>
    );
}

// Export - Default
export default PortCheckerPage;
