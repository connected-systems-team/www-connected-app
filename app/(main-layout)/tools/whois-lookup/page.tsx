// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'WHOIS Lookup',
    };
}

// Page - WHOIS Lookup
export { WhoisLookupPage as default } from '@project/app/(main-layout)/tools/whois-lookup/WhoisLookupPage';
