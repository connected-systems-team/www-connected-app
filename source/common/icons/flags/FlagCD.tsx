// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - FlagCD
export interface FlagCDProperties {
    className?: string;
}
export function FlagCD(properties: FlagCDProperties) {
    // Render the component
    return (
        <svg
            className={mergeClassNames('inline-block h-4 w-6', properties.className)}
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="#007FFF"
                d="M4 31h28c2.209 0 4-1.791 4-4V11.25L3.215 30.921c.254.05.516.079.785.079zM32 5H4C1.791 5 0 6.791 0 9v15.75L32.785 5.079C32.531 5.029 32.269 5 32 5zM9.63 16.02l-3.06-2.34-3.06 2.34 1.17-3.78L1.62 9.9H5.4l1.17-3.78L7.74 9.9h3.78l-3.06 2.34 1.17 3.78z"
            />
            <path
                fill="#F7D618"
                d="M7.74 9.9L6.57 6.12 5.4 9.9H1.62l3.06 2.34-1.17 3.78 3.06-2.34 3.06 2.34-1.17-3.78 3.06-2.34zM3.215 30.921L36 11.25V9.9L1.873 30.376c.406.256.856.448 1.342.545zm29.57-25.842L0 24.75v1.35L34.127 5.624c-.406-.256-.856-.448-1.342-.545z"
            />
            <path
                fill="#CE1021"
                d="M34.127 5.624L0 26.1v.9c0 1.425.751 2.668 1.873 3.376L36 9.9V9c0-1.425-.751-2.668-1.873-3.376z"
            />
        </svg>
    );
}
