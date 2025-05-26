// Dependencies - React
import React from 'react';

// Dependencies - Main Components
import { Button } from '@structure/source/common/buttons/Button';
import { FormInputText } from '@structure/source/common/forms/FormInputText';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Dependencies - Types
import { SubnetCalculatorFormProperties } from '@project/app/(main-layout)/tools/subnet-calculator/_types/SubnetCalculatorTypes';

// Component - SubnetCalculatorForm
export function SubnetCalculatorForm(properties: SubnetCalculatorFormProperties) {
    // Function to calculate subnet
    function calculateSubnet() {
        const ipAddress = properties.ipAddressReference.current?.getValue() || '';
        const subnetMask = properties.subnetMaskReference.current?.getValue() || '';

        // Perform the subnet calculation
        properties.performSubnetCalculation(ipAddress, subnetMask);
    }

    // Render the component
    return (
        <div className={mergeClassNames('flex flex-col rounded-xl border px-5 pb-5 pt-4', properties.className)}>
            {/* IP Address */}
            <FormInputText
                ref={properties.ipAddressReference as React.Ref<FormInputReferenceInterface>}
                componentClassName="dark:bg-background-tertiary"
                id="ipAddress"
                label="IP Address"
                labelTip="Enter an IPv4 address to calculate subnet information for."
                labelTipIconProperties={{
                    contentClassName: 'w-48',
                }}
                defaultValue={'192.168.1.100'}
                selectOnFocus={true}
                onKeyDown={function (event) {
                    if(event.key === 'Enter' && !properties.isProcessing) {
                        calculateSubnet();
                    }
                }}
            />

            <div className="mt-4 flex gap-4">
                {/* Subnet Mask */}
                <FormInputText
                    ref={properties.subnetMaskReference as React.Ref<FormInputReferenceInterface>}
                    className="w-full"
                    componentClassName="dark:bg-background-tertiary"
                    id="subnetMask"
                    label="Subnet Mask"
                    labelTip="Enter a subnet mask in dotted decimal notation (e.g., 255.255.255.0) or CIDR notation (e.g., /24)."
                    labelTipIconProperties={{
                        contentClassName: 'w-52',
                    }}
                    defaultValue={'255.255.255.0'}
                    selectOnFocus={true}
                    onKeyDown={function (event) {
                        if(event.key === 'Enter' && !properties.isProcessing) {
                            calculateSubnet();
                        }
                    }}
                />
            </div>

            {/* Calculate Button */}
            <Button
                className="mt-6"
                variant="primary"
                processing={properties.isProcessing}
                disabled={properties.isProcessing}
                onClick={calculateSubnet}
            >
                Calculate Subnet
            </Button>

            {/* Quick Examples */}
            <div className="mt-4 rounded-lg bg-background-secondary px-3 py-2">
                <p className="text-sm font-medium text-foreground-secondary">Common Examples:</p>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-foreground-tertiary">
                    <button
                        className="hover:bg-background-quaternary rounded bg-background-tertiary px-2 py-1"
                        onClick={function () {
                            properties.ipAddressReference.current?.setValue('192.168.1.0');
                            properties.subnetMaskReference.current?.setValue('255.255.255.0');
                        }}
                    >
                        Class C (/24)
                    </button>
                    <button
                        className="hover:bg-background-quaternary rounded bg-background-tertiary px-2 py-1"
                        onClick={function () {
                            properties.ipAddressReference.current?.setValue('10.0.0.0');
                            properties.subnetMaskReference.current?.setValue('255.0.0.0');
                        }}
                    >
                        Class A (/8)
                    </button>
                    <button
                        className="hover:bg-background-quaternary rounded bg-background-tertiary px-2 py-1"
                        onClick={function () {
                            properties.ipAddressReference.current?.setValue('172.16.0.0');
                            properties.subnetMaskReference.current?.setValue('255.255.0.0');
                        }}
                    >
                        Class B (/16)
                    </button>
                    <button
                        className="hover:bg-background-quaternary rounded bg-background-tertiary px-2 py-1"
                        onClick={function () {
                            properties.ipAddressReference.current?.setValue('192.168.1.0');
                            properties.subnetMaskReference.current?.setValue('/28');
                        }}
                    >
                        Small Subnet (/28)
                    </button>
                </div>
            </div>
        </div>
    );
}
