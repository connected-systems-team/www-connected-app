// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagAT
export interface FlagATProperties {
    className?: string;
}
export function FlagAT(properties: FlagATProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#EEE" d="M0 13h36v10H0z" />
            <path
                fill="#ED2939"
                d="M32 5H4C1.791 5 0 6.791 0 9v4h36V9c0-2.209-1.791-4-4-4zM4 31h28c2.209 0 4-1.791 4-4v-4H0v4c0 2.209 1.791 4 4 4z"
            />
        </svg>
    );
}
