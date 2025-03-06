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

// Interface for status item with associated port state
export interface PortCheckStatusItem {
    text: string;
    state: PortState;
    isLoading?: boolean;
    systemError?: boolean;
    timeout?: boolean;
    errorMessage?: string;
}

// Component - PortCheckStatusAnimatedList
export interface PortCheckStatusAnimatedListInterface {
    portCheckStatusItems: PortCheckStatusItem[];
}
export function PortCheckStatusAnimatedList(properties: PortCheckStatusAnimatedListInterface) {
    // Hooks
    const { themeClassName } = useTheme();

    // State for dialog
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
    const [currentPortState, setCurrentPortState] = React.useState<PortState>('open');
    const [isSystemError, setIsSystemError] = React.useState<boolean>(false);
    const [isTimeout, setIsTimeout] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);

    // Function to open port state info dialog
    function openPortStateDialog(portState: PortState, systemError?: boolean, timeout?: boolean, errorMsg?: string) {
        setCurrentPortState(portState);
        setIsSystemError(!!systemError);
        setIsTimeout(!!timeout);
        setErrorMessage(errorMsg);
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
                items={properties.portCheckStatusItems.map(function (item) {
                    const isFinal =
                        !item.isLoading &&
                        (item.state === 'open' ||
                            item.state === 'closed' ||
                            item.state === 'filtered' ||
                            item.state === 'unfiltered' ||
                            item.state === 'open|filtered' ||
                            item.state === 'closed|filtered' ||
                            item.state === 'unknown');

                    // Clean the text for display by removing explanations in parentheses
                    const displayText = isFinal ? cleanPortStatusText(item.text) : item.text;

                    let content;

                    // Allow users to copy the last text and show info button for final results
                    if(isFinal) {
                        content = (
                            <div className="flex items-center space-x-1.5">
                                <span>{displayText}</span>{' '}
                                <Button
                                    className="inline-flex h-auto p-0"
                                    variant="unstyled"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        openPortStateDialog(
                                            item.state,
                                            item.systemError,
                                            item.timeout,
                                            item.errorMessage,
                                        );
                                    }}
                                >
                                    <InformationCircledIcon className="h-3.5 w-3.5" />
                                </Button>
                                {!item.systemError && !item.timeout && (
                                    <CopyButton
                                        iconClassName="h-3.5 w-3.5"
                                        value={item.text}
                                        notice={{
                                            title: 'Copied to Clipboard',
                                            content: '"' + item.text + '"',
                                        }}
                                    />
                                )}
                            </div>
                        );
                    }
                    else {
                        content = <span>{displayText}</span>;
                    }

                    const isNegativeState =
                        item.state === 'closed' ||
                        item.state === 'filtered' ||
                        item.state === 'closed|filtered' ||
                        item.state === 'unknown';

                    return {
                        content: content,
                        isFinal: isFinal,
                        finalDiscIcon: isNegativeState
                            ? themeClassName == 'light'
                                ? ErrorCircledRedBorderIcon
                                : ErrorCircledIcon
                            : themeClassName == 'light'
                              ? CheckCircledGreenBorderIcon
                              : CheckCircledIcon,
                        finalDiscClassName: isNegativeState ? 'bg-red-500' : undefined,
                    };
                })}
            />

            {/* Port state information dialog */}
            <PortStateDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                portState={currentPortState}
                isSystemError={isSystemError}
                isTimeout={isTimeout}
                errorMessage={errorMessage}
            />
        </>
    );
}

// Export - Default
export default PortCheckStatusAnimatedList;
