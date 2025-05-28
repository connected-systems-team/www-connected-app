// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagCI
export interface FlagCIProperties {
    className?: string;
}
export function FlagCI(properties: FlagCIProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#F77F00" d="M4 5C1.791 5 0 6.791 0 9v18c0 2.209 1.791 4 4 4h8V5H4z" />
            <path fill="#EEE" d="M12 5h12v26H12z" />
            <path fill="#009E60" d="M32 5h-8v26h8c2.209 0 4-1.791 4-4V9c0-2.209-1.791-4-4-4z" />
        </svg>
    );
}
