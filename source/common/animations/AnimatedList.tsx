'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { AnimatedListItemInterface, AnimatedListItem } from '@project/source/common/animations/AnimatedListItem';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Type - ExcludedAnimatedListItemInterface
export type ExcludedAnimatedListItemInterface = Pick<AnimatedListItemInterface, 'content' | 'isFinal'>;

// Component - AnimatedList
export interface AnimatedListInterface {
    className?: string;
    items?: ExcludedAnimatedListItemInterface[];
}
export function AnimatedList(properties: AnimatedListInterface) {
    // Render the component
    return (
        <div className={mergeClassNames('space-y-1', properties.className)}>
            {properties.items?.map(function (item, itemIndex) {
                const propertiesItemsLength = properties.items ? properties.items.length : 0;
                const isActive = itemIndex === propertiesItemsLength - 1;

                return (
                    <AnimatedListItem
                        key={itemIndex}
                        isFirst={itemIndex === 0}
                        isActive={isActive}
                        hasNextItem={itemIndex < propertiesItemsLength - 1}
                        {...item}
                    />
                );
            })}
        </div>
    );
}

// Export - Default
export default AnimatedList;
