// Dependencies - React
import React from 'react';

// Dependencies - Main Components
import { CopyButton } from '@structure/source/common/buttons/CopyButton';

// Dependencies - Components
import { ToolResultAnimatedList } from '@project/app/(main-layout)/tools/_components/ToolResultAnimatedList';

// Dependencies - Types
import {
    SslTlsCheckerResultItemInterface,
    SslTlsCheckerResultsAnimatedListProperties,
} from '@project/app/(main-layout)/tools/ssl-tls-checker/_types/SslTlsCheckerTypes';

// Component - SslTlsCheckerResultsAnimatedList
export function SslTlsCheckerResultsAnimatedList(properties: SslTlsCheckerResultsAnimatedListProperties) {
    // Function to determine if a result item represents a negative state
    function isNegativeState(item: SslTlsCheckerResultItemInterface): boolean {
        return !item.isSuccess || !!item.errorCode;
    }

    // Function to render final actions for completed SSL/TLS checks
    function renderFinalActions(item: SslTlsCheckerResultItemInterface, displayText: string): React.ReactNode {
        if(!item.isFinal || !displayText) {
            return null;
        }

        const actions = [];

        // Copy certificate details button
        actions.push(
            <CopyButton
                key="copy-details"
                value={displayText}
                notice={{
                    title: 'Copied to Clipboard',
                    content: 'Certificate details copied',
                }}
            />,
        );

        // Copy subject alternative names (if available)
        if(item.subjectAltNames?.length) {
            actions.push(
                <CopyButton
                    key="copy-alt-names"
                    value={item.subjectAltNames.join(', ')}
                    notice={{
                        title: 'Copied to Clipboard',
                        content: 'Alternative names copied',
                    }}
                >
                    Copy Alt Names
                </CopyButton>,
            );
        }

        return <div className="flex flex-wrap gap-2">{actions}</div>;
    }

    // Render the component
    return (
        <ToolResultAnimatedList<SslTlsCheckerResultItemInterface>
            resultItems={properties.resultItems}
            renderFinalActions={renderFinalActions}
            isNegativeState={isNegativeState}
        />
    );
}
