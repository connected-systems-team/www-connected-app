'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { useSearchParams } from 'next/navigation';

// Dependencies - Main Components
import { Pagination } from '@structure/source/common/navigation/pagination/Pagination';
import { Button } from '@structure/source/common/buttons/Button';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import { addCommas } from '@structure/source/utilities/Number';

// Dependencies - Common Components
import { YourIpButton } from '@project/app/(main-layout)/ip-addresses/_components/YourIpButton';

// Component - Ipv6AddressesPage
export interface Ipv6AddressesPageProperties {
    publicIpAddress?: string;
    countryCode?: string;
}
export function Ipv6AddressesPage(properties: Ipv6AddressesPageProperties) {
    // Hooks
    const searchParameters = useSearchParams();

    // Get current pagination values from URL
    const page = parseInt(searchParameters.get('page') || '1');
    const itemsPerPage = parseInt(searchParameters.get('itemsPerPage') || '10');

    // Constants - IPv6 address space (2^128 addresses)
    // We'll use BigInt for calculations but limit practical browsing
    const totalIpAddresses = BigInt('340282366920938463463374607431768211456'); // 2^128
    const maxPracticalAddresses = BigInt('18446744073709551616'); // 2^64 for practical browsing
    const practicalTotal = Number(maxPracticalAddresses); // Convert to number for pagination
    const pagesTotal = Math.ceil(practicalTotal / itemsPerPage);

    // Calculate which IP addresses to display on current page
    const startIpNumber = BigInt((page - 1) * itemsPerPage);
    const endIpNumber = startIpNumber + BigInt(itemsPerPage) - BigInt(1);

    // Function to convert BigInt to IPv6 address
    const bigIntToIpv6Address = React.useCallback(function (ipNumber: bigint): string {
        // Convert to 128-bit hex string
        const hex = ipNumber.toString(16).padStart(32, '0');

        // Split into 8 groups of 4 hex digits
        const groups = [];
        for(let i = 0; i < 8; i++) {
            groups.push(hex.substr(i * 4, 4));
        }

        // Join with colons
        let ipv6 = groups.join(':');

        // Compress consecutive zeros (basic compression)
        ipv6 = ipv6.replace(/(:0{1,4})+/g, function (match) {
            return match.replace(/0{1,4}/g, '0');
        });

        // Replace consecutive :0: with ::
        ipv6 = ipv6.replace(/:0(:0)+/g, '::');

        // Handle edge cases for :: compression
        if(ipv6.startsWith('0::')) {
            ipv6 = '::' + ipv6.slice(3);
        }
        if(ipv6.endsWith('::0')) {
            ipv6 = ipv6.slice(0, -2);
        }

        return ipv6;
    }, []);

    // Generate IPv6 addresses for current page
    const ipv6AddressesOnPage = React.useMemo(
        function () {
            const addresses = [];
            for(let i = 0; i < itemsPerPage; i++) {
                const ipNumber = startIpNumber + BigInt(i);
                if(ipNumber <= endIpNumber && ipNumber < maxPracticalAddresses) {
                    addresses.push({
                        number: ipNumber,
                        address: bigIntToIpv6Address(ipNumber),
                    });
                }
            }
            return addresses;
        },
        [startIpNumber, endIpNumber, itemsPerPage, bigIntToIpv6Address, maxPracticalAddresses],
    );

    // Function to get IPv6 address type/description
    const getIpv6AddressDescription = React.useCallback(function (ipv6Address: string): string {
        // Remove compression for analysis
        const expanded = ipv6Address.replace('::', ':0000:0000:0000:0000:0000:0000:0000:0000:').replace(/:{2,}/g, ':');
        const firstGroup = expanded.split(':')[0]?.toLowerCase() || '';
        const firstByte = parseInt(firstGroup.slice(0, 2), 16);

        // IPv6 address type classification
        if(ipv6Address === '::1') return 'Loopback';
        if(ipv6Address === '::') return 'Unspecified';
        if(ipv6Address.startsWith('fe80:')) return 'Link-Local';
        if(ipv6Address.startsWith('fec0:')) return 'Site-Local (Deprecated)';
        if(ipv6Address.startsWith('ff0')) return 'Multicast';
        if(firstGroup.startsWith('2001:db8:')) return 'Documentation';
        if(firstGroup.startsWith('2001:0:')) return 'Teredo';
        if(firstGroup.startsWith('2002:')) return '6to4';
        if(firstGroup.startsWith('fc') || firstGroup.startsWith('fd')) return 'Unique Local';
        if(firstByte >= 0x20 && firstByte <= 0x3f) return 'Global Unicast';
        if(firstGroup.startsWith('::ffff:')) return 'IPv4-mapped';
        if(firstGroup.startsWith('64:ff9b::')) return 'IPv4-embedded';

        // Default cases
        if(firstByte === 0) return 'Reserved';
        return 'Reserved/Unassigned';
    }, []);

    // Function to get CSS classes for IPv6 type
    const getIpv6AddressClasses = React.useCallback(function (description: string): string {
        if(description.includes('Global Unicast'))
            return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
        if(description.includes('Link-Local'))
            return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950';
        if(description.includes('Unique Local'))
            return 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950';
        if(description.includes('Multicast'))
            return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950';
        if(description.includes('Loopback') || description.includes('Documentation'))
            return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950';
        if(description.includes('Reserved') || description.includes('Deprecated'))
            return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950';
        return '';
    }, []);

    // Render the component
    return (
        <div className="container pt-12">
            <div className="flex items-center justify-between">
                <h1 className="">IPv6 Addresses</h1>
                <YourIpButton publicIpAddress={properties.publicIpAddress} countryCode={properties.countryCode} />
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
                Browse through IPv6 addresses in the 128-bit address space.
                <br />
                <span className="font-mono text-xs">
                    Total IPv6 space: {totalIpAddresses.toLocaleString()} addresses
                    <br />
                    (That's 340 undecillion addresses - more than atoms in the observable universe!)
                </span>
            </p>

            <hr className="my-6" />

            {/* IPv6 Address Range Info */}
            <div className="mb-6 rounded-lg bg-background-secondary p-4">
                <p className="text-sm">
                    Showing IPv6 addresses {bigIntToIpv6Address(startIpNumber)} - {bigIntToIpv6Address(endIpNumber)}
                    <br />
                    <span className="text-xs text-foreground-tertiary">
                        Position #{(startIpNumber + BigInt(1)).toLocaleString()} - #
                        {(endIpNumber + BigInt(1)).toLocaleString()}
                        in the first {addCommas(practicalTotal)} addresses
                    </span>
                </p>
            </div>

            {/* Warning about the scale */}
            <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>⚠️ Reality Check:</strong> IPv6 has 2^128 addresses. If you viewed 1 billion addresses per
                    second, it would take you longer than the age of the universe to see them all. We're showing the
                    first 2^64 for practical browsing.
                </p>
            </div>

            {/* IPv6 Addresses */}
            <div className="flex flex-col gap-2">
                {ipv6AddressesOnPage.map(function (ipData) {
                    const description = getIpv6AddressDescription(ipData.address);
                    const isSpecialRange = !description.includes('Reserved/Unassigned');

                    return (
                        <Button
                            key={ipData.number.toString()}
                            className={mergeClassNames(
                                'min-w-16 justify-start text-left',
                                isSpecialRange ? getIpv6AddressClasses(description) : '',
                            )}
                            href={`/ip-addresses/${ipData.address}`}
                        >
                            <div className="flex w-full items-center justify-between">
                                <div>
                                    <span className="font-mono text-sm">{ipData.address}</span>
                                    {description && (
                                        <>
                                            <br />
                                            <span className="text-xs text-foreground-secondary">({description})</span>
                                        </>
                                    )}
                                </div>
                                <div className="text-xs text-foreground-tertiary">
                                    #{(ipData.number + BigInt(1)).toLocaleString()}
                                </div>
                            </div>
                        </Button>
                    );
                })}
            </div>

            {/* Bottom Pagination */}
            <div className="mt-8">
                <Pagination
                    page={page}
                    itemsTotal={practicalTotal}
                    itemsPerPage={itemsPerPage}
                    pagesTotal={pagesTotal}
                    useLinks={true}
                    itemsPerPageControl={true}
                    pageInputControl={true}
                    firstAndLastPageControl={true}
                />
            </div>

            {/* Fun facts */}
            <div className="mt-8 rounded-lg bg-background-secondary p-4">
                <h3 className="mb-2 font-semibold">🤯 IPv6 Fun Facts</h3>
                <ul className="space-y-1 text-sm text-foreground-secondary">
                    <li>• IPv6 has 2^128 = 340,282,366,920,938,463,463,374,607,431,768,211,456 addresses</li>
                    <li>• That's roughly 3.4 × 10^38 addresses</li>
                    <li>• You could assign 4.8 × 10^28 addresses to every human on Earth</li>
                    <li>• It would take a 64-bit counter 584 billion years to count them all at 1 GHz</li>
                    <li>• There are more IPv6 addresses than there are grains of sand on all Earth's beaches</li>
                </ul>
            </div>
        </div>
    );
}
