// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagMC
export interface FlagMCProperties {
    className?: string;
}
export function FlagMC(properties: FlagMCProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#EEE" d="M0 18v9c0 2.209 1.791 4 4 4h28c2.209 0 4-1.791 4-4v-9H0z" />
            <path fill="#CE1126" d="M32 5H4C1.791 5 0 6.791 0 9v9h36V9c0-2.209-1.791-4-4-4z" />
        </svg>
    );
}
