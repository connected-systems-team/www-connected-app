// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import { PortStateType } from '@project/app/(main-layout)/tools/port-checker/_api/PortCheckStatusAdapter';
import { PortCheckStatusItemProperties } from '@project/app/(main-layout)/tools/port-checker/_types/PortCheckTypes';

// Dependencies - Main Components
import { ToolResultAnimatedList } from '@project/app/(main-layout)/tools/_components/ToolResultAnimatedList';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
import { Button } from '@structure/source/common/buttons/Button';
import { PortStateDialog } from '@project/app/(main-layout)/tools/port-checker/_dialogs/PortStateDialog';

// Dependencies - Assets
import InformationCircledIcon from '@structure/assets/icons/status/InformationCircledIcon.svg';

// Component - PortCheckStatusAnimatedList
export interface PortCheckStatusAnimatedListProperties {
    portCheckStatusItems: PortCheckStatusItemProperties[];
}
export function PortCheckStatusAnimatedList(properties: PortCheckStatusAnimatedListProperties) {
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

    // Function to determine if an item is in a negative state
    function isNegativeState(item: PortCheckStatusItemProperties): boolean {
        return (
            item.portState === PortStateType.Closed ||
            item.portState === PortStateType.Filtered ||
            item.portState === PortStateType.ClosedFiltered ||
            item.portState === PortStateType.Unknown ||
            !!item.errorCode
        );
    }

    // Function to render final actions (info button + copy button)
    function renderFinalActions(item: PortCheckStatusItemProperties, displayText: string): React.ReactNode {
        return (
            <>
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

    // Render the component
    return (
        <>
            <ToolResultAnimatedList<PortCheckStatusItemProperties>
                resultItems={properties.portCheckStatusItems}
                renderFinalActions={renderFinalActions}
                isNegativeState={isNegativeState}
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
