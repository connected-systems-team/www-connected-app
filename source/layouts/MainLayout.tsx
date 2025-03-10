'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { useUrlPath } from '@structure/source/utilities/next/NextNavigation';

// Dependencies - Main Components
import Navigation from '@project/app/(main-layout)/layout/navigation/Navigation';
import Footer from '@project/app/(main-layout)/layout/footer/Footer';

// Dependencies - Animation
import LineLoadingAnimation from '@structure/source/common/animations/LineLoadingAnimation';

// Component - MainLayout
export interface MainLayoutInterface {
    children: React.ReactNode;
}
export function MainLayout(properties: MainLayoutInterface) {
    // Hooks
    const urlPath = useUrlPath();

    // References
    const scrollTargetReference = React.useRef<HTMLDivElement>(null);

    // Effect to scroll to the top of the page when the path changes
    // This is to address a Next bug where the page does not scroll to the top
    // when there is a header that is sticky
    // https://github.com/vercel/next.js/discussions/64435
    // When this is fixed we should remove this hack and remove 'use client'
    // from the top of this file
    React.useEffect(
        function () {
            // Scroll to the top of the page
            scrollTargetReference.current?.scrollIntoView({
                behavior: 'instant',
            });
        },
        [urlPath],
    );

    // Render the component
    return (
        <>
            <div ref={scrollTargetReference} className="absolute top-[-100px] h-4 w-4 opacity-0" />

            {/* Navigation */}
            <div className="bg-background-secondary sticky top-0 z-40 border-b">
                <Navigation />
            </div>

            {/* Content */}
            {/* Show the line loading animation when the page is loading */}
            <React.Suspense
                fallback={
                    <div className="absolute inset-0 w-full">
                        <LineLoadingAnimation />
                    </div>
                }
            >
                <div className="relative w-full overflow-x-clip">{properties.children}</div>
            </React.Suspense>

            {/* Footer */}
            <Footer />
        </>
    );
}

// Export - Default
export default MainLayout;
