// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Web Socket Tests',
    };
}

// Page - Home
export { default } from '@project/app/(main-layout)/tests/web-sockets/WebSocketTestPage';
