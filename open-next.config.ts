// Dependencies - OpenNext
import type { OpenNextConfig as OpenNextConfigurationInterface } from '@opennextjs/aws/types/open-next.js';
import OpenNextCloudflareKvCache from '@opennextjs/cloudflare/kvCache';

// OpenNextConfiguration
// https://opennext.js.org/aws/config
// Although this is a Cloudflare adapter, the @opennextjs/cloudflare package is now closely tied to the @opennextjs/aws package.
// So, the configuration file documentation is found in the @opennextjs/aws package. (https://opennext.js.org/cloudflare/migrate-from-0.2)
const OpenNextConfiguration: OpenNextConfigurationInterface = {
    default: {
        override: {
            wrapper: 'cloudflare-node',
            converter: 'edge',
            // Set `incrementalCache` to "dummy" to disable KV cache
            incrementalCache: async () => OpenNextCloudflareKvCache,
            tagCache: 'dummy',
            queue: 'dummy',
        },
    },

    // Necessary to keep our 'build' command as 'opennextjs-cloudflare'
    buildCommand: 'next build', // DEFAULT: '{packageManager} run build',

    middleware: {
        external: true,
        override: {
            wrapper: 'cloudflare-edge',
            converter: 'edge',
            proxyExternalRequest: 'fetch',
        },
    },
};

// Export - Default
export default OpenNextConfiguration;
