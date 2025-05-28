// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagTH
export interface FlagTHProperties {
    className?: string;
}
export function FlagTH(properties: FlagTHProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#A7122D" d="M0 26.518V27c0 2.209 1.791 4 4 4h28c2.209 0 4-1.791 4-4v-.482H0z" />
            <path fill="#EEE" d="M0 22.181h36v4.485H0z" />
            <path fill="#292648" d="M0 13.513h36v8.821H0z" />
            <path fill="#EEE" d="M0 9.181h36v4.485H0z" />
            <path fill="#A7122D" d="M0 9.333V9c0-2.209 1.791-4 4-4h28c2.209 0 4 1.791 4 4v.333H0z" />
        </svg>
    );
}
