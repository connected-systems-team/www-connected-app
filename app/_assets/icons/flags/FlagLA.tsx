// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagLA
export interface FlagLAProperties {
    className?: string;
}
export function FlagLA(properties: FlagLAProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#CE1126"
                d="M0 27c0 2.209 1.791 4 4 4h28c2.209 0 4-1.791 4-4v-3H0v3zM32 5H4C1.791 5 0 6.791 0 9v3h36V9c0-2.209-1.791-4-4-4z"
            />
            <path
                fill="#002868"
                d="M0 24h36V12H0v12zm18-11c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5z"
            />
            <circle fill="#FFF" cx="18" cy="18" r="5" />
        </svg>
    );
}
