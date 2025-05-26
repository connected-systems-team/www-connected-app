// Dependencies - React
import React from 'react';

// Dependencies - Main Components
import { CopyButton } from '@structure/source/common/buttons/CopyButton';

// Dependencies - Components
import { ToolResultAnimatedList } from '@project/app/(main-layout)/tools/_components/ToolResultAnimatedList';

// Dependencies - Types
import {
    SslTlsResultItemInterface,
    SslTlsResultsAnimatedListProperties,
} from '@project/app/(main-layout)/tools/ssl-tls-checker/_types/SslTlsTypes';

// Component - SslTlsResultsAnimatedList
export function SslTlsResultsAnimatedList(properties: SslTlsResultsAnimatedListProperties) {
    // Function to determine if a result item represents a negative state
    function isNegativeState(item: SslTlsResultItemInterface): boolean {
        return !item.isSuccess || !!item.errorCode || (item.validation ? !item.validation.isValid : false);
    }

    // Function to render final actions for completed SSL/TLS checks
    function renderFinalActions(item: SslTlsResultItemInterface, displayText: string): React.ReactNode {
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

        // Copy fingerprint button (if available)
        if(item.certificate?.fingerprint?.sha256) {
            actions.push(
                <CopyButton
                    key="copy-fingerprint"
                    value={item.certificate.fingerprint.sha256}
                    notice={{
                        title: 'Copied to Clipboard',
                        content: 'Fingerprint copied',
                    }}
                >
                    Copy Fingerprint
                </CopyButton>,
            );
        }

        // Copy serial number button (if available)
        if(item.certificate?.serialNumber) {
            actions.push(
                <CopyButton
                    key="copy-serial"
                    value={item.certificate.serialNumber}
                    notice={{
                        title: 'Copied to Clipboard',
                        content: 'Serial number copied',
                    }}
                >
                    Copy Serial
                </CopyButton>,
            );
        }

        return <div className="flex flex-wrap gap-2">{actions}</div>;
    }

    // Render the component
    return (
        <ToolResultAnimatedList<SslTlsResultItemInterface>
            resultItems={properties.resultItems}
            renderFinalActions={renderFinalActions}
            isNegativeState={isNegativeState}
        />
    );
}
