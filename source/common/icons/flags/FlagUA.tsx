// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagUA
export interface FlagUAProperties {
    className?: string;
}
export function FlagUA(properties: FlagUAProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#005BBB" d="M32 5H4C1.791 5 0 6.791 0 9v9h36V9c0-2.209-1.791-4-4-4z" />
            <path fill="#FFD500" d="M36 27c0 2.209-1.791 4-4 4H4c-2.209 0-4-1.791-4-4v-9h36v9z" />
        </svg>
    );
}
