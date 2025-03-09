'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Assets
import ConnectedOutlineIconSvg from '@project/assets/icons/ConnectedOutlineIcon.svg';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - ConnectedOutlineIcon
export interface ConnectedOutlineIconInterface {
    className?: string;
}
export function ConnectedOutlineIcon(properties: ConnectedOutlineIconInterface) {
    // Render the component
    return (
        <ConnectedOutlineIconSvg
            className={mergeClassNames(
                'cursor-pointer text-theme-dark-primary hover:text-dark dark:text-theme-dark-primary dark:hover:text-light',
                properties.className,
            )}
        />
    );
}
