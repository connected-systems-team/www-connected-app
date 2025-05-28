// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagBE
export interface FlagBEProperties {
    className?: string;
}
export function FlagBE(properties: FlagBEProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#141414" d="M7 5a4 4 0 0 0-4 4v18a4 4 0 0 0 4 4h6V5H7z" />
            <path fill="#FDDA24" d="M13 5h10v26H13z" />
            <path fill="#EF3340" d="M29 5h-6v26h6a4 4 0 0 0 4-4V9a4 4 0 0 0-4-4z" />
        </svg>
    );
}
