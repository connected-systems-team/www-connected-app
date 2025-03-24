'use client'; // This file contains constants for AtlasEye theming

// Dependencies - Three.js
import * as Three from 'three';

// Dependencies - Theme
import { ThemeClassName } from '@structure/source/theme/ThemeTypes';

// Centralized color definitions - single source of truth
export const ATLAS_EYE_COLORS = {
    [ThemeClassName.Light]: {
        sphereColor: '#000000', // Pure black sphere
        lineColor: '#ffffff', // Pure white lines
    },
    [ThemeClassName.Dark]: {
        sphereColor: '#ffffff', // Pure white sphere
        lineColor: '#181818', // Dark gray color for lines
    },
};

// Helper function to get Three.js color based on theme class name
export function getAtlasEyeColors(themeClassName: ThemeClassName) {
    return {
        sphereColor: new Three.Color(ATLAS_EYE_COLORS[themeClassName].sphereColor),
        lineColor: new Three.Color(ATLAS_EYE_COLORS[themeClassName].lineColor),
    };
}
