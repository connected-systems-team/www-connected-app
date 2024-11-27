'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';
import { Metadata } from 'next';

// Dependencies - Main Components
import { AuthorizationLayout } from '@structure/source/layouts/AuthorizationLayout';
import { Button } from '@structure/source/common/buttons/Button';

// Dependencies - API
import { TaskHistoryDocument } from '@project/source/api/GraphQlGeneratedCode';
import { GraphQlQueryTable } from '@structure/source/common/tables/GraphQlQueryTable';

// Dependencies - Assets
import ArrowLeftIcon from '@structure/assets/icons/interface/ArrowLeftIcon.svg';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'History • Port Checker',
    };
}

// Component - HomePage
export function HomePage() {
    // Render the component
    return (
        <AuthorizationLayout>
            <div className="container pt-4">
                <Button
                    icon={ArrowLeftIcon}
                    iconPosition="left"
                    iconClassName="h-3 w-3"
                    variant="ghost"
                    href="/port-checker"
                >
                    Back to Port Checker
                </Button>

                <h1 className="mb-6 mt-4 text-2xl font-medium">Port Checker History</h1>

                <GraphQlQueryTable queryDocument={TaskHistoryDocument} />
            </div>
        </AuthorizationLayout>
    );
}

// Export - Default
export default HomePage;
