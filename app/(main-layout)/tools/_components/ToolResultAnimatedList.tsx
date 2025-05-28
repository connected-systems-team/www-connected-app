// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import { ToolResultItemBase } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';

// Dependencies - Main Components
import { AnimatedList } from '@project/app/_components/animations/AnimatedList';
import { AnimatedListItemBadge } from '@project/app/_components/animations/AnimatedListItemBadge';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';

// Dependencies - Hooks
import { Theme } from '@structure/source/theme/ThemeTypes';
import { useTheme } from '@structure/source/theme/hooks/useTheme';

// Dependencies - Assets
import ErrorCircledIcon from '@structure/assets/icons/status/ErrorCircledIcon.svg';
import CheckCircledIcon from '@structure/assets/icons/status/CheckCircledIcon.svg';
import CheckCircledGreenBorderIcon from '@project/app/_assets/icons/status/CheckCircledGreenBorderIcon.svg';
import ErrorCircledRedBorderIcon from '@project/app/_assets/icons/status/ErrorCircledRedBorderIcon.svg';

// Component - ToolResultAnimatedList
export interface ToolResultAnimatedListProperties<TResultItem extends ToolResultItemBase> {
    className?: string;
    resultItems: TResultItem[];
    isProcessing?: boolean;
    isNegativeState: (item: TResultItem) => boolean;
    renderContent?: (item: TResultItem) => React.ReactNode;
    renderFinalActions?: (item: TResultItem, displayText: string) => React.ReactNode;
    getItemKey?: (item: TResultItem, index: number) => string;
}
export function ToolResultAnimatedList<TResultItem extends ToolResultItemBase>(
    properties: ToolResultAnimatedListProperties<TResultItem>,
) {
    // Hooks
    const { theme } = useTheme();

    // Function to render structured content with fallback
    function renderStructuredContent(item: TResultItem): React.ReactNode {
        // If custom render function is provided, use it
        if(properties.renderContent) {
            return properties.renderContent(item);
        }

        // If we have structured content, use it
        if(item.content && item.content.length > 0) {
            return (
                <>
                    {item.content.map(function (part, partIndex) {
                        if(part.type === 'badge') {
                            return (
                                <div key={partIndex} className="flex min-h-[28px] items-center">
                                    <AnimatedListItemBadge variant={part.variant} href={part.href} target={part.target}>
                                        {part.content}
                                    </AnimatedListItemBadge>
                                </div>
                            );
                        }
                        else {
                            return (
                                <div key={partIndex} className="mr-1.5 flex min-h-[28px] flex-shrink items-center">
                                    {part.content}
                                </div>
                            );
                        }
                    })}
                </>
            );
        }

        // Fallback to legacy text rendering for backward compatibility
        const displayText = item.text || '';
        return <div className="mr-1.5 flex min-h-[28px] flex-shrink items-center">{displayText}</div>;
    }

    // Function to get display text for copy functionality
    function getDisplayText(item: TResultItem): string {
        return (
            item.text ||
            item.content
                ?.map(function (part) {
                    return part.content;
                })
                .join('') ||
            ''
        );
    }

    // Render the component
    return (
        <AnimatedList
            className={
                properties.className ||
                (properties.resultItems.length ? 'rounded-xl border bg-background-secondary px-5 py-4 text-sm' : '')
            }
            items={properties.resultItems.map(function (item) {
                const displayText = getDisplayText(item);
                let content: React.ReactNode;

                // Handle final results with actions
                if(item.isFinal) {
                    const finalActions = properties.renderFinalActions ? (
                        properties.renderFinalActions(item, displayText)
                    ) : (
                        <CopyButton
                            className="ml-1.5"
                            iconClassName="h-3.5 w-3.5"
                            value={displayText}
                            notice={{
                                title: 'Copied to Clipboard',
                                content: '"' + displayText + '"',
                            }}
                        />
                    );

                    content = (
                        <>
                            {renderStructuredContent(item)}
                            {finalActions}
                        </>
                    );
                }
                else {
                    // For all loading states, render the structured content
                    content = renderStructuredContent(item);
                }

                const isNegativeState = properties.isNegativeState(item);

                return {
                    content: content,
                    isFinal: item.isFinal,
                    finalDiscIcon: isNegativeState
                        ? theme == Theme.Light
                            ? ErrorCircledRedBorderIcon
                            : ErrorCircledIcon
                        : theme == Theme.Light
                          ? CheckCircledGreenBorderIcon
                          : CheckCircledIcon,
                    finalDiscClassName: isNegativeState ? 'bg-red-500' : undefined,
                };
            })}
        />
    );
}
