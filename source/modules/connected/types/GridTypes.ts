// Dependencies - API
import { GridRegionsQuery } from '@project/source/api/GraphQlGeneratedCode';

// Type - Grid Region
export type GridRegion = GridRegionsQuery['gridRegions'][0];

// Type - Region Metadata
export interface RegionMetadata {
    identifier: string;
    displayName: string;
    emoji: string;
}
