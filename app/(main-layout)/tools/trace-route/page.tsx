// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Trace Route',
    };
}

// Page - Trace Route
export { TraceRoutePage as default } from '@project/app/(main-layout)/tools/trace-route/TraceRoutePage';
