// Dependencies - Project
import { StructureSettingsInterface } from './libraries/structure/StructureSettings';

// Dependencies - Theme
import { Theme } from './libraries/structure/source/theme/ThemeTypes';

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
            host: 'api.connected.app',
            // host: 'api.kamsdev.workers.dev',
            graphQlPath: '/graphql',
            webSocketPath: '/web-socket/user/connect',
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
        defaultTheme: Theme.Dark,
    },
    assets: {
        url: 'https://assets.connected.app/',
        favicon: {
            light: {
                location: '/images/icons/favicon/favicon-light.png',
            },
            dark: {
                location: '/images/icons/favicon/favicon-dark.png',
            },
        },
        logo: {
            light: {
                location: '/images/logo/connected-logo-with-wordmark.svg',
            },
            dark: {
                location: '/images/logo/connected-logo-with-wordmark-inverted.svg',
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
    services: {
        google: {
            analytics: {
                id: 'G-4PQ84S8CMS',
            },
        },
    },
};
