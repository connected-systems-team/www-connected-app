// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import { PortStateType } from '@project/app/(main-layout)/tools/port-checker/_adapters/PortCheckStatusAdapter';
import { PortCheckStatusItemProperties } from '@project/app/(main-layout)/tools/port-checker/_types/PortCheckTypes';

// Dependencies - Main Components
import { AnimatedList } from '@project/source/common/animations/AnimatedList';
import { AnimatedListItemBadge } from '@project/source/common/animations/AnimatedListItemBadge';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
import { Button } from '@structure/source/common/buttons/Button';
import { PortStateDialog } from '@project/app/(main-layout)/tools/port-checker/_dialogs/PortStateDialog';

// Dependencies - Hooks
import { Theme } from '@structure/source/theme/ThemeTypes';
import { useTheme } from '@structure/source/theme/hooks/useTheme';

// Dependencies - Assets
import ErrorCircledIcon from '@structure/assets/icons/status/ErrorCircledIcon.svg';
import CheckCircledIcon from '@structure/assets/icons/status/CheckCircledIcon.svg';
import CheckCircledGreenBorderIcon from '@project/assets/icons/status/CheckCircledGreenBorderIcon.svg';
import ErrorCircledRedBorderIcon from '@project/assets/icons/status/ErrorCircledRedBorderIcon.svg';
import InformationCircledIcon from '@structure/assets/icons/status/InformationCircledIcon.svg';

// Component - PortCheckStatusAnimatedList
export interface PortCheckStatusAnimatedListProperties {
    portCheckStatusItems: PortCheckStatusItemProperties[];
}
export function PortCheckStatusAnimatedList(properties: PortCheckStatusAnimatedListProperties) {
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

    // Function to render structured content
    function renderContent(item: PortCheckStatusItemProperties): React.ReactNode {
        // If we have structured content, use it
        if(item.content && item.content.length > 0) {
            return (
                <>
                    {item.content.map(function (part, partIndex) {
                        if(part.type === 'badge') {
                            return (
                                <div key={partIndex} className="flex min-h-[28px] items-center">
                                    <AnimatedListItemBadge
                                        variant={part.variant}
                                        href={part.href}
                                        target={part.target}
                                    >
                                        {part.content}
                                    </AnimatedListItemBadge>
                                </div>
                            );
                        }
                        else {
                            return <div key={partIndex} className="mr-1.5 flex min-h-[28px] flex-shrink items-center">{part.content}</div>;
                        }
                    })}
                </>
            );
        }

        // Fallback to legacy text rendering for backward compatibility
        const displayText = item.text || '';
        let content: React.ReactNode = <div className="mr-1.5 flex min-h-[28px] flex-shrink items-center">{displayText}</div>;

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
                        <div className="mr-1.5 flex min-h-[28px] flex-shrink items-center">{textBeforeHost}</div>
                        <div className="flex min-h-[28px] items-center">
                            <AnimatedListItemBadge variant="host" href={url} target="_blank">
                                {item.host}
                            </AnimatedListItemBadge>
                        </div>
                        <div className="mr-1.5 flex min-h-[28px] flex-shrink items-center">{textAfterHost}</div>
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
                className={
                    properties.portCheckStatusItems.length
                        ? 'rounded-xl border bg-background-secondary px-5 py-4 text-sm'
                        : ''
                }
                items={properties.portCheckStatusItems.map(function (item) {
                    // Get the display text for copy functionality (fallback to legacy text or join content)
                    const displayText =
                        item.text ||
                        item.content
                            ?.map(function (part) {
                                return part.content;
                            })
                            .join('') ||
                        '';

                    let content;

                    // Allow users to copy the last text and show info button for final results
                    if(item.isFinal) {
                        content = (
                            <>
                                {renderContent(item)}{' '}
                                <Button
                                    className="ml-1 inline-flex h-auto p-0 text-neutral hover:text-dark dark:text-neutral+6 dark:hover:text-light"
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
                            </>
                        );
                    }
                    else {
                        // For all loading states, render the structured content
                        content = renderContent(item);
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
