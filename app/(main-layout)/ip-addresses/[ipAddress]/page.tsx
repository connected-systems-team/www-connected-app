// Dependencies - Next.js
import { Metadata } from 'next';

// Dependencies - Utilities
import { isIpV4Address, isIpV6Address } from '@structure/source/utilities/network/IpAddress';

// Dependencies - Components
import { IpAddressV4Page } from './IpAddressV4Page';
import { IpAddressV6Page } from './IpAddressV6Page';

// Interface - IpAddressPageProperties
interface IpAddressPageProperties {
    params: {
        ipAddress: string;
    };
}

// Metadata
export async function generateMetadata(properties: IpAddressPageProperties): Promise<Metadata> {
    // Get the IP address from params
    const ipAddress = properties.params.ipAddress;

    // Set the title
    const title = ipAddress ? ipAddress + ' • IP Addresses' : 'IP Addresses';

    return {
        title: title,
    };
}

// Page - IpAddressPage
export default function IpAddressPage(properties: IpAddressPageProperties) {
    // Get the IP address from params
    const ipAddress = properties.params.ipAddress;

    // Determine which component to render based on IP version
    if(isIpV4Address(ipAddress)) {
        return <IpAddressV4Page ipAddress={ipAddress} />;
    }
    else if(isIpV6Address(ipAddress)) {
        return <IpAddressV6Page ipAddress={ipAddress} />;
    }
    else {
        // Invalid IP address
        return (
            <div className="container pt-12">
                <h1>Invalid IP Address</h1>
                <p className="mt-4 text-sm text-foreground-secondary">
                    The provided address &quot;{ipAddress}&quot; is not a valid IPv4 or IPv6 address.
                </p>
            </div>
        );
    }
}
