// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
// import { Link } from '@structure/source/common/navigation/Link';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
// import { ConnectedOutlineIcon } from '@project/source/common/ConnectedOutlineIcon';
// import { Tip } from '@structure/source/common/popovers/Tip';

// Component - YourPublicIpAddress
export interface YourPublicIpAddressProperties {
    publicIpAddress: string;
    countryCode?: string;
}
export function YourPublicIpAddress(properties: YourPublicIpAddressProperties) {
    // Render the component
    return (
        <div>
            <div className="font-medium">Your Public IP Address</div>
            <div className="mt-2 flex items-center space-x-3">
                <div className="flex w-full items-center space-x-2">
                    <div className="max-w-[220px] truncate text-2xl sm:max-w-[420px] md:max-w-full">
                        {properties.publicIpAddress} {/* Show the country code */}
                        {properties.countryCode && properties.countryCode !== 'US' && <>({properties.countryCode})</>}
                    </div>
                    <div className="flex flex-shrink-0 items-center">
                        <CopyButton
                            value={properties.publicIpAddress ?? ''}
                            notice={{
                                title: 'Copied to Clipboard',
                                content: `${properties.publicIpAddress}`,
                            }}
                        />
                    </div>
                </div>
                {/* <Tip content="Learn more about your public IP address." className="w-48">
                    <div className="flex items-center">
                        <Link href={`/ip-addresses/v4/${properties.publicIpAddress}`} target="_blank">
                            <ConnectedOutlineIcon className="h-4 w-4" />
                        </Link>
                    </div>
                </Tip> */}
            </div>
        </div>
    );
}

// Export - Default
export default YourPublicIpAddress;
