// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
// import { Link } from '@structure/source/common/navigation/Link';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
// import { ConnectedOutlineIcon } from '@project/source/common/ConnectedOutlineIcon';
// import { Tip } from '@structure/source/common/popovers/Tip';

// Component - YourPublicIpAddress
export interface YourPublicIpAddressInterface {
    publicIpAddress: string;
}
export function YourPublicIpAddress(properties: YourPublicIpAddressInterface) {
    // Render the component
    return (
        <div>
            <div className="font-medium">Your Public IP Address</div>
            <div className="mt-2 flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                    <div className="text-2xl">{properties.publicIpAddress}</div>
                    <div className="flex items-center">
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
