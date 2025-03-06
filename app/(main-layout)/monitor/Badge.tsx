'use client'; // This component uses client-only features

// Dependencies - React
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - Badge
export interface BadgeInterface {
    className?: string;
    children: React.ReactNode;
    color?: 'default' | 'primary' | 'secondary' | 'green' | 'red' | 'yellow' | 'gray';
    icon?: React.ComponentType<{ className?: string }>;
}

export function Badge(properties: BadgeInterface) {
    const colorClasses = {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        secondary: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
        red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
        yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
        gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };

    // Icon element
    const IconElement = properties.icon;

    // Render the component
    return (
        <span
            className={mergeClassNames(
                'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                colorClasses[properties.color || 'default'],
                properties.className,
            )}
        >
            {IconElement && <IconElement className={mergeClassNames('mr-1 h-3.5 w-3.5')} />}
            {properties.children}
        </span>
    );
}
