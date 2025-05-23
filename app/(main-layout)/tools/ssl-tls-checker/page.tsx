// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'SSL/TLS Checker',
    };
}

// Page - SSL/TLS Checker
export { SslTlsCheckerPage as default } from '@project/app/(main-layout)/tools/ssl-tls-checker/SslTlsCheckerPage';
