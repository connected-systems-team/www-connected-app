'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import { PortStateType } from '@project/app/(main-layout)/port-checker/adapters/PortCheckStatusAdapter';

// Dependencies - Main Components
import { Button } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { PortCheckForm } from '@project/app/(main-layout)/port-checker/PortCheckForm';
import {
    PortCheckStatusAnimatedList,
    PortCheckStatusItemInterface,
} from '@project/app/(main-layout)/port-checker/PortCheckStatusAnimatedList';
import { ButtonElementType } from '@structure/source/common/buttons/Button';

// Dependencies - Hooks
import { useWebSocketViaSharedWorker } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - API
import { PortCheckStatusAdapter } from '@project/app/(main-layout)/port-checker/adapters/PortCheckStatusAdapter';
import { PortCheckFlowExecutionInterface } from '@project/source/modules/connected/port-check/PortCheckFlowService';

// Test case interface
interface PortCheckerTestCase {
    host: string;
    port: number;
}

// Component - AutomatedPortChecker
export interface AutomatedPortCheckerInterface {
    testCase: PortCheckerTestCase;
    onTestComplete?: (result: PortCheckFlowExecutionInterface) => void;
    autoRun?: boolean;
}

export function AutomatedPortChecker(properties: AutomatedPortCheckerInterface) {
    // State
    const [checkingPort, setCheckingPort] = React.useState<boolean>(false);
    const [statusItems, setStatusItems] = React.useState<PortCheckStatusItemInterface[]>([]);

    // Hooks
    const webSocketViaSharedWorker = useWebSocketViaSharedWorker();

    // References - Port Check Form
    const portCheckFormSubmitButtonReference = React.useRef<ButtonElementType>(null);
    const portCheckFormRemoteAddressFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRemotePortFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const portCheckFormRegionFormInputReference = React.useRef<FormInputReferenceInterface>(null);

    // References - Port Checker Adapter
    const portCheckerAdapterReference = React.useRef<PortCheckStatusAdapter | null>(null);

    // Function to handle port check status updates
    function handlePortCheckStatusUpdate(status: PortCheckStatusItemInterface): void {
        // Create a function to update the status items with the proper return type
        function updateStatusItems(previousItems: PortCheckStatusItemInterface[]): PortCheckStatusItemInterface[] {
            // If we have previous items and the new status is final
            if(previousItems.length > 0 && status.isFinal) {
                // Check if this exact message already exists
                const messageExists = previousItems.some((item) => item.text === status.text);
                if(messageExists) {
                    return previousItems;
                }

                // Get the first item (we already checked that length > 0, so it exists)
                const firstItem = previousItems[0];

                // Extra safety check for TypeScript - make sure it's not undefined
                if(firstItem) {
                    return [firstItem, status];
                }

                // Fallback in case there's somehow an undefined item
                return [status];
            }

            // If no previous items or not a final status, just return the new status
            return [status];
        }

        // Update the status items
        setStatusItems(updateStatusItems);

        // If this is a final status item, finish the port checking
        if(status.isFinal) {
            // Get the port scan execution flow result for the callback
            if(properties.onTestComplete && portCheckerAdapterReference.current) {
                // Since the adapter doesn't directly expose the flow execution result, we are passing the status item
                // which contains most of the important information about the port check
                const result = {
                    output: {
                        status: status.systemError ? 'error' : 'success',
                        port: {
                            number: status.port || -1,
                            state: status.portState.toLowerCase(),
                        },
                        hostIpAddress: status.host,
                        error: status.errorMessage ? { message: status.errorMessage } : undefined,
                    },
                } as PortCheckFlowExecutionInterface;

                properties.onTestComplete(result);
            }

            // Finish the port checking
            setCheckingPort(false);
        }
    }

    // Function to initialize port checker adapter
    function initializePortCheckerAdapter(): PortCheckStatusAdapter {
        if(!portCheckerAdapterReference.current) {
            portCheckerAdapterReference.current = new PortCheckStatusAdapter(
                webSocketViaSharedWorker,
                handlePortCheckStatusUpdate,
            );
        }
        return portCheckerAdapterReference.current;
    }

    // Function to check the port
    async function checkPort(remoteAddress: string, remotePort: number, regionIdentifier: string = 'north-america') {
        // Reset status updates
        setStatusItems([]);

        // Set checking state
        setCheckingPort(true);

        // Get port checker adapter and start port checking
        const portCheckerAdapter = initializePortCheckerAdapter();

        try {
            await portCheckerAdapter.checkPort(remoteAddress, remotePort, regionIdentifier);
        }
        catch(error) {
            console.error('Error starting port check:', error);
            setStatusItems([
                {
                    text: 'Failed to start port check. Our service encountered an internal error.',
                    portState: PortStateType.Unknown,
                    isFinal: true,
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
            if(portCheckerAdapterReference.current) {
                portCheckerAdapterReference.current.dispose();
                portCheckerAdapterReference.current = null;
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
