// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagMU
export interface FlagMUProperties {
    className?: string;
}
export function FlagMU(properties: FlagMUProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#EA2839" d="M32 5H4C1.791 5 0 6.791 0 9v2.5h36V9c0-2.209-1.791-4-4-4z" />
            <path fill="#1A206D" d="M0 11.5h36V18H0z" />
            <path fill="#FFD500" d="M0 18h36v6.5H0z" />
            <path fill="#00A551" d="M0 24.5V27c0 2.209 1.791 4 4 4h28c2.209 0 4-1.791 4-4v-2.5H0z" />
        </svg>
    );
}
