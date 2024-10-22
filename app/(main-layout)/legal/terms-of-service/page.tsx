// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Terms of Service • Legal',
    };
}

// Page - Home
export { default } from '@project/app/(main-layout)/legal/terms-of-service/TermsOfServicePage';
