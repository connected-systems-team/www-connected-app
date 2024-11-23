// Dependencies - React and Next.js
import React from 'react';
// import Link from 'next/link';

// Dependencies - Main Components
import { AnimatedList } from '@project/source/common/animations/AnimatedList';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';

// Dependencies - Hooks
import { useTheme } from '@structure/source/theme/ThemeProvider';

// Dependencies - Assets
import ErrorCircledIcon from '@structure/assets/icons/status/ErrorCircledIcon.svg';
import CheckCircledIcon from '@structure/assets/icons/status/CheckCircledIcon.svg';
import CheckCircledGreenBorderIcon from '@project/assets/icons/status/CheckCircledGreenBorderIcon.svg';
import ErrorCircledRedBorderIcon from '@project/assets/icons/status/ErrorCircledRedBorderIcon.svg';

// Component - PortCheckStatusAnimatedList
export interface PortCheckStatusAnimatedListInterface {
    portCheckStatusTextArray: string[];
}
export function PortCheckStatusAnimatedList(properties: PortCheckStatusAnimatedListInterface) {
    // Hooks
    const { themeClassName } = useTheme();

    // Render the component
    return (
        <AnimatedList
            className="ml-[8px] mt-4"
            items={properties.portCheckStatusTextArray.map(function (text) {
                const isFinal = text.includes('is open') || text.includes('is closed');

                let content = <span>{text}</span>;

                // Allow users to copy the last text
                if(isFinal) {
                    content = (
                        <>
                            <span>{text}</span>{' '}
                            <CopyButton
                                className="ml-1.5"
                                iconClassName="h-3.5 w-3.5"
                                value={text}
                                notice={{
                                    title: 'Copied to Clipboard',
                                    content: '"' + text + '"',
                                }}
                            />
                        </>
                    );
                }

                return {
                    content: content,
                    isFinal: isFinal,
                    finalDiscIcon: text.includes('is closed')
                        ? themeClassName == 'light'
                            ? ErrorCircledRedBorderIcon
                            : ErrorCircledIcon
                        : themeClassName == 'light'
                          ? CheckCircledGreenBorderIcon
                          : CheckCircledIcon,
                    finalDiscClassName: text.includes('is closed') ? 'bg-red-500' : undefined,
                };
            })}
        />
    );
}

// Export - Default
export default PortCheckStatusAnimatedList;
