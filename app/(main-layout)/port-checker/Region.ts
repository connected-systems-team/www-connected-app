// Dependencies - API
import { GridRegionsQuery } from '@project/source/api/GraphQlGeneratedCode';

// Type - Grid Region
export type GridRegion = GridRegionsQuery['gridRegions'][0];

// Function to get an emoji from a region identifier
export function getRegionEmojiUsingRegionIdentifier(regionIdentifier?: string) {
    switch(regionIdentifier) {
        case 'north-america':
            return '🇺🇸';
        case 'europe':
            return '🇪🇺';
        case 'asia':
            return '🇸🇬';
        case 'australia':
            return '🇦🇺';
        case 'south-america':
            return '🇧🇷';
        case 'africa':
            return '🇿🇦';
        case 'antarctica':
            return '🇦🇶';
        case 'world':
            return '🌍';
        default:
            return '🌐';
    }
}

// Function to get the region display name from a region identifier
export function getRegionDisplayName(regionName: string, gridRegions: GridRegion[]) {
    // Find the grid region
    const gridRegion = gridRegions.find(function (gridRegion) {
        return gridRegion.name === regionName;
    });

    return getRegionEmojiUsingRegionIdentifier(gridRegion?.name) + ' ' + (gridRegion?.displayName || 'Unknown');
}

// Function to convert an alphanumeric string (e.g., e98ba714) to a number
export function alphanumericStringToNumber(alphanumericString?: string) {
    if(alphanumericString) {
        let integer = parseInt(alphanumericString, 36);
        // Make the integer a number between 1 and 9999
        integer = integer % 10000;
        return integer;
    }
    else {
        return 'Unknown';
    }
}
