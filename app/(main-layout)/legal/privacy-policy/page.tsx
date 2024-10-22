// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Privacy Policy • Legal',
    };
}

// Page - Home
export { default } from '@project/app/(main-layout)/legal/privacy-policy/PrivacyPolicyPage';
