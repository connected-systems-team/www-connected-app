// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagGG
export interface FlagGGProperties {
    className?: string;
}
export function FlagGG(properties: FlagGGProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#EEE"
                d="M32 5H4C1.791 5 0 6.791 0 9v18c0 2.209 1.791 4 4 4h28c2.209 0 4-1.791 4-4V9c0-2.209-1.791-4-4-4z"
            />
            <path fill="#E8112D" d="M21 31h-6V21H0v-6h15V5h6v10h15v6H21z" />
            <path fill="#F9DD16" d="M27.5 17H19V9.5l1-1h-4l1 1V17H8.5l-1-1v4l1-1H17v7.5l-1 1h4l-1-1V19h8.5l1 1v-4z" />
        </svg>
    );
}
