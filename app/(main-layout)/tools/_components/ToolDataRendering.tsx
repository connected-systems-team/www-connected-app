// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { AnimatedListItemBadge } from '@project/source/common/animations/AnimatedListItemBadge';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';

// Dependencies - Types
import { ToolContentBadgeVariant } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';

// Interface for data field rendering
export interface DataFieldProperties {
    label: string;
    value: string;
    variant?: ToolContentBadgeVariant;
    copyLabel?: string; // Custom label for copy notice
}

// Interface for data section rendering
export interface DataSectionProperties {
    title: string;
    fields: DataFieldProperties[];
    className?: string;
}

// Component - DataFieldRow
export interface DataFieldRowProperties {
    field: DataFieldProperties;
}
export function DataFieldRow(properties: DataFieldRowProperties) {
    const field = properties.field;
    const copyLabel = field.copyLabel || field.label;

    return (
        <div className="flex items-center justify-between text-xs">
            <div className="flex flex-wrap items-center gap-2">
                <span className="min-w-24 text-foreground-secondary">{field.label}:</span>
                <AnimatedListItemBadge variant={field.variant || 'default'}>{field.value}</AnimatedListItemBadge>
            </div>
            <CopyButton
                iconClassName="h-3 w-3"
                value={field.value}
                notice={{
                    title: 'Copied to Clipboard',
                    content: `${copyLabel}: ${field.value}`,
                }}
            />
        </div>
    );
}

// Component - DataSection
export function DataSection(properties: DataSectionProperties) {
    // Filter out empty values
    const filteredFields = properties.fields.filter(function (field) {
        return field.value && field.value.trim().length > 0 && field.value.trim() !== 'REDACTED FOR PRIVACY';
    });

    if(filteredFields.length === 0) {
        return null;
    }

    return (
        <div className={`space-y-2 ${properties.className || ''}`}>
            <div className="text-xs font-medium text-foreground-secondary">{properties.title}</div>
            {filteredFields.map(function (field, index) {
                return <DataFieldRow key={index} field={field} />;
            })}
        </div>
    );
}

// Component - DataListSection for arrays of values
export interface DataListSectionProperties {
    title: string;
    items: string[];
    variant?: ToolContentBadgeVariant;
    className?: string;
}
export function DataListSection(properties: DataListSectionProperties) {
    // Filter out empty values
    const filteredItems = properties.items.filter(function (item) {
        return item && item.trim().length > 0;
    });

    if(filteredItems.length === 0) {
        return null;
    }

    return (
        <div className={`space-y-2 ${properties.className || ''}`}>
            <div className="text-xs font-medium text-foreground-secondary">{properties.title}</div>
            {filteredItems.map(function (item, index) {
                return (
                    <div key={index} className="flex items-center justify-between text-xs">
                        <AnimatedListItemBadge variant={properties.variant || 'default'}>{item}</AnimatedListItemBadge>
                        <CopyButton
                            iconClassName="h-3 w-3"
                            value={item}
                            notice={{
                                title: 'Copied to Clipboard',
                                content: item,
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}

// Component - DataContainer for wrapping data sections with common styling
export interface DataContainerProperties {
    children: React.ReactNode;
    className?: string;
}
export function DataContainer(properties: DataContainerProperties) {
    return (
        <div className={`mt-3 space-y-4 rounded-lg bg-background-tertiary p-3 ${properties.className || ''}`}>
            {properties.children}
        </div>
    );
}

// Utility function to create data fields from an object
export function createDataFieldsFromObject(
    data: Record<string, unknown> | undefined | null,
    fieldMapping: Record<string, { label: string; variant?: ToolContentBadgeVariant }>,
): DataFieldProperties[] {
    const fields: DataFieldProperties[] = [];

    if(!data) {
        return fields;
    }

    for(const [key, config] of Object.entries(fieldMapping)) {
        const value = data[key];
        if(value) {
            fields.push({
                label: config.label,
                value: String(value),
                variant: config.variant || 'default',
            });
        }
    }

    return fields;
}
