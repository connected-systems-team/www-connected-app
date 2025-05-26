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
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [resultItems, setResultItems] = React.useState<SubnetCalculatorResultItemInterface[]>([]);

    // References
    const ipAddressReference = React.useRef<FormInputReferenceInterface>(null);
    const subnetMaskReference = React.useRef<FormInputReferenceInterface>(null);

    // Function to perform subnet calculation
    function performSubnetCalculation(ipAddress: string, subnetMask: string): void {
        // Clear previous results
        setResultItems([]);
        setIsProcessing(true);

        // Add initial processing state
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

        // Perform calculation (simulate brief delay for better UX)
        setTimeout(function () {
            try {
                // Normalize subnet mask input
                const normalizedSubnetMask = SubnetCalculationUtilities.normalizeSubnetMask(subnetMask);

                // Perform the calculation
                const calculation = SubnetCalculationUtilities.calculateSubnet(ipAddress, normalizedSubnetMask);

                // Create result content
                const contentParts: ToolContentPart[] = [];
                let displayText = '';

                if(calculation.isValidNetwork) {
                    // Success case
                    contentParts.push({
                        type: 'badge',
                        variant: 'result-positive',
                        content: 'Valid Network',
                    });

                    // Network Information
                    contentParts.push({
                        type: 'text',
                        content: '\n\nNetwork Information:',
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nNetwork Address: ',
                    });
                    contentParts.push({
                        type: 'badge',
                        variant: 'ip-address',
                        content: calculation.networkAddress,
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nBroadcast Address: ',
                    });
                    contentParts.push({
                        type: 'badge',
                        variant: 'ip-address',
                        content: calculation.broadcastAddress,
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nSubnet Mask: ',
                    });
                    contentParts.push({
                        type: 'text',
                        content: calculation.subnetMask,
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nWildcard Mask: ',
                    });
                    contentParts.push({
                        type: 'text',
                        content: calculation.wildcardMask,
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nCIDR Notation: ',
                    });
                    contentParts.push({
                        type: 'badge',
                        variant: 'default',
                        content: calculation.cidrNotation,
                    });

                    // Host Information
                    contentParts.push({
                        type: 'text',
                        content: '\n\nHost Information:',
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nFirst Host: ',
                    });
                    contentParts.push({
                        type: 'badge',
                        variant: 'ip-address',
                        content: calculation.firstHostAddress,
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nLast Host: ',
                    });
                    contentParts.push({
                        type: 'badge',
                        variant: 'ip-address',
                        content: calculation.lastHostAddress,
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nTotal Hosts: ',
                    });
                    contentParts.push({
                        type: 'badge',
                        variant: 'default',
                        content: calculation.totalHosts.toLocaleString(),
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nUsable Hosts: ',
                    });
                    contentParts.push({
                        type: 'badge',
                        variant: 'result-positive',
                        content: calculation.usableHosts.toLocaleString(),
                    });

                    // Network Classification
                    contentParts.push({
                        type: 'text',
                        content: '\n\nNetwork Classification:',
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nNetwork Class: ',
                    });
                    contentParts.push({
                        type: 'badge',
                        variant: 'default',
                        content: `Class ${calculation.networkClass}`,
                    });

                    if(calculation.isPrivate) {
                        contentParts.push({
                            type: 'text',
                            content: '\nNetwork Type: ',
                        });
                        contentParts.push({
                            type: 'badge',
                            variant: 'default',
                            content: 'Private',
                        });
                    }

                    // Binary Information
                    contentParts.push({
                        type: 'text',
                        content: '\n\nBinary Representation:',
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nNetwork (Binary): ',
                    });
                    contentParts.push({
                        type: 'text',
                        content: calculation.binaryNetworkAddress,
                    });

                    contentParts.push({
                        type: 'text',
                        content: '\nSubnet Mask (Binary): ',
                    });
                    contentParts.push({
                        type: 'text',
                        content: calculation.binarySubnetMask,
                    });

                    // Create display text for copying
                    displayText = `Subnet Calculation Results\n\n`;
                    displayText += `Input IP Address: ${calculation.inputIpAddress}\n`;
                    displayText += `Input Subnet Mask: ${calculation.inputSubnetMask}\n\n`;
                    displayText += `Network Information:\n`;
                    displayText += `Network Address: ${calculation.networkAddress}\n`;
                    displayText += `Broadcast Address: ${calculation.broadcastAddress}\n`;
                    displayText += `Subnet Mask: ${calculation.subnetMask}\n`;
                    displayText += `Wildcard Mask: ${calculation.wildcardMask}\n`;
                    displayText += `CIDR Notation: ${calculation.cidrNotation}\n\n`;
                    displayText += `Host Information:\n`;
                    displayText += `First Host: ${calculation.firstHostAddress}\n`;
                    displayText += `Last Host: ${calculation.lastHostAddress}\n`;
                    displayText += `Total Hosts: ${calculation.totalHosts.toLocaleString()}\n`;
                    displayText += `Usable Hosts: ${calculation.usableHosts.toLocaleString()}\n\n`;
                    displayText += `Network Classification:\n`;
                    displayText += `Network Class: Class ${calculation.networkClass}\n`;
                    if(calculation.isPrivate) displayText += `Network Type: Private\n`;
                    displayText += `\nBinary Representation:\n`;
                    displayText += `Network (Binary): ${calculation.binaryNetworkAddress}\n`;
                    displayText += `Subnet Mask (Binary): ${calculation.binarySubnetMask}`;
                }
                else {
                    // Error case
                    contentParts.push({
                        type: 'badge',
                        variant: 'result-negative',
                        content: 'Calculation Error',
                    });

                    contentParts.push({
                        type: 'text',
                        content: `\n\n${calculation.errorMessage || 'Unknown error occurred'}`,
                    });

                    displayText = `Subnet Calculation Error\n\n`;
                    displayText += `Input IP Address: ${calculation.inputIpAddress}\n`;
                    displayText += `Input Subnet Mask: ${calculation.inputSubnetMask}\n\n`;
                    displayText += `Error: ${calculation.errorMessage || 'Unknown error occurred'}`;
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
                setIsProcessing(false);
            }
        }, 300); // Brief delay for better UX
    }

    // Render the component
    return (
        <div className="mt-6 flex flex-col gap-6">
            <SubnetCalculatorForm
                ipAddressReference={ipAddressReference}
                subnetMaskReference={subnetMaskReference}
                isProcessing={isProcessing}
                performSubnetCalculation={performSubnetCalculation}
            />
            <SubnetCalculatorResultsAnimatedList resultItems={resultItems} />
        </div>
    );
}
