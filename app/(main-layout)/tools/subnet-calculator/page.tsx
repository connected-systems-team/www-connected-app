// Dependencies - Next.js
import { Metadata } from 'next';

// Metadata
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Subnet Calculator',
    };
}

// Page - Subnet Calculator
export { SubnetCalculatorPage as default } from '@project/app/(main-layout)/tools/subnet-calculator/SubnetCalculatorPage';