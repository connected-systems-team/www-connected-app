// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { FormInputSelect } from '@structure/source/common/forms/FormInputSelect';

// Dependencies - API
import { useQuery } from '@apollo/client';
import { GridRegionLevelsDocument, GridRegionLevel } from '@project/app/_api/graphql/GraphQlGeneratedCode';

// Dependencies - Utilities
import { filterCountriesByCountryNames, getCountryByName } from '@structure/source/utilities/geo/Countries';
import { getClosestAvailableCountryUsingCountryCode } from '@structure/source/utilities/geo/Geo';

// Dependencies - Icons
import { Flag } from '@project/app/_assets/icons/flags/Flag';

// Component - RegionFormInputSelect
export interface RegionFormInputSelectProperties {
    className?: string;
    componentClassName?: string;
    id?: string;
    label?: string;
    labelTip?: string;
    labelTipIconProperties?: {
        contentClassName?: string;
    };
    placeholder?: string;
    countryCode?: string;
    formInputReference: React.RefObject<FormInputReferenceInterface>;
}
export function RegionFormInputSelect(properties: RegionFormInputSelectProperties) {
    // Hooks
    const gridRegionLevelsQueryState = useQuery(GridRegionLevelsDocument, {
        variables: {
            input: {
                level: GridRegionLevel.Country,
            },
        },
    });

    // Function to get the default country based on user's country code
    function getDefaultCountry(gridRegionLevels?: { country?: string | null }[], countryCode?: string): string {
        let defaultCountry = 'United States';

        if(!gridRegionLevels || gridRegionLevels.length === 0) {
            return defaultCountry;
        }

        // Get the available country names from the grid region levels
        const availableCountryNames = gridRegionLevels
            .map(function (level) {
                return level.country;
            })
            .filter(function (country): country is string {
                return !!country;
            });

        // Filter countries by the available country names
        const availableCountries = filterCountriesByCountryNames(availableCountryNames);

        // Get the closest available country
        defaultCountry = getClosestAvailableCountryUsingCountryCode(availableCountries, countryCode, 'US').name;

        return defaultCountry;
    }

    // Render the component
    return (
        <FormInputSelect
            ref={properties.formInputReference as React.Ref<FormInputReferenceInterface>}
            key={
                gridRegionLevelsQueryState.data?.gridRegionLevels?.map((level) => level.region).join('-') ||
                'loading-regions'
            }
            className={properties.className || 'w-full'}
            componentClassName={
                properties.componentClassName ||
                'dark:bg-background-tertiary dark:border-dark-4 dark:hover:bg-background-secondary'
            }
            id={properties.id || 'region'}
            label={properties.label || 'Region'}
            labelTip={properties.labelTip || 'The region of the server used for the operation.'}
            labelTipIconProperties={
                properties.labelTipIconProperties || {
                    contentClassName: 'w-48',
                }
            }
            items={
                gridRegionLevelsQueryState.data?.gridRegionLevels.map(function (gridRegionLevel) {
                    const country = getCountryByName(gridRegionLevel.country || '');
                    return {
                        value: gridRegionLevel.country!,
                        content: (
                            <div className="flex items-center gap-1">
                                <Flag countryCode={country?.code || ''} className="flex-shrink-0" />
                                <span>{gridRegionLevel.country}</span>
                            </div>
                        ),
                    };
                }) || [
                    {
                        value: 'United States',
                        content: (
                            <div className="flex items-center gap-1">
                                <Flag countryCode="US" className="flex-shrink-0" />
                                <span>United States</span>
                            </div>
                        ),
                    },
                ]
            }
            placeholder={properties.placeholder || 'Loading regions...'}
            defaultValue={getDefaultCountry(gridRegionLevelsQueryState.data?.gridRegionLevels, properties.countryCode)}
        />
    );
}
