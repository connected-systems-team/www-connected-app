// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagVN
export interface FlagVNProperties {
    className?: string;
}
export function FlagVN(properties: FlagVNProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#DA251D"
                d="M32 5H4C1.791 5 0 6.791 0 9v18c0 2.209 1.791 4 4 4h28c2.209 0 4-1.791 4-4V9c0-2.209-1.791-4-4-4z"
            />
            <path
                fill="#FF0"
                d="M19.753 16.037L18 10.642l-1.753 5.395h-5.672l4.589 3.333-1.753 5.395L18 21.431l4.589 3.334-1.753-5.395 4.589-3.333z"
            />
        </svg>
    );
}
