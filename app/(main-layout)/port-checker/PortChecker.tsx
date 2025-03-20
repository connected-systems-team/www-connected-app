'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { PortCheckForm } from '@project/app/(main-layout)/port-checker/PortCheckForm';
import { CommonPorts } from '@project/app/(main-layout)/port-checker/CommonPorts';
import { YourPublicIpAddress } from '@project/app/(main-layout)/port-checker/YourPublicIpAddress';
import {
    PortCheckStatusItem,
    PortCheckStatusAnimatedList,
} from '@project/app/(main-layout)/port-checker/PortCheckStatusAnimatedList';
import { About } from '@project/app/(main-layout)/port-checker/About';

// Dependencies - Hooks
import { useWebSocketViaSharedWorker } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - API
import { PortCheckStatusAdapter } from '@project/app/(main-layout)/port-checker/adapters/PortCheckStatusAdapter';

// Component - PortChecker
export interface PortCheckerInterface {
    publicIpAddress?: string;
}
export function PortChecker(properties: PortCheckerInterface) {
    // State
    const [isCheckingPort, setIsCheckingPort] = React.useState<boolean>(false);
    const [portCheckStatusItems, setPortCheckStatusItems] = React.useState<PortCheckStatusItem[]>([]);

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
    function handlePortCheckStatusItem(portCheckStatusItem: PortCheckStatusItem): void {
        // Add the status item to the end of the list
        setPortCheckStatusItems(function (previousPortCheckStatusItems) {
            return [...previousPortCheckStatusItems, portCheckStatusItem];
        });

        // If this is a final status (not loading), update the checking state
        if(!portCheckStatusItem.isLoading) {
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

        // Start the scan - all validation is handled inside the flow service
        if(portCheckStatusAdapterReference.current) {
            await portCheckStatusAdapterReference.current.checkPort(remoteAddress, remotePort, regionIdentifier);
        }
    }

    // Initialize and cleanup port check status adapter
    React.useEffect(
        function () {
            // Initialize the adapter on mount
            portCheckStatusAdapterReference.current = new PortCheckStatusAdapter(
                webSocketViaSharedWorker,
                handlePortCheckStatusItem,
            );

            // On unmount, dispose of the adapter
            return function () {
                if(portCheckStatusAdapterReference.current) {
                    portCheckStatusAdapterReference.current.dispose();
                    portCheckStatusAdapterReference.current = null;
                }
            };
        },
        [webSocketViaSharedWorker],
    );

    // Render the component
    return (
        <div className="flex flex-col md:flex-row">
            <div>
                <YourPublicIpAddress publicIpAddress={properties.publicIpAddress ?? ''} />

                <PortCheckForm
                    publicIpAddress={properties.publicIpAddress ?? ''}
                    remoteAddressFormInputReference={portCheckFormRemoteAddressFormInputReference}
                    remotePortFormInputReference={portCheckFormRemotePortFormInputReference}
                    regionFormInputReference={portCheckFormRegionFormInputReference}
                    buttonReference={portCheckFormSubmitButtonReference}
                    checkingPort={isCheckingPort}
                    checkPort={checkPort}
                />

                <PortCheckStatusAnimatedList portCheckStatusItems={portCheckStatusItems} />

                <About />
            </div>

            <CommonPorts
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

// Export - Default
export default PortChecker;
