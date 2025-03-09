'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Dependencies - Main Components
import AccountMenuButton from '@structure/source/modules/account/components/AccountMenuButton';
import NavigationLinks from '@project/app/(main-layout)/layout/navigation/NavigationLinks';
import NavigationMobile from '@project/app/(main-layout)/layout/navigation/NavigationMobile';
// import { Dialog as SearchDialog } from './NavigationSearch';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - Navigation
interface NavigationInterface extends React.HTMLProps<HTMLElement> {}
export function Navigation(properties: NavigationInterface) {
    // Render the component
    return (
        <nav
            className={mergeClassNames(
                'container relative flex w-full items-center justify-between leading-7 text-dark md:justify-between dark:text-light',
                properties.className,
            )}
        >
            {/* Navigation - Mobile */}
            <div className="md:hidden">
                <NavigationMobile />
            </div>

            {/* Navigation Links */}
            <div className="pointer-events-none hidden md:absolute md:inset-x-0 md:flex md:w-full md:items-center md:justify-center">
                <div className="pointer-events-auto hidden space-x-phi md:flex">
                    {NavigationLinks.map(function (navigationLink, navigationLinkIndex) {
                        return (
                            <Link
                                key={navigationLinkIndex}
                                href={navigationLink.href}
                                className="py-2.5 text-[15px] transition-opacity hover:opacity-70"
                            >
                                {navigationLink.title}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Logo */}
            <Link
                href="/"
                // Matches the height and width of the logo in the footer
                className="pointer-events-auto relative z-10 m-phi-base-0.5 block aspect-square w-phi shrink-0 transition-opacity hover:opacity-70 md:ml-0"
            >
                <Image
                    src="/images/logo/connected-logo.svg"
                    alt="Phi"
                    fill
                    className="object-contain dark:invert"
                    priority
                />
            </Link>

            {/* Utility Buttons */}
            <div className="pointer-events-auto flex items-center">
                {/* Cart */}
                {/* <div className="mr-6 md:mr-4"><BagPopover /></div> */}

                {/* Search */}
                {/* <div className="flex items-center md:mr-4">
                    <SearchDialog />
                </div> */}

                {/* Account */}
                <div className="">
                    <AccountMenuButton />
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
