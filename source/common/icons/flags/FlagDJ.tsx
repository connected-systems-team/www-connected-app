// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagDJ
export interface FlagDJProperties {
    className?: string;
}
export function FlagDJ(properties: FlagDJProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#6AB2E7" d="M32 5H4c-1.016 0-1.94.382-2.646 1.006L17.5 18H36V9c0-2.209-1.791-4-4-4z" />
            <path fill="#12AD2B" d="M32 31H4c-1.016 0-1.94-.382-2.646-1.006L17.5 18H36v9c0 2.209-1.791 4-4 4z" />
            <path
                fill="#EEE"
                d="M1.383 29.973L17.5 18 1.354 6.006C.525 6.739 0 7.807 0 9v17.5c0 1.48.537 2.683 1.383 3.473z"
            />
            <path
                fill="#D7141A"
                d="M6.5 14.5l.826 2.543H10l-2.163 1.572.826 2.543L6.5 19.586l-2.163 1.572.826-2.543L3 17.043h2.674L6.5 14.5z"
            />
        </svg>
    );
}
