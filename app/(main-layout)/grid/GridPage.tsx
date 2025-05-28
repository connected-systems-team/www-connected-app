'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { PlaceholderAnimation } from '@structure/source/common/animations/PlaceholderAnimation';

// Dependencies - API
import { useQuery } from '@apollo/client';
import { GridRegionLevelsDocument, GridRegionLevel } from '@project/app/_api/graphql/GraphQlGeneratedCode';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import { getCountryByName } from '@structure/source/utilities/geo/Countries';

// Dependencies - Icons
import { Flag } from '@project/app/_assets/icons/flags/Flag';

// Dependencies - Assets
import CheckCircledGreenBorderIcon from '@project/app/_assets/icons/status/CheckCircledGreenBorderIcon.svg';

// Component - GridPage
export interface GridPageProperties {
    className?: string;
}
export function GridPage(properties: GridPageProperties) {
    // Hooks
    const gridRegionLevelsQueryState = useQuery(GridRegionLevelsDocument, {
        variables: {
            input: {
                level: GridRegionLevel.Site,
            },
        },
    });

    const regions = gridRegionLevelsQueryState.data?.gridRegionLevels || [];

    // Render the component
    return (
        <div className={mergeClassNames('container pt-12', properties.className)}>
            <div className="flex items-center justify-between">
                <h1 className="">The Grid</h1>
            </div>
            <div className="mt-4 max-w-screen-md text-sm text-foreground-secondary">
                <p>
                    Our distributed computing infrastructure, a global network of servers and nodes that execute tasks
                    across different cloud providers and regions. A digital frontier where computational tasks get
                    distributed and executed across the network.
                </p>
            </div>

            <hr className="my-6" />

            {/* Grid List */}
            <div className="flex flex-col gap-4">
                {gridRegionLevelsQueryState.loading && (
                    <>
                        <PlaceholderAnimation />
                        <PlaceholderAnimation />
                        <PlaceholderAnimation />
                    </>
                )}

                {!gridRegionLevelsQueryState.loading && !gridRegionLevelsQueryState.error && (
                    <>
                        {[...regions]
                            .sort(function (a, b) {
                                return (a.country || '').localeCompare(b.country || '');
                            })
                            .map(function (gridRegionLevel) {
                                const country = getCountryByName(gridRegionLevel.country || '');

                                return (
                                    <div
                                        key={gridRegionLevel.region}
                                        className={mergeClassNames('rounded-lg border p-4')}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-5">
                                                <Flag
                                                    countryCode={country?.code || ''}
                                                    className="mt-1 h-12 w-8 flex-shrink-0"
                                                />
                                                <div className="flex flex-col">
                                                    <div className="text-lg font-medium">{gridRegionLevel.country}</div>
                                                    <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-foreground-secondary md:grid-cols-2">
                                                        {gridRegionLevel.region && (
                                                            <div>
                                                                <span className="font-medium">Region:</span>{' '}
                                                                {gridRegionLevel.region}
                                                            </div>
                                                        )}
                                                        {gridRegionLevel.division && (
                                                            <div>
                                                                <span className="font-medium">Division:</span>{' '}
                                                                {gridRegionLevel.division}
                                                            </div>
                                                        )}
                                                        {gridRegionLevel.locality && (
                                                            <div>
                                                                <span className="font-medium">Locality:</span>{' '}
                                                                {gridRegionLevel.locality}
                                                            </div>
                                                        )}
                                                        {gridRegionLevel.site && (
                                                            <div>
                                                                <span className="font-medium">Site:</span>{' '}
                                                                {gridRegionLevel.site}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <CheckCircledGreenBorderIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                                                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                                                    Online
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        {/* Empty state */}
                        {regions.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <p className="text-foreground-secondary">No regions available at this time.</p>
                            </div>
                        )}
                    </>
                )}

                {gridRegionLevelsQueryState.error && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <p className="text-foreground-secondary">Unable to load grid regions at this time.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
