// Dependencies - API
import { RegionMetadata } from '@project/source/modules/connected/types/GridTypes';

// Function to get region metadata from a region identifier
export function getRegionMetadata(regionIdentifier: string): RegionMetadata {
    let emoji = '🌐';
    let displayName = 'Unknown';

    switch(regionIdentifier) {
        case 'north-america':
            emoji = '🇺🇸';
            displayName = 'North America';
            break;
        case 'europe':
            emoji = '🇪🇺';
            displayName = 'Europe';
            break;
        case 'asia':
            emoji = '🇸🇬';
            displayName = 'Asia';
            break;
        case 'australia':
            emoji = '🇦🇺';
            displayName = 'Australia';
            break;
        case 'south-america':
            emoji = '🇧🇷';
            displayName = 'South America';
            break;
        case 'africa':
            emoji = '🇿🇦';
            displayName = 'Africa';
            break;
        case 'antarctica':
            emoji = '🇦🇶';
            displayName = 'Antarctica';
            break;
        case 'world':
            emoji = '🌍';
            displayName = 'World';
            break;
        default:
            emoji = '🌐';
            displayName = regionIdentifier ? regionIdentifier : 'Unknown';
    }

    return {
        identifier: regionIdentifier,
        displayName,
        emoji,
    };
}
