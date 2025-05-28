// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagVC
export interface FlagVCProperties {
    className?: string;
}
export function FlagVC(properties: FlagVCProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#009E60" d="M32 5h-5v26h5c2.209 0 4-1.791 4-4V9c0-2.209-1.791-4-4-4z" />
            <path fill="#0072C6" d="M4 5C1.791 5 0 6.791 0 9v18c0 2.209 1.791 4 4 4h5V5H4z" />
            <path fill="#FCD116" d="M9 5h18v26H9z" />
            <path
                d="M15.833 23.526L18 27.859l2.167-4.333L18 19.193l-2.167 4.333zm-2.708-5.417l2.167 4.333 2.167-4.333-2.167-4.333-2.167 4.333zm5.417 0l2.167 4.333 2.167-4.333-2.167-4.333-2.167 4.333z"
                fill="#009E60"
            />
        </svg>
    );
}
