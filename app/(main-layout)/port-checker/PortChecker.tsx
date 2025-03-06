'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { PortCheckForm } from '@project/app/(main-layout)/port-checker/PortCheckForm';
import { CommonPorts } from '@project/app/(main-layout)/port-checker/CommonPorts';
import { YourPublicIpAddress } from '@project/app/(main-layout)/port-checker/YourPublicIpAddress';
import { PortCheckStatusAnimatedList } from './PortCheckStatusAnimatedList';
import { About } from '@project/app/(main-layout)/port-checker/About';

// Dependencies - Hooks
import { useWebSocket } from '@structure/source/api/web-sockets/hooks/useWebSocket';

// Dependencies - API
import { useApolloClient } from '@apollo/client';
import { PortScanStatusUpdate, PortScanResult } from '@project/source/modules/connected/types/PortTypes';
import { PortCheckerService } from '@project/source/modules/connected/services/port-checker/PortCheckerService';

// Dependencies - Utilities
import { getRegionMetadata } from '@project/source/modules/connected/utilities/GridUtilities';

// Component - PortChecker
export interface PortCheckerInterface {
    publicIpAddress?: string;
}
export function PortChecker(properties: PortCheckerInterface) {
    // State
    const [checkingPort, setCheckingPort] = React.useState<boolean>(false);
    const [statusUpdates, setStatusUpdates] = React.useState<string[]>([]);

    // Hooks
    const webSocket = useWebSocket();
    const apolloClient = useApolloClient();

    // References - Port Check Form
    const portCheckFormSubmitButtonReference = React.useRef<ButtonElementType>(null);
    const portCheckFormRemoteAddressFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRemotePortFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRegionFormInputReference = React.useRef<FormInputReferenceInterface>(null);

    // References - Port Checker Service
    const portCheckerServiceReference = React.useRef<PortCheckerService | null>(null);

    // Function to handle status updates
    function handleStatusUpdate(update: PortScanStatusUpdate): void {
        const regionMetadata = update.region ? getRegionMetadata(update.region) : null;
        const prefix = regionMetadata ? `Server ${regionMetadata.emoji} reports: ` : '';

        setStatusUpdates((previousStatusUpdates) => [...previousStatusUpdates, `${prefix}${update.message}`]);
    }

    // Function to handle port scan results
    function handlePortScanResult(result: PortScanResult): void {
        const stateDescription = PortCheckerService.getPortStateDescription(result.state);

        setStatusUpdates((previousStatusUpdates) => [
            ...previousStatusUpdates,
            `Port ${result.port} is ${stateDescription} on ${result.host}.`,
        ]);

        // Finish the port checking
        setCheckingPort(false);
    }

    // Function to initialize port checker service
    function initializePortCheckerService(): PortCheckerService {
        if(!portCheckerServiceReference.current) {
            portCheckerServiceReference.current = new PortCheckerService({
                apolloClient,
                webSocket,
                onStatusUpdate: handleStatusUpdate,
                onResult: handlePortScanResult,
            });
        }
        return portCheckerServiceReference.current;
    }

    // Function to check the port
    async function checkPort(remoteAddress: string, remotePort: number, regionIdentifier: string = 'north-america') {
        // Reset status updates
        setStatusUpdates([]);

        // Set checking state
        setCheckingPort(true);

        // Get port checker service and start port checking
        const portCheckerService = initializePortCheckerService();

        try {
            await portCheckerService.checkPort({
                host: remoteAddress,
                port: remotePort,
                region: regionIdentifier,
            });
        }
        catch(error) {
            console.error('Error starting port check:', error);
            setStatusUpdates((previousStatusUpdates) => [...previousStatusUpdates, 'Failed to start port check.']);
            setCheckingPort(false);
        }
    }

    // Cleanup on component unmount
    React.useEffect(function () {
        return function () {
            if(portCheckerServiceReference.current) {
                portCheckerServiceReference.current.dispose();
                portCheckerServiceReference.current = null;
            }
        };
    }, []);

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
                    checkingPort={checkingPort}
                    checkPort={checkPort}
                />

                <PortCheckStatusAnimatedList portCheckStatusTextArray={statusUpdates} />

                <About />
            </div>

            <CommonPorts
                portSelected={function (port) {
                    // Set the port in the form input
                    portCheckFormRemotePortFormInputReference.current?.setValue(port.toString());

                    // Immediately check the port if not already checking
                    if(!checkingPort) {
                        portCheckFormSubmitButtonReference.current?.click();
                    }
                }}
            />
        </div>
    );
}

// Export - Default
export default PortChecker;
