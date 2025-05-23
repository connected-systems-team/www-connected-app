// Dependencies - Project
import { ProjectSettings } from '@project/ProjectSettings';

// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: {
            template: '%s • Network Tools • ' + ProjectSettings.title,
            default: 'Network Tools',
        },
    };
}

// Layout - Tools
export interface ToolsLayoutProperties {
    children: React.ReactNode;
}

export default function ToolsLayout(properties: ToolsLayoutProperties) {
    return properties.children;
}
