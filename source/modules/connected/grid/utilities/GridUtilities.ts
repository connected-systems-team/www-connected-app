// Function to get region metadata from a region identifier
export function getCountryEmoji(country?: string | null): string {
    switch(country) {
        case 'United States':
            return '🇺🇸';
        case 'Netherlands':
            return '🇳🇱';
        case 'Taiwan':
            return '🇹🇼';
        case 'Australia':
            return '🇦🇺';
        case 'Brazil':
            return '🇧🇷';
        case 'France':
            return '🇫🇷';
        case 'Israel':
            return '🇮🇱';
        case 'Japan':
            return '🇯🇵';
        case 'South Africa':
            return '🇿🇦';
        default:
            return '🌐';
    }
}
