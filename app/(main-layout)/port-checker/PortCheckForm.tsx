// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
// import { Link } from '@structure/source/common/navigation/Link';
import { ButtonElementType, Button } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { FormInputText } from '@structure/source/common/forms/FormInputText';
import { FormInputSelect } from '@structure/source/common/forms/FormInputSelect';

// Dependencies - API
import { useQuery } from '@apollo/client';
import { GridRegionLevelsDocument, GridRegionLevel } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - Assets
import ArrowUpIcon from '@structure/assets/icons/interface/ArrowUpIcon.svg';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import { getCountryEmojiByCountryName, filterCountriesByCountryNames } from '@structure/source/utilities/geo/Countries';
import { getClosestAvailableCountryUsingCountryCode } from '@structure/source/utilities/geo/Geo';

// Component - PortCheckForm
export interface PortCheckFormInterface {
    className?: string;
    publicIpAddress: string;
    countryCode?: string;
    remoteAddressFormInputReference: React.RefObject<FormInputReferenceInterface>;
    remotePortFormInputReference: React.RefObject<FormInputReferenceInterface>;
    regionFormInputReference: React.RefObject<FormInputReferenceInterface>;
    buttonReference: React.RefObject<ButtonElementType>;
    checkingPort: boolean;
    checkPort: (remoteAddress: string, port: number, country: string) => void;
}
export function PortCheckForm(properties: PortCheckFormInterface) {
    // Hooks
    const gridRegionLevelsQueryState = useQuery(GridRegionLevelsDocument, {
        variables: {
            input: {
                level: GridRegionLevel.Country,
            },
        },
    });
    // console.log('gridRegionsQueryState', gridRegionsQueryState);

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
        // console.log('availableCountryNames', availableCountryNames);

        // Filter countries by the available country names
        const availableCountries = filterCountriesByCountryNames(availableCountryNames);
        // console.log('availableCountries', availableCountries);

        // Get the closest available country
        defaultCountry = getClosestAvailableCountryUsingCountryCode(availableCountries, countryCode, 'US').name;
        // console.log('defaultCountry', defaultCountry);

        return defaultCountry;
    }

    // Function to check the port
    function checkPort() {
        properties.checkPort(
            properties.remoteAddressFormInputReference.current?.getValue() || '',
            properties.remotePortFormInputReference.current?.getValue(),
            properties.regionFormInputReference.current?.getValue() || '',
        );
    }

    // Render the component
    return (
        <div className={mergeClassNames('flex flex-col md:flex-row', properties.className)}>
            {/* Remote Address */}
            <FormInputText
                ref={properties.remoteAddressFormInputReference}
                className="flex-grow md:mr-4"
                id="remoteAddress"
                label="IP Address or Domain"
                labelTip="This can either be a domain name or IP address."
                labelTipIconProperties={{
                    contentClassName: 'w-48',
                }}
                defaultValue={'google.com'}
                description={
                    <div
                        className="flex cursor-pointer select-none items-center space-x-1 hover:text-dark-2 active:text-dark dark:hover:text-light-2 dark:active:text-light"
                        onClick={function () {
                            properties.remoteAddressFormInputReference.current?.setValue(
                                properties.publicIpAddress ?? '',
                            );
                        }}
                    >
                        <div>
                            <ArrowUpIcon className="h-2.5 w-2.5" />
                        </div>
                        <div>Use Current IP</div>
                    </div>
                }
                selectOnFocus={true}
                onKeyDown={function (event) {
                    if(event.key === 'Enter' && !properties.checkingPort) {
                        checkPort();
                    }
                }}
            />

            <div className="flex">
                {/* Remote Port */}
                <FormInputText
                    ref={properties.remotePortFormInputReference}
                    className="mr-4 mt-4 w-full min-w-20 md:mt-0 md:w-20"
                    id="remotePort"
                    label="Port"
                    labelTip="This can be a number between 1 and 65,535."
                    labelTipIconProperties={{
                        contentClassName: 'w-48',
                    }}
                    defaultValue={'80'}
                    selectOnFocus={true}
                    onKeyDown={function (event) {
                        if(event.key === 'Enter' && !properties.checkingPort) {
                            checkPort();
                        }
                    }}
                />

                {/* Region */}
                <FormInputSelect
                    ref={properties.regionFormInputReference}
                    key={
                        gridRegionLevelsQueryState.data?.gridRegionLevels?.map((level) => level.region).join('-') ||
                        'loading-regions'
                    }
                    className="mt-4 w-full md:mr-4 md:mt-0 md:w-48"
                    id="region"
                    label="Check From"
                    labelTip="The region of the server used to check the port."
                    labelTipIconProperties={{
                        contentClassName: 'w-48',
                    }}
                    items={
                        gridRegionLevelsQueryState.data?.gridRegionLevels.map(function (gridRegionLevel) {
                            return {
                                value: gridRegionLevel.country!,
                                content:
                                    getCountryEmojiByCountryName(gridRegionLevel.country) +
                                    ' ' +
                                    gridRegionLevel.country,
                            };
                        }) || [
                            {
                                value: 'United States',
                                content: '🇺🇸 United States',
                            },
                        ]
                    }
                    placeholder="Loading regions..."
                    defaultValue={getDefaultCountry(
                        gridRegionLevelsQueryState.data?.gridRegionLevels,
                        properties.countryCode,
                    )}
                />
            </div>

            {/* Check Port Button */}
            <Button
                ref={properties.buttonReference}
                variant="primary"
                disabled={properties.checkingPort}
                processing={properties.checkingPort}
                className="mt-[30px] md:w-[107px]"
                onClick={checkPort}
            >
                Check Port
            </Button>
        </div>
    );
}

// Export - Default
export default PortCheckForm;
