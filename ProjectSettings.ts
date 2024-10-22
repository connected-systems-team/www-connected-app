// Dependencies - Project
import { StructureSettingsInterface } from './libraries/structure/StructureSettings';

// ProjectSettings
export const ProjectSettings: StructureSettingsInterface = {
    identifier: 'connected',
    title: 'Connected',
    ownerDisplayName: 'Connected',
    tagline: 'Network Monitoring and Security',
    description: "We are building the world's most advanced network monitoring platform.",
    url: 'https://www.connected.app/',
    apis: {
        base: {
            url: 'https://api.connected.app/graphql', // This needs to be an absolute url, as relative urls cannot be used in SSR
        },
    },
    modules: {
        accounts: true,
        engagement: true,
        support: true,
        posts: true,
        commerce: true,
    },
    theme: {
        defaultClassName: 'light',
    },
    assets: {
        url: 'https://assets.connected.app/',
        favicon: {
            light: {
                location: '/images/icons/favicons/favicon-light.png',
            },
            dark: {
                location: '/images/icons/favicons/favicon-dark.png',
            },
        },
        logo: {
            light: {
                location: '/images/logos/logo-light.png',
            },
            dark: {
                location: '/images/logos/logo-dark.png',
            },
            width: 180,
            height: 37,
        },
    },
    sourceCodeRepositories: {
        structure: {
            url: 'https://github.com/system-inc/structure-next/',
        },
        project: {
            url: 'https://github.com/connected-systems-team/www.connected.app/',
        },
    },
    platforms: {
        x: {
            title: 'X',
            url: 'https://x.com/connecteddotapp',
            type: 'social',
        },
    },
};

// Export - Default
export default ProjectSettings;
