'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { Button } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { PortCheckForm } from '@project/app/(main-layout)/port-checker/PortCheckForm';
import {
    PortCheckStatusAnimatedList,
    PortCheckStatusItem,
} from '@project/app/(main-layout)/port-checker/PortCheckStatusAnimatedList';
import { ButtonElementType } from '@structure/source/common/buttons/Button';

// Dependencies - Hooks
import { useWebSocketViaSharedWorker } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - API
import { useApolloClient } from '@apollo/client';
import { PortScanResult, PortState } from '@project/source/modules/connected/types/PortTypes';
import { PortCheckerService } from '@project/source/modules/connected/services/port-checker/PortCheckerService';

// Dependencies - Utilities
import { getRegionMetadata } from '@project/source/modules/connected/utilities/GridUtilities';

// Test case interface
interface PortCheckerTestCase {
    host: string;
    port: number;
}

// Component - AutomatedPortChecker
export interface AutomatedPortCheckerInterface {
    testCase: PortCheckerTestCase;
    onTestComplete?: (result: PortScanResult) => void;
    autoRun?: boolean;
}

export function AutomatedPortChecker(properties: AutomatedPortCheckerInterface) {
    // State
    const [checkingPort, setCheckingPort] = React.useState<boolean>(false);
    const [statusItems, setStatusItems] = React.useState<PortCheckStatusItem[]>([]);

    // Hooks
    const webSocketViaSharedWorker = useWebSocketViaSharedWorker();
    const apolloClient = useApolloClient();

    // References - Port Check Form
    const portCheckFormSubmitButtonReference = React.useRef<ButtonElementType>(null);
    const portCheckFormRemoteAddressFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRemotePortFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRegionFormInputReference = React.useRef<FormInputReferenceInterface>(null);

    // References - Port Checker Service
    const portCheckerServiceReference = React.useRef<PortCheckerService | null>(null);

    // Function to handle port scan results
    function handlePortScanResult(result: PortScanResult): void {
        let resultMessage: string;

        // Handle system errors and timeouts differently from actual port states
        if(result.systemError) {
            if(result.errorMessage) {
                // Show the specific error message from the server
                resultMessage = `Error: ${result.errorMessage}`;
            }
            else {
                resultMessage = `Our system is down and our engineers have been notified.`;
            }
        }
        else if(result.timeout) {
            resultMessage = `The request to check port ${result.port} on ${result.host} timed out. Please try again later.`;
        }
        else {
            const stateDescription = PortCheckerService.getPortStateDescription(result.state);
            resultMessage = `Port ${result.port} is ${stateDescription} on ${result.host}.`;
        }

        // Create the new result item
        const resultItem: PortCheckStatusItem = {
            text: resultMessage,
            state: result.state,
            isLoading: false,
            systemError: result.systemError,
            timeout: result.timeout,
            errorMessage: result.errorMessage,
        };

        // Create a function to update the status items with the proper return type
        function updateStatusItems(previousItems: PortCheckStatusItem[]): PortCheckStatusItem[] {
            // If we have previous items
            if(previousItems.length > 0) {
                // Check if this exact message already exists
                const messageExists = previousItems.some((item) => item.text === resultMessage);
                if(messageExists) {
                    return previousItems;
                }

                // Get the first item (we already checked that length > 0, so it exists)
                const firstItem = previousItems[0];

                // Extra safety check for TypeScript - make sure it's not undefined
                if(firstItem) {
                    return [firstItem, resultItem];
                }

                // Fallback in case there's somehow an undefined item
                return [resultItem];
            }

            // If no previous items, return just the result
            return [resultItem];
        }

        // Update the status items
        setStatusItems(updateStatusItems);

        // Call the callback if provided
        if(properties.onTestComplete) {
            properties.onTestComplete(result);
        }

        // Finish the port checking
        setCheckingPort(false);
    }

    // Function to initialize port checker service
    function initializePortCheckerService(): PortCheckerService {
        if(!portCheckerServiceReference.current) {
            portCheckerServiceReference.current = new PortCheckerService({
                apolloClient,
                webSocketViaSharedWorker,
                // We don't need to do anything with intermediate status updates
                onResult: handlePortScanResult,
            });
        }
        return portCheckerServiceReference.current;
    }

    // Function to check the port
    async function checkPort(remoteAddress: string, remotePort: number, regionIdentifier: string = 'north-america') {
        // Reset status updates
        setStatusItems([]);

        // Set checking state
        setCheckingPort(true);

        // Get port checker service and start port checking
        const portCheckerService = initializePortCheckerService();

        try {
            // Get region metadata for the display name
            const regionMetadata = getRegionMetadata(regionIdentifier);

            // Set initial message
            const initialMessage = `Checking port ${remotePort} on ${remoteAddress} from ${regionMetadata.emoji} ${regionMetadata.displayName}...`;
            setStatusItems([
                {
                    text: initialMessage,
                    state: 'unknown' as PortState,
                    isLoading: true,
                },
            ]);

            await portCheckerService.checkPort({
                host: remoteAddress,
                port: remotePort,
                region: regionIdentifier,
            });
        }
        catch(error) {
            console.error('Error starting port check:', error);
            setStatusItems([
                {
                    text: 'Failed to start port check. Our service encountered an internal error.',
                    state: 'unknown' as PortState,
                    isLoading: false,
                    systemError: true,
                },
            ]);
            setCheckingPort(false);
        }
    }

    // Function to programmatically run the test
    function runTest() {
        if(checkingPort) return;

        // Set the form values
        if(portCheckFormRemoteAddressFormInputReference.current) {
            portCheckFormRemoteAddressFormInputReference.current.setValue(properties.testCase.host);
        }

        if(portCheckFormRemotePortFormInputReference.current) {
            portCheckFormRemotePortFormInputReference.current.setValue(properties.testCase.port.toString());
        }

        // Submit the form
        if(portCheckFormSubmitButtonReference.current) {
            portCheckFormSubmitButtonReference.current.click();
        }
    }

    // Run the test automatically if autoRun is true
    React.useEffect(() => {
        if(properties.autoRun) {
            const timer = setTimeout(() => {
                runTest();
            }, 500); // Short delay to ensure form is ready

            return () => clearTimeout(timer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [properties.testCase, properties.autoRun]);

    // Cleanup on component unmount
    React.useEffect(() => {
        return () => {
            if(portCheckerServiceReference.current) {
                portCheckerServiceReference.current.dispose();
                portCheckerServiceReference.current = null;
            }
        };
    }, []);

    // Render the component
    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center gap-4">
                <Button onClick={runTest} disabled={checkingPort} className="w-32">
                    {checkingPort ? 'Running...' : 'Run Test'}
                </Button>
                <div className="text-sm">
                    <div>
                        <span className="font-medium">Host:</span> {properties.testCase.host}
                    </div>
                    <div>
                        <span className="font-medium">Port:</span> {properties.testCase.port}
                    </div>
                </div>
            </div>

            <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                <PortCheckForm
                    publicIpAddress={''}
                    remoteAddressFormInputReference={portCheckFormRemoteAddressFormInputReference}
                    remotePortFormInputReference={portCheckFormRemotePortFormInputReference}
                    regionFormInputReference={portCheckFormRegionFormInputReference}
                    buttonReference={portCheckFormSubmitButtonReference}
                    checkingPort={checkingPort}
                    checkPort={checkPort}
                />

                <PortCheckStatusAnimatedList portCheckStatusItems={statusItems} />
            </div>
        </div>
    );
}

// Export - Default
export default AutomatedPortChecker;
