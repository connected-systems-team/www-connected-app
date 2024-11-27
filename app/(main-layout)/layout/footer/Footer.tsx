// Dependencies - Structure
import ProjectSettings from '@project/ProjectSettings';

// Dependencies - React and Next.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Dependencies - Main Components
import { Tip } from '@structure/source/common/popovers/Tip';
import LocaleControl from '@structure/source/common/navigation/LocaleControl';

// Dependencies - Assets
import FacebookIcon from '@structure/assets/icons/platforms/FacebookIcon.svg';
import XIcon from '@structure/assets/icons/platforms/XIcon.svg';
import InstagramIcon from '@structure/assets/icons/platforms/InstagramIcon.svg';
import LinkedInIcon from '@structure/assets/icons/platforms/LinkedInIcon.svg';
import TikTokIcon from '@structure/assets/icons/platforms/TikTokIcon.svg';

// Dependencies - Utilities
// import { mergeClassNames } from '@structure/source/utilities/Style';

// Interface - FooterLink
export interface FooterLink {
    title: string;
    url: string;
}

// Interface - FooterLinkGroup
export interface FooterLinkGroup {
    title: string;
    links: FooterLink[];
}

// Component - Footer
export function Footer() {
    const socialLinks = Object.keys(ProjectSettings.platforms)
        .map((platform) => {
            const platformData = ProjectSettings.platforms[platform];
            if(!platformData) return;

            if(platformData.type === 'social' && platformData.url) {
                return platformData;
            }
        })
        .filter((platform) => typeof platform !== 'undefined') as (typeof ProjectSettings.platforms)[string][];

    const footerLinkGroups: FooterLinkGroup[] = [
        {
            title: 'Services',
            links: [
                { title: 'Port Forwarding Tester', url: '/port-checker' },
                // { title: 'Connected App', url: '/app' },
                // { title: 'Shop', url: '/shop' },
            ],
        },
        {
            title: 'Company',
            links: [
                { title: 'About', url: '/about' },
                // { title: 'News', url: '/news' },
                // { title: 'Careers', url: '/careers' },
                // { title: 'Owners', url: '/owners' },
                // { title: 'Press', url: '/press' },
            ],
        },
        {
            title: 'Help',
            links: [
                // { title: 'Support', url: '/support' },
                // { title: 'FAQ', url: '/faq' },
                // { title: 'Suggestions', url: '/suggestions' },
                { title: 'Contact', url: '/contact' },
            ],
        },
        {
            title: 'Safety',
            links: [
                { title: 'Terms of Service', url: '/legal/terms-of-service' },
                { title: 'Privacy Policy', url: '/legal/privacy-policy' },
            ],
        },
    ];

    // Render the component
    return (
        <footer className="mt-32 w-full">
            <div className="border-b border-t bg-light-1 transition-colors dark:bg-dark-1">
                <div className="container flex items-center justify-between py-phi-base-0.75">
                    {/* Logo and Socials */}
                    <Link href="/" className="transition-opacity hover:opacity-70">
                        <Image
                            src={'/images/logo/connected-logo-with-wordmark.svg'}
                            alt="Connected"
                            width={0}
                            height={0}
                            priority
                            className="pointer-events-none h-[22px] w-auto select-none object-contain dark:invert"
                        />
                    </Link>

                    <div className="flex items-center space-x-phi">
                        {socialLinks.map(function (platform, index) {
                            let Icon = null;

                            if(platform.title === 'Facebook') {
                                Icon = FacebookIcon;
                            }
                            else if(platform.title === 'Instagram') {
                                Icon = InstagramIcon;
                            }
                            else if(platform.title === 'LinkedIn') {
                                Icon = LinkedInIcon;
                            }
                            else if(platform.title === 'TikTok') {
                                Icon = TikTokIcon;
                            }
                            else {
                                Icon = XIcon;
                            }

                            if(Icon) {
                                return (
                                    <Tip
                                        key={index}
                                        content={
                                            <p className="px-2 py-1 text-sm">{`${ProjectSettings.title} on ${platform.title}`}</p>
                                        }
                                        sideOffset={10}
                                    >
                                        <Link
                                            href={platform.url}
                                            className="transition-opacity hover:opacity-70"
                                            target="_blank"
                                        >
                                            <Icon className="h-5 w-5" />
                                        </Link>
                                    </Tip>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>

            <section id="footer" className="container pb-10 md:py-12 md:pb-2">
                <div className="relative text-lg">
                    <div className="mt-10 grid w-full grid-cols-1 space-y-12 text-[15px] md:mt-0 md:grid-cols-4 md:space-y-0">
                        {footerLinkGroups.map((group, index) => (
                            <div key={index} className="col-span-1 w-full md:h-full md:pb-10">
                                <h6 className="mb-3.5 leading-[150%] text-neutral-2">{group.title}</h6>
                                <ul className="space-y-2.5">
                                    {group.links.map((link, index) => (
                                        <li key={index}>
                                            <Link
                                                href={link.url}
                                                className="text-sm transition-opacity ease-out hover:opacity-60"
                                            >
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-right text-xs"></p>
            </section>

            <div className="w-full py-6 text-sm">
                <div className="container flex h-full flex-col md:flex-row-reverse md:items-center md:justify-between">
                    <LocaleControl className="mb-8 md:mb-0" />
                    <p>&copy; 2022&ndash;{new Date().getFullYear()} Connected Systems, LLC. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

// Export - Default
export default Footer;
