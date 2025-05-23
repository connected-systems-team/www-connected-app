// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'DNS Lookup',
    };
}

// Page - DNS Lookup
export { DnsLookupPage as default } from '@project/app/(main-layout)/tools/dns-lookup/DnsLookupPage';
