// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { AnimatedList } from '@project/source/common/animations/AnimatedList';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
import { Button } from '@structure/source/common/buttons/Button';
import { PortStateDialog } from '@project/app/(main-layout)/port-checker/dialogs/PortStateDialog';

// Dependencies - Hooks
import { useTheme } from '@structure/source/theme/ThemeProvider';

// Dependencies - Types
import { PortState } from '@project/source/modules/connected/types/PortTypes';

// Dependencies - Assets
import ErrorCircledIcon from '@structure/assets/icons/status/ErrorCircledIcon.svg';
import CheckCircledIcon from '@structure/assets/icons/status/CheckCircledIcon.svg';
import CheckCircledGreenBorderIcon from '@project/assets/icons/status/CheckCircledGreenBorderIcon.svg';
import ErrorCircledRedBorderIcon from '@project/assets/icons/status/ErrorCircledRedBorderIcon.svg';
import InformationCircledIcon from '@structure/assets/icons/status/InformationCircledIcon.svg';

// Component - PortCheckStatusAnimatedList
export interface PortCheckStatusAnimatedListInterface {
    portCheckStatusTextArray: string[];
}
export function PortCheckStatusAnimatedList(properties: PortCheckStatusAnimatedListInterface) {
    // Hooks
    const { themeClassName } = useTheme();

    // State for dialog
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
    const [currentPortState, setCurrentPortState] = React.useState<PortState>('open');

    // Function to determine the port state from the status text
    function getPortStateFromText(text: string): PortState {
        if(text.includes('open|filtered')) return 'open|filtered';
        if(text.includes('closed|filtered')) return 'closed|filtered';
        if(text.includes('filtered')) return 'filtered';
        if(text.includes('unfiltered')) return 'unfiltered';
        if(text.includes('closed')) return 'closed';
        if(text.includes('open')) return 'open';
        return 'unknown';
    }

    // Function to open port state info dialog
    function openPortStateDialog(portState: PortState) {
        setCurrentPortState(portState);
        setIsDialogOpen(true);
    }

    // Function to clean port status text
    function cleanPortStatusText(text: string): string {
        // Remove the explanation in parentheses
        return text.replace(/\s*\([^)]*\)/g, '');
    }

    // Render the component
    return (
        <>
            <AnimatedList
                className="ml-[8px] mt-4"
                items={properties.portCheckStatusTextArray.map(function (text) {
                    const isFinal = text.includes('open') || text.includes('filtered') || text.includes('closed');

                    // Clean the text for display by removing explanations in parentheses
                    const displayText = isFinal ? cleanPortStatusText(text) : text;

                    // Determine the port state for this text
                    const portState = getPortStateFromText(text);

                    let content;

                    // Allow users to copy the last text and show info button for final results
                    if(isFinal) {
                        content = (
                            <>
                                <span>{displayText}</span>{' '}
                                <Button
                                    className="inline-flex h-auto p-0"
                                    variant="unstyled"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        openPortStateDialog(portState);
                                    }}
                                >
                                    <InformationCircledIcon className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-0.5 ml-0.5 inline-block h-3.5 w-3.5" />
                                </Button>{' '}
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
                    else {
                        content = <span>{displayText}</span>;
                    }

                    return {
                        content: content,
                        isFinal: isFinal,
                        finalDiscIcon:
                            text.includes('closed') || text.includes('filtered')
                                ? themeClassName == 'light'
                                    ? ErrorCircledRedBorderIcon
                                    : ErrorCircledIcon
                                : themeClassName == 'light'
                                  ? CheckCircledGreenBorderIcon
                                  : CheckCircledIcon,
                        finalDiscClassName:
                            text.includes('closed') || text.includes('filtered') ? 'bg-red-500' : undefined,
                    };
                })}
            />

            {/* Port state information dialog */}
            <PortStateDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} portState={currentPortState} />
        </>
    );
}

// Export - Default
export default PortCheckStatusAnimatedList;
