// Dependencies - Next.js
import { Metadata } from 'next';

// Dependencies - Main Components
import { MainLayout } from '@project/app/(main-layout)/MainLayout';
import { NotFoundPage } from '@structure/source/pages/NotFoundPage';

// Next.js Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Not Found',
    };
}

// Component - Page
export default function Page() {
    // Render the component
    return (
        <MainLayout>
            <div className="container pb-32 pt-8">
                <NotFoundPage />
            </div>
        </MainLayout>
    );
}
