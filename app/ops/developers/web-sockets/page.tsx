// Dependencies - Next.js
import { Metadata } from 'next';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Web Sockets • Developers • Ops',
    };
}

// Shim the default export from Structure
export { WebSocketsPage as default } from '@structure/source/ops/pages/developers/web-sockets/WebSocketsPage';
