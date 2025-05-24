'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import { getCountryByCode } from '@structure/source/utilities/geo/Countries';

// Function to convert country code to Unicode codepoint filename
function getCountryCodeToUnicodeFilename(countryCode: string): string {
    return countryCode
        .toUpperCase()
        .split('')
        .map(function (character) {
            // Convert A-Z to Unicode Regional Indicator Symbol codepoints (1F1E6-1F1FF)
            const codepoint = (0x1f1e6 + character.charCodeAt(0) - 0x41).toString(16);
            return codepoint;
        })
        .join('-');
}

// Component - Flag
export interface FlagProperties {
    className?: string;
    countryCode: string;
}
export function Flag(properties: FlagProperties) {
    // Get country data by country code
    const country = getCountryByCode(properties.countryCode);
    
    // If no valid country found, return fallback
    if (!country) {
        return (
            <span className={mergeClassNames('inline-block text-2xl', properties.className)}>
                🌐
            </span>
        );
    }
    
    // Generate the flag filename
    const flagFilename = getCountryCodeToUnicodeFilename(properties.countryCode);
    
    // Dynamically import the flag SVG
    const FlagSvg = React.lazy(function () {
        return import(`./assets/flags/${flagFilename}.svg`).catch(function () {
            // If flag file doesn't exist, return a fallback
            return Promise.resolve({
                default: function () {
                    return (
                        <span className="inline-block text-2xl">
                            {country.emoji}
                        </span>
                    );
                }
            });
        });
    });
    
    // Render the component
    return (
        <React.Suspense 
            fallback={
                <span className={mergeClassNames('inline-block text-2xl', properties.className)}>
                    {country.emoji}
                </span>
            }
        >
            <FlagSvg className={mergeClassNames('inline-block w-6 h-4', properties.className)} />
        </React.Suspense>
    );
}
