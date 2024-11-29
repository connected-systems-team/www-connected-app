'use client'; // This component uses client-only features

// Dependencies - Project
import ProjectSettings from '@project/ProjectSettings';

// Dependencies - React and Next.js
import Link from 'next/link';

// Dependencies - Main Components
import { Button } from '@structure/source/common/buttons/Button';
import AccountMenuButton from '@structure/source/modules/account/components/AccountMenuButton';

// Dependencies - Account
import { useAccount } from '@structure/source/modules/account/providers/AccountProvider';

// Component - HomePage
export function HomePage() {
    // Hooks
    const { accountState, signedIn } = useAccount();

    const currentYear = new Date().getFullYear();

    // Function to render social links
    function renderSocialLinks() {
        const platforms = ProjectSettings.platforms;
        const platformsKeys = Object.keys(platforms);

        return platformsKeys.map(function (platformKey, index) {
            const platform = platforms[platformKey];

            if(platform) {
                return (
                    <span key={index}>
                        {index > 0 && ' • '}
                        <Link href={platform.url} target="_blank" className="text-blue underline">
                            {platform.title}
                        </Link>
                    </span>
                );
            }
        });
    }

    // Render the component
    return (
        <>
            <div className="flex h-screen items-center transition-colors md:h-screen md:items-stretch dark:bg-dark dark:text-light-2">
                {/* Show the account menu button */}
                <div className="absolute right-4 top-4 z-20">{<AccountMenuButton />}</div>

                {/* Primary div, shows up on left side of screen on medium displays */}
                <div className="scrollbar-hide flex-grow items-center justify-center md:flex md:overflow-auto md:border-r md:border-r-light-4 dark:border-r dark:border-dark-4">
                    <div className="max-w-[680px] p-8 md:max-h-screen">
                        {/* Show the logo on small screens */}
                        <div
                            className="mb-6 bg-logoLight bg-no-repeat md:hidden dark:bg-logoDark"
                            style={{
                                backgroundSize: ProjectSettings.assets.logo.width + 'px',
                                width: ProjectSettings.assets.logo.width + 'px',
                                height: ProjectSettings.assets.logo.height + 'px',
                            }}
                        />

                        {/* Project description */}
                        <h1 className="mb-5 leading-10">
                            {accountState.account
                                ? 'Welcome, ' + accountState.account?.getPublicDisplayName() + '.'
                                : ProjectSettings.description}
                        </h1>

                        <div className="max-w-[380px]">
                            {!accountState.account && (
                                <p className="font-light">
                                    The alpha version of Connected is now live. Free for a limited time.
                                </p>
                            )}

                            <Button
                                className="max-w mb-4 mt-4 w-full"
                                href={signedIn ? '/port-checker' : '/sign-in?redirectUrl=%2Fport-checker'}
                            >
                                {signedIn ? 'Continue' : 'Access the Alpha for Free'}
                            </Button>
                        </div>

                        {/* Footer */}
                        <p className="mt-6 text-sm font-light">
                            &copy;{currentYear}{' '}
                            <Link href={ProjectSettings.url} target="_blank" className="text-blue underline">
                                {ProjectSettings.ownerDisplayName}
                            </Link>
                            {' • '}
                            {renderSocialLinks()}
                        </p>
                    </div>
                </div>
                {/* Secondary div, shows up on right side of screen on medium displays */}
                <div className="z-10 hidden min-w-[40%] items-center md:flex">
                    <div>
                        {/* Div to contain logo */}
                        <div
                            className="bg-light dark:bg-dark"
                            style={{
                                marginLeft: '-' + ProjectSettings.assets.logo.height / 2 + 'px',
                                paddingTop: ProjectSettings.assets.logo.height + 'px',
                                paddingBottom: ProjectSettings.assets.logo.height + 'px',
                            }}
                        >
                            {/* Logo */}
                            <div
                                className={`bg-logoLight bg-no-repeat dark:bg-logoDark`}
                                style={{
                                    backgroundSize: ProjectSettings.assets.logo.width + 'px',
                                    width: ProjectSettings.assets.logo.width + 'px',
                                    height: ProjectSettings.assets.logo.height + 'px',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

// Export - Default
export default HomePage;