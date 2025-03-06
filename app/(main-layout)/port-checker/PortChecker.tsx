'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { PortCheckForm } from '@project/app/(main-layout)/port-checker/PortCheckForm';
import { CommonPorts } from '@project/app/(main-layout)/port-checker/CommonPorts';
import { YourPublicIpAddress } from '@project/app/(main-layout)/port-checker/YourPublicIpAddress';
import { PortCheckStatusAnimatedList, PortCheckStatusItem } from './PortCheckStatusAnimatedList';
import { About } from '@project/app/(main-layout)/port-checker/About';

// Dependencies - Hooks
import { useWebSocket } from '@structure/source/api/web-sockets/hooks/useWebSocket';

// Dependencies - API
import { useApolloClient } from '@apollo/client';
import { PortScanResult, PortState } from '@project/source/modules/connected/types/PortTypes';
import { PortCheckerService } from '@project/source/modules/connected/services/port-checker/PortCheckerService';

// Dependencies - Utilities
import { getRegionMetadata } from '@project/source/modules/connected/utilities/GridUtilities';
import { isIpV4Address, isPrivateIpAddress } from '@structure/source/utilities/network/IpAddress';

// Component - PortChecker
export interface PortCheckerInterface {
    publicIpAddress?: string;
}
export function PortChecker(properties: PortCheckerInterface) {
    // State
    const [checkingPort, setCheckingPort] = React.useState<boolean>(false);
    const [statusItems, setStatusItems] = React.useState<PortCheckStatusItem[]>([]);

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

    // Function to handle port scan results
    function handlePortScanResult(result: PortScanResult): void {
        let resultMessage: string;

        // Handle system errors and timeouts differently from actual port states
        if(result.systemError) {
            if(result.errorMessage) {
                // Check for specific error types
                if(result.errorMessage.includes('Failed to resolve host')) {
                    resultMessage = `Failed to resolve host: The hostname could not be found.`;
                }
                else {
                    // Show other specific error messages from the server
                    resultMessage = `Error: ${result.errorMessage}`;
                }
            }
            else {
                resultMessage = `Our system is down and our engineers have been notified.`;
            }
        }
        else if(result.timeout) {
            resultMessage = `The request timed out. Please try again.`;
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
            host: result.host,
            port: typeof result.port === 'string' ? parseInt(result.port, 10) : result.port,
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

        // Finish the port checking
        setCheckingPort(false);
    }

    // Function to initialize port checker service
    function initializePortCheckerService(): PortCheckerService {
        if(!portCheckerServiceReference.current) {
            portCheckerServiceReference.current = new PortCheckerService({
                apolloClient,
                webSocket,
                // Handle intermediate status updates to show progress
                onStatusUpdate: (update) => {
                    // Process status update

                    // If we get specific error status updates, immediately show them in the UI
                    if(update.type === 'error' && update.isFinal && update.message) {
                        // Special handling for host resolution errors
                        if(
                            update.message.includes('Failed to resolve host') ||
                            update.message.includes('hostname could not be found')
                        ) {
                            // Handle host resolution error status update

                            // We'll let the onResult handler show the final result
                            // This is just a backup in case onResult doesn't get called
                            if(statusItems.length === 1 && statusItems[0] && statusItems[0].isLoading) {
                                setStatusItems([
                                    {
                                        text: 'Failed to resolve host: The hostname could not be found.',
                                        state: 'unknown' as PortState,
                                        isLoading: false,
                                        systemError: true,
                                        errorMessage: 'Failed to resolve host.',
                                    },
                                ]);
                                setCheckingPort(false);
                            }
                        }
                    }
                },
                // Handle port scan results
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
            // Check if the address is a private IP address
            if(isIpV4Address(remoteAddress) && isPrivateIpAddress(remoteAddress)) {
                // Handle private IP address - show message in animated list
                setStatusItems([
                    {
                        text: `${remoteAddress} is a private IP address.`,
                        state: 'unknown' as PortState,
                        isLoading: false,
                        systemError: true,
                        errorMessage: 'Private IP Address',
                        host: remoteAddress,
                        port: remotePort,
                    },
                ]);
                setCheckingPort(false);
                return;
            }

            // Special handling for invalid domain names to provide immediate feedback
            // This is a simple client-side check before sending to the server
            if(
                !remoteAddress.match(/^[a-zA-Z0-9][-a-zA-Z0-9.]{0,253}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/) &&
                !remoteAddress.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)
            ) {
                const domainPattern = /^[a-zA-Z0-9][-a-zA-Z0-9.]{0,253}[a-zA-Z0-9](\.[a-zA-Z]{2,})+$/;
                const ipPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;

                // This is not a valid domain name or IP pattern - provide immediate feedback
                if(!domainPattern.test(remoteAddress) && !ipPattern.test(remoteAddress)) {
                    // Invalid hostname detected, show user-friendly error

                    // Only show this if it's likely to fail host resolution
                    if(!remoteAddress.includes('.')) {
                        setStatusItems([
                            {
                                text: 'Failed to resolve host: The hostname could not be found.',
                                state: 'unknown' as PortState,
                                isLoading: false,
                                systemError: true,
                                errorMessage: 'Failed to resolve host.',
                                host: remoteAddress,
                                port: remotePort,
                            },
                        ]);
                        setCheckingPort(false);
                        return;
                    }
                }
            }

            // Get region metadata for the display name
            const regionMetadata = getRegionMetadata(regionIdentifier);

            // Set initial message
            const initialMessage = `Checking port ${remotePort} on ${remoteAddress} from ${regionMetadata.emoji} ${regionMetadata.displayName}...`;

            setStatusItems([
                {
                    text: initialMessage,
                    state: 'unknown' as PortState,
                    isLoading: true,
                    host: remoteAddress,
                    port: remotePort,
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

            // Check if this might be a host resolution issue
            const isHostResolutionIssue = error instanceof Error && error.message.toLowerCase().includes('resolve');

            setStatusItems([
                {
                    text: isHostResolutionIssue
                        ? 'Failed to resolve host: The hostname could not be found.'
                        : 'Failed to start port check. Our service encountered an internal error.',
                    state: 'unknown' as PortState,
                    isLoading: false,
                    systemError: true,
                    errorMessage: isHostResolutionIssue ? 'Failed to resolve host.' : undefined,
                    host: remoteAddress,
                    port: remotePort,
                },
            ]);
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

                <PortCheckStatusAnimatedList portCheckStatusItems={statusItems} />

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
