// Dependencies - React
import React from 'react';

// Dependencies - Main Components
import { Link } from '@structure/source/common/navigation/Link';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';
import { getCountryByName } from '@structure/source/utilities/geo/Countries';

// Dependencies - Icons
import { Flag } from '@project/source/common/icons/flags/Flag';

// Component - AnimatedListItemBadge
export interface AnimatedListItemBadgeProperties {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'host' | 'port' | 'region' | 'port-state-positive' | 'port-state-negative';
    href?: string;
    target?: '_blank' | '_self';
    rel?: string;
    onClick?: () => void;
}

export function AnimatedListItemBadge(properties: AnimatedListItemBadgeProperties) {
    // Base classes for all badges
    const baseClasses = 'mr-1.5 rounded-xl px-2.5 py-1 flex-shrink-0';

    // Variant-specific classes
    const variantClasses = {
        default: 'bg-background-quartary hover:bg-background-tertiary',
        host: 'bg-background-quartary hover:bg-background-tertiary',
        port: 'bg-background-quartary hover:bg-background-tertiary',
        region: 'bg-background-quartary hover:bg-background-tertiary',
        'port-state-positive': 'bg-green-500 text-white hover:bg-green-600',
        'port-state-negative': 'bg-red-500 text-white hover:bg-red-600',
    };

    // Merge all classes
    const finalClasses = mergeClassNames(
        baseClasses,
        variantClasses[properties.variant || 'default'],
        properties.className,
    );

    // For region badges, check if we can render with a flag
    const shouldRenderWithFlag = properties.variant === 'region' && typeof properties.children === 'string';
    let content = properties.children;

    if(shouldRenderWithFlag) {
        const countryName = properties.children as string;
        const country = getCountryByName(countryName);

        if(country) {
            content = (
                <div className="flex items-center gap-1">
                    <Flag countryCode={country.code} />
                    <span>{countryName}</span>
                </div>
            );
        }
    }

    // If href is provided, render as Link
    if(properties.href) {
        return (
            <Link
                href={properties.href}
                target={properties.target || '_blank'}
                rel={properties.rel || 'noreferrer'}
                className={finalClasses}
            >
                {content}
            </Link>
        );
    }

    // If onClick is provided, render as button
    if(properties.onClick) {
        return (
            <button
                className={mergeClassNames(finalClasses, 'cursor-pointer transition-colors')}
                onClick={properties.onClick}
            >
                {content}
            </button>
        );
    }

    // Otherwise render as span
    return <span className={finalClasses}>{content}</span>;
}
