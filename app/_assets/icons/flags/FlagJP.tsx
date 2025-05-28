// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagJP
export interface FlagJPProperties {
    className?: string;
}
export function FlagJP(properties: FlagJPProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#EEE"
                d="M36 27c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4V9c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v18z"
            />
            <circle fill="#ED1B2F" cx="18" cy="18" r="7" />
        </svg>
    );
}
