// Dependencies - Assets
import { Info } from '@phosphor-icons/react';

// Utilities - ToolFormInputProperties
export const ToolFormInputProperties = {
    // Common component class name for tools form inputs
    componentClassName: 'dark:bg-background-tertiary',

    // Common label tip icon properties for tools form inputs
    labelTipIconProperties: {
        contentClassName: 'w-48',
        icon: Info,
        iconProperties: {
            size: 16,
            weight: 'fill' as const,
        },
        iconClassName: 'text-foreground-secondary',
        className: 'p-[2px] ml-0.5',
    },
};
