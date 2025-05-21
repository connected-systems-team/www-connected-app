'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { Button } from '@structure/source/common/buttons/Button';
import { ExcludedAnimatedListItemProperties, AnimatedList } from '@project/source/common/animations/AnimatedList';
import ErrorCircledIcon from '@structure/assets/icons/status/ErrorCircledIcon.svg';

// Component - TestsPage
export function TestsPage() {
    // State
    const [visibleItems, setVisibleItems] = React.useState<ExcludedAnimatedListItemProperties[]>([]);

    const possibleItems = [
        {
            content: (
                <>
                    Item 1<br />
                    Line 2<br />
                    Line 4
                </>
            ),
        },
        // {
        //     content: 'Item 2',
        // },
        // {
        //     content: (
        //         <>
        //             Item 1<br />
        //             Line 2
        //         </>
        //     ),
        // },

        // {
        //     content: 'Item 2',
        // },

        // {
        //     content: 'Item 2',
        // },

        {
            content: 'Item 3',
            finalDiscIcon: ErrorCircledIcon,
            finalDiscClassName: 'bg-red-500',
            isFinal: false,
        },
    ];

    // Function to add next item to the visible items
    function addNextItem() {
        setVisibleItems(function (previousVisibleItems) {
            const nextVisibleItem = possibleItems[previousVisibleItems.length];

            if(nextVisibleItem !== undefined) {
                return [...previousVisibleItems, nextVisibleItem];
            }
            else {
                return previousVisibleItems;
            }
        });
    }

    // Render the component
    return (
        <div className="container pt-8">
            {/* <Button onClick={resetAnimation}>Reset</Button> */}
            <Button onClick={addNextItem}>Add Next Item</Button>

            <AnimatedList items={visibleItems} />
        </div>
    );
}

// Export - Default
export default TestsPage;
