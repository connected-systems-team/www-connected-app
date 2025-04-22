// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import { PortStateType } from '@project/app/(main-layout)/port-checker/adapters/PortCheckStatusAdapter';

// Dependencies - Main Components
import { Link } from '@structure/source/common/navigation/Link';
import { AnimatedList } from '@project/source/common/animations/AnimatedList';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
import { Button } from '@structure/source/common/buttons/Button';
import { PortStateDialog } from '@project/app/(main-layout)/port-checker/dialogs/PortStateDialog';

// Dependencies - Hooks
import { Theme } from '@structure/source/theme/ThemeTypes';
import { useTheme } from '@structure/source/theme/hooks/useTheme';

// Dependencies - Assets
import ErrorCircledIcon from '@structure/assets/icons/status/ErrorCircledIcon.svg';
import CheckCircledIcon from '@structure/assets/icons/status/CheckCircledIcon.svg';
import CheckCircledGreenBorderIcon from '@project/assets/icons/status/CheckCircledGreenBorderIcon.svg';
import ErrorCircledRedBorderIcon from '@project/assets/icons/status/ErrorCircledRedBorderIcon.svg';
import InformationCircledIcon from '@structure/assets/icons/status/InformationCircledIcon.svg';

// Interface for status item with associated port state
export interface PortCheckStatusItemInterface {
    portState: PortStateType;
    text: string;
    host?: string;
    port?: number;
    errorCode?: string; // Error code from PortCheckFlowServiceErrors or FlowServiceErrors
    isFinal?: boolean;
}

// Component - PortCheckStatusAnimatedList
export interface PortCheckStatusAnimatedListInterface {
    portCheckStatusItems: PortCheckStatusItemInterface[];
}
export function PortCheckStatusAnimatedList(properties: PortCheckStatusAnimatedListInterface) {
    // Hooks
    const { theme } = useTheme();

    // State for dialog
    const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);
    const [currentPortState, setCurrentPortState] = React.useState<PortStateType>(PortStateType.Open);
    const [currentErrorCode, setCurrentErrorCode] = React.useState<string | undefined>(undefined);

    // Function to open port state info dialog
    function openPortStateDialog(portState: PortStateType, errorCode?: string) {
        setCurrentPortState(portState);
        setCurrentErrorCode(errorCode);
        setIsDialogOpen(true);
    }

    // Function to render host link if applicable
    function renderHostLink(item: PortCheckStatusItemInterface, displayText: string): React.ReactNode {
        let content: React.ReactNode = displayText;

        // If the port is 80 or 443 and there is a host, render a link
        if((item.port == 80 || item.port == 443) && item.host && item.host.length > 0) {
            const url = item.port == 80 ? `http://${item.host}` : `https://${item.host}`;

            // Use a more precise approach to find host in the text - exact word boundary matching
            const hostIndex = displayText.indexOf(item.host);
            if(hostIndex !== -1) {
                // Only include the exact host (not any following characters)
                const textBeforeHost = displayText.substring(0, hostIndex);
                const textAfterHost = displayText.substring(hostIndex + item.host.length);

                content = (
                    <>
                        {textBeforeHost}
                        <Link href={url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                            {item.host}
                        </Link>
                        {textAfterHost}
                    </>
                );
            }
        }

        return content;
    }

    // Render the component
    return (
        <>
            <AnimatedList
                className="ml-[8px] mt-4"
                items={properties.portCheckStatusItems.map(function (item) {
                    // Clean the text for display by removing explanations in parentheses
                    const displayText = item.text;

                    let content;

                    // Allow users to copy the last text and show info button for final results
                    if(item.isFinal) {
                        content = (
                            <span>
                                <span>
                                    {renderHostLink(item, displayText)}{' '}
                                    <Button
                                        className="inline-flex h-auto p-0 text-neutral hover:text-dark dark:text-neutral+6 dark:hover:text-light"
                                        variant="unstyled"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                            openPortStateDialog(item.portState, item.errorCode);
                                        }}
                                    >
                                        <InformationCircledIcon className="h-3.5 w-3.5" />
                                    </Button>
                                    <CopyButton
                                        className="ml-1.5"
                                        iconClassName="h-3.5 w-3.5"
                                        value={displayText}
                                        notice={{
                                            title: 'Copied to Clipboard',
                                            content: '"' + displayText + '"',
                                        }}
                                    />
                                </span>
                            </span>
                        );
                    }
                    else {
                        // For all loading states, still try to render host link
                        content = <span>{renderHostLink(item, displayText)}</span>;
                    }

                    const isNegativeState =
                        item.portState === PortStateType.Closed ||
                        item.portState === PortStateType.Filtered ||
                        item.portState === PortStateType.ClosedFiltered ||
                        item.portState === PortStateType.Unknown ||
                        !!item.errorCode;

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

            {/* Port state information dialog */}
            <PortStateDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                portState={currentPortState}
                errorCode={currentErrorCode}
            />
        </>
    );
}

// Export - Default
export default PortCheckStatusAnimatedList;
