// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType, Button } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { FormInputText } from '@structure/source/common/forms/FormInputText';
import { FormInputMultipleSelect } from '@structure/source/common/forms/FormInputMultipleSelect';
import { RegionFormInputSelect } from '@project/app/(main-layout)/tools/_form/RegionFormInputSelect';
import { ToolFormInputProperties } from '@project/app/(main-layout)/tools/_form/ToolFormInputProperties';

// Dependencies - API
import { DnsRecordType } from '@project/app/_api/graphql/generated/graphql';

// Dependencies - Types
import { DnsRecordTypeOptions } from '@project/app/(main-layout)/tools/dns-lookup/_types/DnsLookupTypes';

// Dependencies - Assets
import { GlobeSimple } from '@phosphor-icons/react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - DnsLookupForm
export interface DnsLookupFormProperties {
    className?: string;
    countryCode?: string;
    domainFormInputReference: React.RefObject<FormInputReferenceInterface>;
    recordTypesFormInputReference: React.RefObject<FormInputReferenceInterface>;
    regionFormInputReference: React.RefObject<FormInputReferenceInterface>;
    buttonReference: React.RefObject<ButtonElementType>;
    lookingUpDns: boolean;
    lookupDns: (domain: string, recordTypes: DnsRecordType[], country: string) => void;
}
export function DnsLookupForm(properties: DnsLookupFormProperties) {
    // Function to lookup DNS
    function lookupDns() {
        const recordTypesValue = properties.recordTypesFormInputReference.current?.getValue();
        let recordTypes: DnsRecordType[] = [DnsRecordType.A]; // Default to A record

        // Parse the record types if provided
        if(recordTypesValue) {
            if(Array.isArray(recordTypesValue)) {
                recordTypes = recordTypesValue as DnsRecordType[];
            }
            else if(typeof recordTypesValue === 'string') {
                recordTypes = [recordTypesValue as DnsRecordType];
            }
        }

        properties.lookupDns(
            properties.domainFormInputReference.current?.getValue() || '',
            recordTypes,
            properties.regionFormInputReference.current?.getValue() || '',
        );
    }

    // Render the component
    return (
        <div className={mergeClassNames('flex flex-col rounded-xl border px-5 pb-5 pt-4', properties.className)}>
            {/* Domain */}
            <FormInputText
                ref={properties.domainFormInputReference as React.Ref<FormInputReferenceInterface>}
                {...ToolFormInputProperties}
                id="domain"
                label="Domain Name"
                labelTip="Enter a domain name to look up DNS records for."
                defaultValue={'google.com'}
                selectOnFocus={true}
                onKeyDown={function (event) {
                    if(event.key === 'Enter' && !properties.lookingUpDns) {
                        lookupDns();
                    }
                }}
            />

            <div className="mt-4 flex gap-4">
                {/* Record Types */}
                <FormInputMultipleSelect
                    ref={properties.recordTypesFormInputReference as React.Ref<FormInputReferenceInterface>}
                    className="w-full"
                    componentClassName="dark:bg-background-tertiary dark:border-dark-4 dark:hover:bg-background-secondary"
                    id="recordTypes"
                    label="Record Types"
                    labelTip="Select which DNS record types to look up."
                    labelTipIconProperties={ToolFormInputProperties.labelTipIconProperties}
                    items={DnsRecordTypeOptions.map(function (option) {
                        return {
                            value: option.value,
                            content: (
                                <div className="flex flex-col">
                                    <span className="font-medium">{option.label}</span>
                                    <span className="text-xs text-foreground-secondary">{option.description}</span>
                                </div>
                            ),
                        };
                    })}
                    placeholder="Select record types..."
                    defaultValue={[DnsRecordType.A]} // Default to A record
                />

                {/* Region */}
                <RegionFormInputSelect
                    formInputReference={properties.regionFormInputReference}
                    countryCode={properties.countryCode}
                    labelTip="The region of the server used to perform the DNS lookup."
                />
            </div>

            {/* Lookup DNS Button */}
            <Button
                ref={properties.buttonReference}
                className="mt-6"
                icon={GlobeSimple}
                iconPosition="left"
                variant="primary"
                disabled={properties.lookingUpDns}
                processing={properties.lookingUpDns}
                onClick={lookupDns}
            >
                Lookup DNS
            </Button>
        </div>
    );
}
