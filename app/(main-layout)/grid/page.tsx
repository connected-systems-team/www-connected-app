// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'The Grid',
        description: 'Our global network of servers that execute tasks across different cloud providers and regions.',
    };
}

// Dependencies - App Components
import { GridPage } from './GridPage';

// Component - GridRoutePage
export function GridRoutePage() {
    // Render the component
    return <GridPage />;
}

// Export - Default
export default GridRoutePage;
