'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { PortCheckForm } from '@project/app/(main-layout)/tools/port-checker/_components/PortCheckForm';
import { CommonPorts } from '@project/app/(main-layout)/tools/port-checker/_components/CommonPorts';
import { PortCheckStatusAnimatedList } from '@project/app/(main-layout)/tools/port-checker/_components/PortCheckStatusAnimatedList';
import { PortCheckStatusItemProperties } from '@project/app/(main-layout)/tools/port-checker/_types/PortCheckTypes';

// Dependencies - Hooks
import { useWebSocketViaSharedWorker } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - API
import { PortCheckStatusAdapter } from '@project/app/(main-layout)/tools/port-checker/_api/PortCheckStatusAdapter';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - PortChecker
export interface PortCheckerProperties {
    className?: string;
    publicIpAddress?: string;
    countryCode?: string;
}
export function PortChecker(properties: PortCheckerProperties) {
    // State
    const [isCheckingPort, setIsCheckingPort] = React.useState<boolean>(false);
    const [portCheckStatusItems, setPortCheckStatusItems] = React.useState<PortCheckStatusItemProperties[]>([]);

    // Hooks
    const webSocketViaSharedWorker = useWebSocketViaSharedWorker();

    // References - Port Check Form
    const portCheckFormSubmitButtonReference = React.useRef<ButtonElementType>(null);
    const portCheckFormRemoteAddressFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRemotePortFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRegionFormInputReference = React.useRef<FormInputReferenceInterface>(null);

    // Reference - Port Check Status Adapter
    const portCheckStatusAdapterReference = React.useRef<PortCheckStatusAdapter | null>(null);

    // Function to handle port check status item (append to list)
    function handlePortCheckStatusItem(portCheckStatusItem: PortCheckStatusItemProperties): void {
        // Add the status item to the end of the list
        setPortCheckStatusItems(function (previousPortCheckStatusItems) {
            return [...previousPortCheckStatusItems, portCheckStatusItem];
        });

        // If this is a final status, update the checking state
        if(portCheckStatusItem.isFinal) {
            setIsCheckingPort(false);
        }
    }

    // Function to check the port
    async function checkPort(
        remoteAddress: string,
        remotePort: number,
        regionIdentifier: string = 'north-america',
    ): Promise<void> {
        // Reset status updates
        setPortCheckStatusItems([]);

        // Set checking state
        setIsCheckingPort(true);

        // Start the port check
        try {
            await portCheckStatusAdapterReference.current?.checkPort(remoteAddress, remotePort, regionIdentifier);
        }
        catch(error) {
            console.error('Port check error:', error);
        }
    }

    // On mount
    React.useEffect(
        function () {
            // Initialize the adapter if it doesn't exist
            if(!portCheckStatusAdapterReference.current) {
                portCheckStatusAdapterReference.current = new PortCheckStatusAdapter(
                    webSocketViaSharedWorker,
                    handlePortCheckStatusItem,
                );
            }

            // On unmount, do nothing
            return function () {};
        },
        [webSocketViaSharedWorker],
    );

    // Render the component
    return (
        <div className="mt-6 flex flex-col gap-6 md:flex-row">
            <div className="flex flex-grow flex-col gap-6">
                <PortCheckForm
                    className={mergeClassNames('', properties.className)}
                    publicIpAddress={properties.publicIpAddress ?? ''}
                    countryCode={properties.countryCode}
                    remoteAddressFormInputReference={portCheckFormRemoteAddressFormInputReference}
                    remotePortFormInputReference={portCheckFormRemotePortFormInputReference}
                    regionFormInputReference={portCheckFormRegionFormInputReference}
                    buttonReference={portCheckFormSubmitButtonReference}
                    checkingPort={isCheckingPort}
                    checkPort={checkPort}
                />

                <PortCheckStatusAnimatedList portCheckStatusItems={portCheckStatusItems} />
            </div>
            <CommonPorts
                className=""
                portSelected={function (port) {
                    // Set the port in the form input
                    portCheckFormRemotePortFormInputReference.current?.setValue(port.toString());

                    // Immediately check the port if not already checking
                    if(!isCheckingPort) {
                        portCheckFormSubmitButtonReference.current?.click();
                    }
                }}
            />
        </div>
    );
}
