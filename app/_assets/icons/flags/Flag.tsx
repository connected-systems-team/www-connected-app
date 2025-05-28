// 'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Utilities
import { getCountryByCode } from '@structure/source/utilities/geo/Countries';

// Dependencies - Flag Components
import { getFlagComponent } from './FlagComponents';

// Component - Flag
export interface FlagProperties {
    className?: string;
    countryCode: string;
}
export function Flag(properties: FlagProperties) {
    // Get country data by country code
    const country = getCountryByCode(properties.countryCode);

    // If no valid country found, return fallback
    if(!country) {
        return <span className={properties.className}>🌐</span>;
    }

    // Get the flag component for this country code
    const FlagComponent = getFlagComponent(properties.countryCode);

    // If flag component exists, render it
    if(FlagComponent) {
        return <FlagComponent className={properties.className} />;
    }

    // Fallback to emoji if no flag component found
    return <span className={properties.className}>{country.emoji}</span>;
}
