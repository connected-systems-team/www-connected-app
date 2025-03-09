// Dependencies - Project
// Have to use relative paths for tailwind.config.js
import ProjectSettings from './ProjectSettings';
import StructureTailwindConfiguration from './libraries/structure/source/theme/TailwindConfiguration';

// Dependencies - Theme
import type { Config as TailwindConfigurationInterface } from 'tailwindcss';
import { default as tailwindPlugin } from 'tailwindcss/plugin';
import { type PluginAPI as PluginInterface } from 'tailwindcss/types/config';

// Tailwind CSS configuration object - extends the structure configuration
export const TailwindConfiguration = {
    // Extend structure configuration
    ...StructureTailwindConfiguration,

    theme: {
        // Import the structure theme
        ...StructureTailwindConfiguration.theme,

        // Project-specific container settings
        container: {
            center: true,
            padding: {
                DEFAULT: '1.5rem',
            },
            screens: {
                DEFAULT: '100%',
                sm: '100%',
                lg: '980px',
                xl: '980px',
                '2xl': '980px',
            },
        },

        extend: {
            // Include structure theme extensions
            ...(StructureTailwindConfiguration.theme?.extend || {}),

            colors: {
                // Background colors
                background: {
                    DEFAULT: 'var(--background-primary)',
                    primary: 'var(--background-primary)',
                    'primary-subtle': 'var(--background-primary-subtle)',
                    secondary: 'var(--background-secondary)',
                    tertiary: 'var(--background-tertiary)',
                    quartary: 'var(--background-quartary)',
                    overlay: 'var(--background-overlay)',
                },

                // Foreground colors
                foreground: {
                    DEFAULT: 'var(--foreground-primary)',
                    primary: 'var(--foreground-primary)',
                    secondary: 'var(--foreground-secondary)',
                    tertiary: 'var(--foreground-tertiary)',
                    placeholder: 'var(--foreground-placeholder)',
                    disabled: 'var(--foreground-disabled)',
                },

                // Border colors
                border: {
                    DEFAULT: 'var(--border-primary)',
                    primary: 'var(--border-primary)',
                    secondary: 'var(--border-secondary)',
                    tertiary: 'var(--border-tertiary)',
                    contrast: 'var(--border-contrast)',
                },

                link: {
                    DEFAULT: 'var(--link-primary-default)',
                    hover: 'var(--link-primary-hover)',
                    pressed: 'var(--link-primary-pressed)',
                    secondary: {
                        DEFAULT: 'var(--link-secondary-default)',
                        hover: 'var(--link-secondary-hover)',
                        pressed: 'var(--link-secondary-pressed)',
                    },
                    muted: {
                        DEFAULT: 'var(--link-muted-default)',
                        hover: 'var(--link-muted-hover)',
                        pressed: 'var(--link-muted-pressed)',
                    },
                    blue: {
                        DEFAULT: 'var(--link-blue-default)',
                        hover: 'var(--link-blue-hover)',
                        pressed: 'var(--link-blue-pressed)',
                    },
                    contrast: {
                        DEFAULT: 'var(--link-primary-contrast-default)',
                        hover: 'var(--link-primary-contrast-hover)',
                        pressed: 'var(--link-primary-contrast-pressed)',
                        disabled: 'var(--link-primary-contrast-disabled)',
                    },
                    disabled: 'var(--link-primary-disabled)',
                },
                effects: {
                    shadow: {
                        DEFAULT: 'var(--effects-shadow-default)',
                        strong: 'var(--effects-shadow-strong)',
                        subtle: { dark: 'var(--effects-shadow-subtle-dark)' },
                        default: { dark: 'var(--effects-shadow-default-dark)' },
                    },
                },

                // Action colors
                action: {
                    primary: {
                        DEFAULT: 'var(--action-primary-default)',
                        hover: 'var(--action-primary-hover)',
                        pressed: 'var(--action-primary-pressed)',
                        contrast: {
                            DEFAULT: 'var(--action-primary-contrast-default)',
                            hover: 'var(--action-primary-contrast-hover)',
                            pressed: 'var(--action-primary-contrast-pressed)',
                        },
                    },
                    secondary: {
                        DEFAULT: 'var(--action-secondary-default)',
                        hover: 'var(--action-secondary-hover)',
                        pressed: 'var(--action-secondary-pressed)',
                    },
                    ghost: {
                        DEFAULT: 'var(--action-ghost-default)',
                        hover: 'var(--action-ghost-hover)',
                        pressed: 'var(--action-ghost-pressed)',
                    },
                    destructive: {
                        DEFAULT: 'var(--action-destructive-default)',
                        hover: 'var(--action-destructive-hover)',
                        pressed: 'var(--action-destructive-pressed)',
                    },
                    general: {
                        light: 'var(--action-general-light)',
                        dark: 'var(--action-general-dark)',
                        gray: 'var(--action-general-gray)',
                        disabled: 'var(--action-general-disabled)',
                        contrast: {
                            light: 'var(--action-general-contrast-light)',
                            dark: 'var(--action-general-contrast-dark)',
                        },
                    },
                },

                // Custom (non-generated)
                badge: {
                    success: {
                        foreground: 'var(--badge-success-foreground)',
                        background: 'var(--badge-success-background)',
                    },
                    danger: {
                        foreground: 'var(--badge-danger-foreground)',
                        background: 'var(--badge-danger-background)',
                    },
                    warning: {
                        foreground: 'var(--badge-warning-foreground)',
                        background: 'var(--badge-warning-background)',
                    },
                    info: {
                        foreground: 'var(--badge-info-foreground)',
                        background: 'var(--badge-info-background)',
                    },
                },

                // OLD COLORS -- Try not to use these (will be phased out)
                white: '#FFFFFF',
                light: '#FFFFFF',
                'light-1': '#F6F6F6',
                'light-2': '#EEEEEE',
                'light-3': '#E5E5E5',
                'light-4': '#DDDDDD',
                'light-5': '#D4D4D4',
                'light-6': '#CCCCCC',

                black: '#000000',
                'dark+6': '#000000',
                'dark+5': '#090909',
                'dark+4': '#0B0B0B',
                'dark+3': '#0D0D0D',
                'dark+2': '#0F0F0F',
                'dark+1': '#101010',
                dark: '#111111',
                'dark-1': '#191919',
                'dark-2': '#222222',
                'dark-3': '#2A2A2A',
                'dark-4': '#333333',
                'dark-5': '#3B3B3B',
                'dark-6': '#444444',

                'neutral-6': '#4C4C4C',
                'neutral-5': '#565656',
                'neutral-4': '#606060',
                'neutral-3': '#6A6A6A',
                'neutral-2': '#747474',
                'neutral-1': '#7E7E7E',
                neutral: '#888888',
                'neutral+1': '#929292',
                'neutral+2': '#9C9C9C',
                'neutral+3': '#A6A6A6',
                'neutral+4': '#B0B0B0',
                'neutral+5': '#BABAAB',
                'neutral+6': '#C4C4C4',

                blue: '#0171E3',

                theme: {
                    light: {
                        primary: {
                            DEFAULT: '#007AFF',
                            hover: '#0066d5',
                            active: '#3294ff',
                            disabled: '#888888',
                        },
                    },
                    dark: {
                        primary: {
                            DEFAULT: '#007AFF',
                            hover: '#3294ff',
                            active: '#0066d5',
                            disabled: '#747474',
                        },
                    },
                },
            },
            boxShadow: {
                // These need to be the whole string, can't reference a css variable for some reason.
                focus: '0 0 0 2px #007aff, 0 0 0 1px #ffffff',
                '01': '0 1px 2px 0 var(--effects-shadow-subtle-dark)', // use for inputs, fields, technical cards
                '02': '0 1px 4px 0 var(--effects-shadow-default)', // use it for: e-commerce cards, big elements
                '03': '0 1px 12px 0 var(--effects-shadow-default)', // use it for: e-commerce, big card hovers
                '04': '0 6px 16px 0 var(--effects-shadow-default-dark)', // use it for: dropdowns
                '05': '0 2px 12px 0 var(--effects-shadow-subtle-dark)', // use it for: modals
            },
            fontSize: {
                base: ['16px', '24px'],
                ss: '13px', // Semi-small
            },
            spacing: {
                // Phi spacing -- Golden ratio spacing up each step starting with 1.618rem (var(--phi))
                phi: 'var(--phi)',

                // Phi multiples
                'phi-base-0.5': 'calc(var(--phi) * 0.5)',
                'phi-base-0.75': 'calc(var(--phi) * 0.75)',
                'phi-base-1.5': 'calc(var(--phi) * 1.5)',
                'phi-base-2': 'calc(var(--phi) * 2)',
                'phi-base-2.5': 'calc(var(--phi) * 2.5)',
                'phi-base-3': 'calc(var(--phi) * 3)',
                'phi-base-3.5': 'calc(var(--phi) * 3.5)',
                'phi-base-4': 'calc(var(--phi) * 4)',
                'phi-base-4.5': 'calc(var(--phi) * 4.5)',
                'phi-base-5': 'calc(var(--phi) * 5)',
                'phi-base-5.5': 'calc(var(--phi) * 5.5)',
                'phi-base-6': 'calc(var(--phi) * 6)',
                'phi-base-6.5': 'calc(var(--phi) * 6.5)',
                'phi-base-7': 'calc(var(--phi) * 7)',
                'phi-base-7.5': 'calc(var(--phi) * 7.5)',
                'phi-base-8': 'calc(var(--phi) * 8)',
                'phi-base-8.5': 'calc(var(--phi) * 8.5)',
                'phi-base-9': 'calc(var(--phi) * 9)',
                'phi-base-9.5': 'calc(var(--phi) * 9.5)',
                'phi-base-10': 'calc(var(--phi) * 10)',

                // Phi steps
                'phi-2': 'calc(var(--phi) * 1.618)',
                'phi-3': 'calc(var(--phi) * pow(1.618, 2))',
                'phi-4': 'calc(var(--phi) * pow(1.618, 3))',
                'phi-5': 'calc(var(--phi) * pow(1.618, 4))',
                'phi-6': 'calc(var(--phi) * pow(1.618, 5))',
                'phi-7': 'calc(var(--phi) * pow(1.618, 6))',
                'phi-8': 'calc(var(--phi) * pow(1.618, 7))',
                'phi-9': 'calc(var(--phi) * pow(1.618, 8))',
                'phi-10': 'calc(var(--phi) * pow(1.618, 9))',
            },
            backgroundImage: {
                logoLight: 'url(' + ProjectSettings.assets.logo.light.location + ')',
                logoDark: 'url(' + ProjectSettings.assets.logo.dark.location + ')',
            },
            blur: {
                'gradient-bg': '150px',
            },
            borderRadius: {
                none: 'var(--border-radius-none)',
                'extra-small': 'var(--border-radius-extra-small)',
                small: 'var(--border-radius-small)',
                medium: 'var(--border-radius-medium)',
                large: 'var(--border-radius-large)',
                'extra-large': 'var(--border-radius-extra-large)',
                full: 'var(--border-radius-full)',
            },
            // Project-specific keyframes - merge with structure keyframes
            keyframes: {
                ...(StructureTailwindConfiguration.theme?.extend?.keyframes || {}),
                // Add project-specific keyframes
                blinkOnce: {
                    '0%': { opacity: '1' },
                    '50%': { opacity: '0.25' },
                    '100%': { opacity: '1' },
                },
                blink: {
                    '0%': {
                        opacity: '1',
                    },
                    '20%,50%': {
                        opacity: '0',
                    },
                    '70%,100%': {
                        opacity: '1',
                    },
                },
            },
            // Project-specific animations - merge with structure animations
            animation: {
                ...(StructureTailwindConfiguration.theme?.extend?.animation || {}),
                // Add project-specific animations
                blinkOnce: 'blinkOnce 500ms linear',
                blink: 'blink 1.3s ease-in-out infinite',
            },
        },
    },
    plugins: [
        // Include structure plugins
        ...(StructureTailwindConfiguration.plugins || []),

        // Project-specific typography plugin
        tailwindPlugin(function (plugin: PluginInterface) {
            plugin.addBase({
                // Typography settings for heading elements
                h1: {
                    fontSize: '2em',
                    fontWeight: plugin.theme('fontWeight.base'),
                    lineHeight: '1',
                },
                h2: {
                    fontSize: '1.75em',
                    fontWeight: plugin.theme('fontWeight.base'),
                    lineHeight: '1',
                },
                h3: {
                    fontSize: '1.35em',
                    fontWeight: plugin.theme('fontWeight.base'),
                    lineHeight: '1.25',
                },
                h4: {
                    fontSize: '1.2em',
                    fontWeight: plugin.theme('fontWeight.base'),
                    lineHeight: '1.25',
                },
                h5: {
                    fontSize: '1.1em',
                    fontWeight: plugin.theme('fontWeight.base'),
                    lineHeight: '1.25',
                },
                h6: {
                    fontSize: '1em',
                    fontWeight: plugin.theme('fontWeight.base'),
                    lineHeight: '1.25',
                },

                // Global element styles - moved from theme.css
                '*': {
                    borderColor: 'var(--border-primary)', // equivalent to @apply border-border
                },
                body: {
                    fontFeatureSettings: '"rlig" 1, "calt" 1',
                },
            });

            // Add link utilities with hover and active states
            // This preserves the exact class names like "link-blue" but defines them in Tailwind
            plugin.addUtilities({
                '.link-primary': {
                    color: 'var(--link-primary-default)',
                    '&:hover': {
                        color: 'var(--link-primary-hover)',
                    },
                    '&:active': {
                        color: 'var(--link-primary-pressed)',
                    },
                },
                '.link-secondary': {
                    color: 'var(--link-secondary-default)',
                    '&:hover': {
                        color: 'var(--link-secondary-hover)',
                    },
                    '&:active': {
                        color: 'var(--link-secondary-pressed)',
                    },
                },
                '.link-muted': {
                    color: 'var(--link-muted-default)',
                    '&:hover': {
                        color: 'var(--link-muted-hover)',
                    },
                    '&:active': {
                        color: 'var(--link-muted-pressed)',
                    },
                },
                '.link-contrast': {
                    color: 'var(--link-primary-contrast-default)',
                    '&:hover': {
                        color: 'var(--link-primary-contrast-hover)',
                    },
                    '&:active': {
                        color: 'var(--link-primary-contrast-pressed)',
                    },
                    '&.disabled': {
                        color: 'var(--link-primary-contrast-disabled)',
                    },
                },
                '.link-blue': {
                    color: 'var(--link-blue-default)',
                    '&:hover': {
                        color: 'var(--link-blue-hover)',
                    },
                    '&:active': {
                        color: 'var(--link-blue-pressed)',
                    },
                },
            });
        }),
    ],
} satisfies TailwindConfigurationInterface;

// Export - Default
export default TailwindConfiguration;
