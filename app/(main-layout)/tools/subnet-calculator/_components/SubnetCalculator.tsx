'use client'; // This component uses client-only features

// Dependencies - React
import React from 'react';

// Dependencies - Types
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { ToolContentPart } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';
import { SubnetCalculatorResultItemInterface } from '@project/app/(main-layout)/tools/subnet-calculator/_types/SubnetCalculatorTypes';

// Dependencies - Components
import { SubnetCalculatorForm } from '@project/app/(main-layout)/tools/subnet-calculator/_components/SubnetCalculatorForm';
import { SubnetCalculatorResultsAnimatedList } from '@project/app/(main-layout)/tools/subnet-calculator/_components/SubnetCalculatorResultsAnimatedList';

// Dependencies - Utilities
import { SubnetCalculationUtilities } from '@project/app/(main-layout)/tools/subnet-calculator/_utilities/SubnetCalculationUtilities';

// Component - SubnetCalculator
export function SubnetCalculator() {
    // State
    const [resultItems, setResultItems] = React.useState<SubnetCalculatorResultItemInterface[]>([]);

    // References
    const ipAddressReference = React.useRef<FormInputReferenceInterface>(null);
    const subnetMaskReference = React.useRef<FormInputReferenceInterface>(null);
    const debounceTimeoutReference = React.useRef<NodeJS.Timeout | null>(null);

    // Function to perform debounced subnet calculation
    function performSubnetCalculation(ipAddress: string, subnetMask: string): void {
        // Clear any existing timeout
        if(debounceTimeoutReference.current) {
            clearTimeout(debounceTimeoutReference.current);
        }

        // If either field is empty, clear results
        if(!ipAddress.trim() || !subnetMask.trim()) {
            setResultItems([]);
            return;
        }

        // Set up debounced calculation
        debounceTimeoutReference.current = setTimeout(function () {
            // Clear previous results
            setResultItems([]);

            // Show calculating state briefly for visual feedback
            const initialItem: SubnetCalculatorResultItemInterface = {
                content: [
                    {
                        type: 'text',
                        content: `Calculating subnet for ${ipAddress} with mask ${subnetMask}...`,
                    },
                ],
                text: `Calculating subnet for ${ipAddress} with mask ${subnetMask}...`,
                ipAddress,
                subnetMask,
                isFinal: false,
                isSuccess: false,
            };

            setResultItems([initialItem]);

            // Perform calculation with minimal delay for responsiveness
            setTimeout(function () {
            try {
                // Normalize subnet mask input
                const normalizedSubnetMask = SubnetCalculationUtilities.normalizeSubnetMask(subnetMask);

                // Perform the calculation
                const calculation = SubnetCalculationUtilities.calculateSubnet(ipAddress, normalizedSubnetMask);

                // Create simplified content for processing display
                const contentParts: ToolContentPart[] = [
                    {
                        type: 'badge',
                        variant: calculation.isValidNetwork ? 'result-positive' : 'result-negative',
                        content: calculation.isValidNetwork ? 'Valid Network' : 'Error',
                    },
                    {
                        type: 'text',
                        content: calculation.isValidNetwork 
                            ? ` Subnet calculated for ${calculation.inputIpAddress}${calculation.cidrNotation}`
                            : ` ${calculation.errorMessage || 'Invalid subnet configuration'}`,
                    },
                ];

                // Create display text for copying
                let displayText = '';
                if(calculation.isValidNetwork) {
                    displayText = `Subnet Calculation Results\n\nInput: ${calculation.inputIpAddress}${calculation.cidrNotation}\n\nNetwork Information:\nNetwork Address: ${calculation.networkAddress}\nBroadcast Address: ${calculation.broadcastAddress}\nSubnet Mask: ${calculation.subnetMask}\nWildcard Mask: ${calculation.wildcardMask}\nCIDR Notation: ${calculation.cidrNotation}\n\nHost Information:\nFirst Host: ${calculation.firstHostAddress}\nLast Host: ${calculation.lastHostAddress}\nTotal Hosts: ${calculation.totalHosts.toLocaleString()}\nUsable Hosts: ${calculation.usableHosts.toLocaleString()}\n\nClassification:\nNetwork Class: Class ${calculation.networkClass}${calculation.isPrivate ? '\nNetwork Type: Private' : ''}`;
                }
                else {
                    displayText = `Subnet Calculation Error\n\nInput: ${calculation.inputIpAddress} / ${calculation.inputSubnetMask}\nError: ${calculation.errorMessage || 'Unknown error occurred'}`;
                }

                // Create final result item
                const finalItem: SubnetCalculatorResultItemInterface = {
                    content: contentParts,
                    text: displayText,
                    ipAddress,
                    subnetMask: normalizedSubnetMask,
                    calculation,
                    isFinal: true,
                    isSuccess: calculation.isValidNetwork,
                };

                setResultItems([finalItem]);
            }
            catch(error) {
                // Handle unexpected errors
                const errorItem: SubnetCalculatorResultItemInterface = {
                    content: [
                        {
                            type: 'badge',
                            variant: 'result-negative',
                            content: 'Calculation Failed',
                        },
                        {
                            type: 'text',
                            content: `\n\nUnexpected error: ${
                                error instanceof Error ? error.message : 'Unknown error'
                            }`,
                        },
                    ],
                    text: `Subnet calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
                    ipAddress,
                    subnetMask,
                    isFinal: true,
                    isSuccess: false,
                };

                setResultItems([errorItem]);
            } finally {
                // No processing state needed since there's no button to disable
            }
            }, 100); // Brief delay for responsiveness
        }, 500); // 500ms debounce delay
    }

    // Cleanup timeout on unmount and initial calculation
    React.useEffect(function () {
        // Perform initial calculation with default values after a brief delay
        const initialTimeout = setTimeout(function () {
            performSubnetCalculation('192.168.1.100', '255.255.255.0');
        }, 100);

        return function () {
            if(debounceTimeoutReference.current) {
                clearTimeout(debounceTimeoutReference.current);
            }
            clearTimeout(initialTimeout);
        };
    }, []);

    // Render the component
    return (
        <div className="mt-6 flex flex-col gap-6">
            <SubnetCalculatorForm
                ipAddressReference={ipAddressReference}
                subnetMaskReference={subnetMaskReference}
                performSubnetCalculation={performSubnetCalculation}
            />
            <SubnetCalculatorResultsAnimatedList resultItems={resultItems} />
        </div>
    );
}
