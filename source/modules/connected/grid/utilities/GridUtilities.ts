// Function to get region metadata from a region identifier
export function getCountryEmoji(country?: string | null): string {
    switch(country) {
        case 'United States':
            return '🇺🇸';
        case 'Netherlands':
            return '🇳🇱';
        case 'Taiwan':
            return '🇹🇼';
        default:
            return '🌐';
    }
}
