'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { useUrlPath } from '@structure/source/router/Navigation';

// Dependencies - Main Components
import { Link } from '@structure/source/common/navigation/Link';
import { NavigationLinks } from '@project/app/(main-layout)/_layout/navigation/NavigationLinks';
import { NavigationDrawer } from '@project/app/(main-layout)/_layout/navigation/NavigationDrawer';

// Component - NavigationMobile
// interface NavigationMobileInterface extends React.HTMLProps<HTMLElement> {}
export function NavigationMobile() {
    // State
    const [open, setOpen] = React.useState(false);

    // Close the drawer when the size of the screen is greater than 768px
    React.useEffect(function () {
        // Handler to call on window resize
        const onResize = function () {
            if(window.innerWidth > 768) {
                setOpen(false);
            }
        };

        // Add event listener
        window.addEventListener('resize', onResize);

        return function () {
            // Clean up the event listener
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const urlPath = useUrlPath();
    React.useEffect(
        function () {
            setOpen(false);
        },
        [urlPath],
    );

    // Render the component
    return (
        <NavigationDrawer open={open} setOpen={setOpen}>
            <div className="mt-12 overflow-y-scroll">
                <ul className="space-y-8">
                    {NavigationLinks.map(function (navigationLink, navigationLinkIndex) {
                        return (
                            <li key={navigationLinkIndex}>
                                <Link
                                    href={navigationLink.href}
                                    onClick={function () {
                                        setOpen(false);
                                    }}
                                    className="text-2xl font-semibold capitalize"
                                >
                                    {navigationLink.title}
                                </Link>
                            </li>
                        );
                    })}

                    <li>
                        <Link
                            href={'/home'}
                            onClick={function () {
                                setOpen(false);
                            }}
                            className="text-2xl font-semibold capitalize"
                        >
                            Home
                        </Link>
                    </li>

                    {/* <li>
                        <Link
                            href={'/account/profile'}
                            onClick={function () {
                                setOpen(false);
                            }}
                            className="text-2xl font-semibold capitalize"
                        >
                            Profile
                        </Link>
                    </li> */}
                </ul>
            </div>
        </NavigationDrawer>
    );
}
