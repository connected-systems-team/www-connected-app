// Dependencies - React
import React from 'react';

// Dependencies - Main Components
import { Button } from '@structure/source/common/buttons/Button';

// Dependencies - Assets
import ArrowUpIcon from '@structure/assets/icons/interface/ArrowUpIcon.svg';

// Dependencies - Icons
import { Flag } from '@project/source/common/icons/flags/Flag';

// Component - YourIpButton
export interface YourIpButtonProperties {
    className?: string;
    publicIpAddress?: string;
    countryCode?: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
}
export function YourIpButton(properties: YourIpButtonProperties) {
    // Don't render if no IP address
    if(!properties.publicIpAddress) {
        return null;
    }

    // Render the component
    return (
        <Button
            icon={ArrowUpIcon}
            iconPosition="left"
            href={`/ip-addresses/${properties.publicIpAddress}`}
            className={properties.className}
        >
            <span>Your IP: {properties.publicIpAddress}</span>
            {properties.countryCode && <Flag countryCode={properties.countryCode} className="ml-2 h-4 w-6" />}
        </Button>
    );
}
