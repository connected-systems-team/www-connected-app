// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import Navigation from '@project/app/(main-layout)/layout/navigation/Navigation';
import Footer from '@project/app/(main-layout)/layout/footer/Footer';

// Dependencies - Animation
import LineLoadingAnimation from '@structure/source/common/animations/LineLoadingAnimation';

// ClassName - Default Main Layout Container
export const centeredMainLayoutContainerClassName = 'mx-auto max-w-[1080px] px-6 py-6';

// Component - MainLayout
export interface MainLayoutInterface {
    children: React.ReactNode;
}
export function MainLayout(properties: MainLayoutInterface) {
    // Render the component
    return (
        <>
            {/* Navigation */}
            <div className="sticky top-0 z-40 border-b bg-light transition-colors dark:bg-dark">
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
            <div className="">
                <Footer />
            </div>
        </>
    );
}

// Export - Default
export default MainLayout;
