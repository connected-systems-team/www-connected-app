/**
 * This API route serves the SharedWorker script as JavaScript, allowing it to be
 * consistently loaded by multiple browser tabs through a stable URL. This approach
 * solves several key problems:
 *
 * 1. URL Consistency: SharedWorkers are identified by their URL, and using a Blob URL
 *    would create different URLs for each tab, preventing proper sharing.
 *
 * 2. Code Organization: The worker script remains part of our library structure,
 *    rather than needing to be placed in the public directory.
 *
 * 3. Versioning & Updates: All tabs load the worker from this endpoint, ensuring
 *    they all use the same version.
 *
 * 4. No Build Step: We don't need special build configuration to copy files.
 *
 * 5. Improved Development: The worker code is stored as a regular JavaScript file
 *    with proper syntax highlighting and linting, then imported as a string.
 *
 * The route imports the worker script as a string from our library and serves it
 * with the proper Content-Type header for JavaScript, allowing browsers to execute it.
 */

// Dependencies - Next.js
import { NextResponse } from 'next/server';

// Dependencies - Worker Script
// @ts-expect-error - WebSocketSharedWorker is imported as a string by webpack
import WebSocketSharedWorker from '@structure/source/api/web-sockets/shared-workers/WebSocketSharedWorker.code.js';

/**
 * GET /api/web-sockets/shared-workers/web-socket-shared-worker.js
 *
 * Serves the SharedWorker script with the appropriate headers for browser execution.
 * This endpoint provides a consistent URL for the SharedWorker, ensuring that all
 * browser tabs share a single worker instance regardless of when they were opened.
 *
 * The key benefits of this approach are:
 * 1. Consistent worker URL ensures proper sharing across tabs
 * 2. Maintains the worker code as a proper JavaScript file in the library
 * 3. Easy to update without build steps or public directory files
 * 4. Proper cache control ensures all tabs get the latest worker code
 */
export async function GET() {
    return new NextResponse(WebSocketSharedWorker, {
        headers: {
            // Set Content-Type to application/javascript so browsers recognize it as executable JavaScript
            'Content-Type': 'application/javascript',

            // Cache control headers prevent browsers from caching old versions of the worker
            // This ensures all tabs always load the latest worker implementation
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: '0',
        },
    });
}
