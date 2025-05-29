// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
// import { Link } from '@structure/source/common/navigation/Link';
import { ButtonElementType, Button } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { FormInputText } from '@structure/source/common/forms/FormInputText';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
import { TipIcon } from '@structure/source/common/popovers/TipIcon';
import { RegionFormInputSelect } from '@project/app/(main-layout)/tools/_form/RegionFormInputSelect';
import { ToolFormInputProperties } from '@project/app/(main-layout)/tools/_form/ToolFormInputProperties';

// Dependencies - Assets
import ArrowUpIcon from '@structure/assets/icons/interface/ArrowUpIcon.svg';
import { Broadcast } from '@phosphor-icons/react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - PortCheckForm
export interface PortCheckFormProperties {
    className?: string;
    publicIpAddress: string;
    countryCode?: string;
    remoteAddressFormInputReference: React.RefObject<FormInputReferenceInterface>;
    remotePortFormInputReference: React.RefObject<FormInputReferenceInterface>;
    regionFormInputReference: React.RefObject<FormInputReferenceInterface>;
    buttonReference: React.RefObject<ButtonElementType>;
    checkingPort: boolean;
    checkPort: (remoteAddress: string, port: number, country: string) => void;
}
export function PortCheckForm(properties: PortCheckFormProperties) {
    // Function to check the port
    function checkPort() {
        properties.checkPort(
            properties.remoteAddressFormInputReference.current?.getValue() || '',
            Number(properties.remotePortFormInputReference.current?.getValue() || 0),
            properties.regionFormInputReference.current?.getValue() || '',
        );
    }

    // Render the component
    return (
        <div className={mergeClassNames('flex flex-col rounded-xl border px-5 pb-5 pt-4', properties.className)}>
            {/* Remote Address */}
            <FormInputText
                ref={properties.remoteAddressFormInputReference as React.Ref<FormInputReferenceInterface>}
                {...ToolFormInputProperties}
                id="remoteAddress"
                label="IP Address or Domain"
                labelTip="This can either be a domain name or IP address."
                defaultValue={'google.com'}
                description={
                    <div className="flex items-center">
                        <div
                            className="flex cursor-pointer select-none items-center space-x-1 text-foreground-secondary hover:text-foreground-tertiary active:text-foreground-primary"
                            onClick={function () {
                                properties.remoteAddressFormInputReference.current?.setValue(
                                    properties.publicIpAddress ?? '',
                                );
                            }}
                        >
                            <div>
                                <ArrowUpIcon className="h-3 w-3" />
                            </div>
                            <div className="flex items-center gap-1">
                                Use Current IP ({properties.publicIpAddress}
                                {properties.countryCode ? ' ' + properties.countryCode : ''})
                            </div>
                        </div>
                        <TipIcon
                            openOnPress={true}
                            variant="unstyled"
                            className="ml-0.5 select-none rounded-extra-small p-[4px] text-foreground-secondary hover:bg-light-2 active:bg-light-4 data-[state=delayed-open]:bg-light-2 data-[state=instant-open]:bg-light-2 data-[state=open]:bg-light-2 dark:hover:bg-dark-4 dark:active:bg-dark-6 data-[state=delayed-open]:dark:bg-dark-4 data-[state=instant-open]:dark:bg-dark-4 data-[state=open]:dark:bg-dark-4"
                            contentClassName="w-64"
                            content={
                                <>
                                    Your public IP address is used by the Internet to locate and communicate with your
                                    network.
                                </>
                            }
                        />
                        <CopyButton
                            className="ml-1"
                            iconClassName="h-3 w-3"
                            value={properties.publicIpAddress ?? ''}
                            notice={{
                                title: 'Copied to Clipboard',
                                content: `${properties.publicIpAddress}`,
                            }}
                        />
                    </div>
                }
                selectOnFocus={true}
                onKeyDown={function (event) {
                    if(event.key === 'Enter' && !properties.checkingPort) {
                        checkPort();
                    }
                }}
            />

            <div className="mt-4 flex gap-4">
                {/* Remote Port */}
                <FormInputText
                    ref={properties.remotePortFormInputReference as React.Ref<FormInputReferenceInterface>}
                    className="w-full"
                    {...ToolFormInputProperties}
                    id="remotePort"
                    label="Port"
                    labelTip="This can be a number between 1 and 65,535."
                    defaultValue={'80'}
                    selectOnFocus={true}
                    onKeyDown={function (event) {
                        if(event.key === 'Enter' && !properties.checkingPort) {
                            checkPort();
                        }
                    }}
                />

                {/* Region */}
                <RegionFormInputSelect
                    formInputReference={properties.regionFormInputReference}
                    countryCode={properties.countryCode}
                />
            </div>

            {/* Check Port Button */}
            <Button
                ref={properties.buttonReference}
                className="mt-6"
                icon={Broadcast}
                iconPosition="left"
                variant="primary"
                disabled={properties.checkingPort}
                processing={properties.checkingPort}
                onClick={checkPort}
            >
                Check Port
            </Button>
        </div>
    );
}
