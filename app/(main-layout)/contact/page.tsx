// Dependencies - Main Components
import { ContactPage } from '@structure/source/modules/support/pages/contact/ContactPage';

// Next.js Metadata
export async function generateMetadata() {
    return {
        title: 'Contact',
    };
}

// Export - Default
export default function Page() {
    return <ContactPage />;
}
