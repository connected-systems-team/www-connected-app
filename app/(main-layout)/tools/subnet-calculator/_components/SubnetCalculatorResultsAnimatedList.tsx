// Dependencies - React
import React from 'react';

// Dependencies - Main Components
import { CopyButton } from '@structure/source/common/buttons/CopyButton';

// Dependencies - Components
import { ToolResultAnimatedList } from '@project/app/(main-layout)/tools/_components/ToolResultAnimatedList';

// Dependencies - Types
import {
    SubnetCalculatorResultItemInterface,
    SubnetCalculatorResultsAnimatedListProperties,
} from '@project/app/(main-layout)/tools/subnet-calculator/_types/SubnetCalculatorTypes';

// Component - SubnetCalculatorResultsAnimatedList
export function SubnetCalculatorResultsAnimatedList(properties: SubnetCalculatorResultsAnimatedListProperties) {
    // Function to determine if a result item represents a negative state
    function isNegativeState(item: SubnetCalculatorResultItemInterface): boolean {
        return !item.isSuccess || !!item.errorCode || (item.calculation ? !item.calculation.isValidNetwork : false);
    }

    // Function to render final actions for completed subnet calculations
    function renderFinalActions(item: SubnetCalculatorResultItemInterface, displayText: string): React.ReactNode {
        if(!item.isFinal || !displayText || !item.calculation) {
            return null;
        }

        const actions = [];
        const calculation = item.calculation;

        // Copy all details button
        actions.push(
            <CopyButton
                key="copy-details"
                value={displayText}
                notice={{
                    title: 'Copied to Clipboard',
                    content: 'Subnet details copied',
                }}
            />,
        );

        // Copy network address button
        if(calculation.networkAddress) {
            actions.push(
                <CopyButton
                    key="copy-network"
                    value={calculation.networkAddress}
                    notice={{
                        title: 'Copied to Clipboard',
                        content: 'Network address copied',
                    }}
                >
                    Copy Network
                </CopyButton>,
            );
        }

        // Copy CIDR notation button
        if(calculation.cidrNotation) {
            actions.push(
                <CopyButton
                    key="copy-cidr"
                    value={calculation.cidrNotation}
                    notice={{
                        title: 'Copied to Clipboard',
                        content: 'CIDR notation copied',
                    }}
                >
                    Copy CIDR
                </CopyButton>,
            );
        }

        // Copy host range button
        if(calculation.firstHostAddress && calculation.lastHostAddress) {
            const hostRange = `${calculation.firstHostAddress} - ${calculation.lastHostAddress}`;
            actions.push(
                <CopyButton
                    key="copy-range"
                    value={hostRange}
                    notice={{
                        title: 'Copied to Clipboard',
                        content: 'Host range copied',
                    }}
                >
                    Copy Range
                </CopyButton>,
            );
        }

        return <div className="flex flex-wrap gap-2">{actions}</div>;
    }

    // Render the component
    return (
        <ToolResultAnimatedList<SubnetCalculatorResultItemInterface>
            resultItems={properties.resultItems}
            renderFinalActions={renderFinalActions}
            isNegativeState={isNegativeState}
        />
    );
}
