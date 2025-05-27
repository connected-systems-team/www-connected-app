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

// Component - IpAddressesPage
export interface IpAddressesPageProperties {
    publicIpAddress?: string;
    countryCode?: string;
}
export function IpAddressesPage(properties: IpAddressesPageProperties) {
    // Hooks
    const searchParameters = useSearchParams();

    // Get current pagination values from URL
    const page = parseInt(searchParameters.get('page') || '1');
    const itemsPerPage = parseInt(searchParameters.get('itemsPerPage') || '10');

    // Constants - IPv4 address space (0.0.0.0 to 255.255.255.255)
    const totalIpAddresses = 4294967296; // 2^32 = 4.3 billion IPv4 addresses
    const pagesTotal = Math.ceil(totalIpAddresses / itemsPerPage);

    // Calculate which IP addresses to display on current page
    const startIpNumber = (page - 1) * itemsPerPage;
    const endIpNumber = Math.min(page * itemsPerPage - 1, totalIpAddresses - 1);

    // Function to convert number to IP address
    const numberToIpAddress = React.useCallback(function (ipNumber: number): string {
        const a = Math.floor(ipNumber / 16777216) % 256;
        const b = Math.floor(ipNumber / 65536) % 256;
        const c = Math.floor(ipNumber / 256) % 256;
        const d = ipNumber % 256;
        return `${a}.${b}.${c}.${d}`;
    }, []);

    // Generate IP addresses for current page
    const ipAddressesOnPage = React.useMemo(
        function () {
            const addresses = [];
            for(let i = startIpNumber; i <= endIpNumber; i++) {
                addresses.push({
                    number: i,
                    address: numberToIpAddress(i),
                });
            }
            return addresses;
        },
        [startIpNumber, endIpNumber, numberToIpAddress],
    );

    // Function to get IP address type/description
    const getIpAddressDescription = React.useCallback(function (ipAddress: string): string {
        const parts = ipAddress.split('.').map(Number);
        const [a, b, c] = parts;
        if(a === undefined || b === undefined || c === undefined) return 'Invalid';

        // Special/reserved IP ranges
        if(a === 0) return 'Network (This Network)';
        if(a === 10) return 'Private (Class A)';
        if(a === 127) return 'Loopback';
        if(a === 169 && b === 254) return 'Link-Local';
        if(a === 172 && b >= 16 && b <= 31) return 'Private (Class B)';
        if(a === 192 && b === 0 && c === 2) return 'Test-Net-1';
        if(a === 192 && b === 88 && c === 99) return '6to4 Relay';
        if(a === 192 && b === 168) return 'Private (Class C)';
        if(a === 198 && b >= 18 && b <= 19) return 'Network Benchmark';
        if(a === 198 && b === 51 && c === 100) return 'Test-Net-2';
        if(a === 203 && b === 0 && c === 113) return 'Test-Net-3';
        if(a >= 224 && a <= 239) return 'Multicast (Class D)';
        if(a >= 240 && a <= 255) return 'Reserved (Class E)';
        if(ipAddress === '255.255.255.255') return 'Broadcast';

        // Public ranges
        return 'Public';
    }, []);

    // Function to get CSS classes for IP type
    const getIpAddressClasses = React.useCallback(function (description: string): string {
        if(description.includes('Private')) return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950';
        if(description.includes('Reserved') || description.includes('Test-Net'))
            return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950';
        if(description.includes('Loopback') || description.includes('Network'))
            return 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950';
        if(description.includes('Multicast'))
            return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950';
        return ''; // Public addresses get default styling
    }, []);

    // Render the component
    return (
        <div className="container pt-12">
            <div className="flex items-center justify-between">
                <h1 className="">IPv4 Addresses</h1>
                <YourIpButton publicIpAddress={properties.publicIpAddress} countryCode={properties.countryCode} />
            </div>
            <p className="mt-4 text-sm text-foreground-secondary">
                Browse through all {addCommas(totalIpAddresses)} possible IPv4 addresses (0.0.0.0 to 255.255.255.255).
            </p>

            <hr className="my-6" />

            {/* IP Address Range Info */}
            <div className="mb-6 rounded-lg bg-background-secondary p-4">
                <p className="text-sm">
                    Showing IP addresses {numberToIpAddress(startIpNumber)} - {numberToIpAddress(endIpNumber)} (#
                    {addCommas(startIpNumber + 1)} - #{addCommas(endIpNumber + 1)} of {addCommas(totalIpAddresses)}{' '}
                    total)
                </p>
            </div>

            {/* IP Addresses */}
            <div className="flex flex-col gap-2">
                {ipAddressesOnPage.map(function (ipData) {
                    const description = getIpAddressDescription(ipData.address);
                    const isSpecialRange = description !== 'Public';

                    return (
                        <Button
                            key={ipData.number}
                            className={mergeClassNames(
                                'min-w-16 justify-start text-left',
                                isSpecialRange ? getIpAddressClasses(description) : '',
                            )}
                            href={`/ip-addresses/${ipData.address}`}
                        >
                            <div className="flex w-full items-center justify-between">
                                <div>
                                    <span className="font-mono">{ipData.address}</span>
                                    {description && (
                                        <>
                                            {' '}
                                            <span className="text-foreground-secondary">({description})</span>
                                        </>
                                    )}
                                </div>
                                <div className="text-xs text-foreground-tertiary">#{addCommas(ipData.number + 1)}</div>
                            </div>
                        </Button>
                    );
                })}
            </div>

            {/* Bottom Pagination */}
            <div className="mt-8">
                <Pagination
                    page={page}
                    itemsTotal={totalIpAddresses}
                    itemsPerPage={itemsPerPage}
                    pagesTotal={pagesTotal}
                    useLinks={true}
                    itemsPerPageControl={true}
                    pageInputControl={true}
                    firstAndLastPageControl={true}
                />
            </div>
        </div>
    );
}
