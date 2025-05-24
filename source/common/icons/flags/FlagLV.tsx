// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagLV
export interface FlagLVProperties {
    className?: string;
}
export function FlagLV(properties: FlagLVProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#9E3039"
                d="M32 5H4C1.791 5 0 6.791 0 9v6h36V9c0-2.209-1.791-4-4-4zm0 26H4c-2.209 0-4-1.791-4-4v-6h36v6c0 2.209-1.791 4-4 4z"
            />
            <path fill="#EEE" d="M0 15h36v6H0z" />
        </svg>
    );
}
