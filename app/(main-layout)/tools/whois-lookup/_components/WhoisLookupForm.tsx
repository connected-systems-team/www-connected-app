// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType, Button } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { FormInputText } from '@structure/source/common/forms/FormInputText';
import { RegionFormInputSelect } from '@project/app/(main-layout)/tools/_form/RegionFormInputSelect';

// Dependencies - Assets
import { Binoculars } from '@phosphor-icons/react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - WhoisLookupForm
export interface WhoisLookupFormProperties {
    className?: string;
    countryCode?: string;
    domainFormInputReference: React.RefObject<FormInputReferenceInterface>;
    regionFormInputReference: React.RefObject<FormInputReferenceInterface>;
    buttonReference: React.RefObject<ButtonElementType>;
    lookingUpWhois: boolean;
    lookupWhois: (domain: string, country: string) => void;
}
export function WhoisLookupForm(properties: WhoisLookupFormProperties) {
    // Function to lookup WHOIS
    function lookupWhois() {
        properties.lookupWhois(
            properties.domainFormInputReference.current?.getValue() || '',
            properties.regionFormInputReference.current?.getValue() || '',
        );
    }

    // Render the component
    return (
        <div className={mergeClassNames('flex flex-col rounded-xl border px-5 pb-5 pt-4', properties.className)}>
            {/* Domain */}
            <FormInputText
                ref={properties.domainFormInputReference as React.Ref<FormInputReferenceInterface>}
                componentClassName="dark:bg-background-tertiary"
                id="domain"
                label="Domain Name"
                labelTip="Enter a domain name to look up WHOIS registration data for."
                labelTipIconProperties={{
                    contentClassName: 'w-48',
                }}
                defaultValue={'google.com'}
                selectOnFocus={true}
                onKeyDown={function (event) {
                    if(event.key === 'Enter' && !properties.lookingUpWhois) {
                        lookupWhois();
                    }
                }}
            />

            {/* Region */}
            <div className="mt-4">
                <RegionFormInputSelect
                    formInputReference={properties.regionFormInputReference}
                    countryCode={properties.countryCode}
                    labelTip="The region of the server used to perform the WHOIS lookup."
                />
            </div>

            {/* Lookup WHOIS Button */}
            <Button
                ref={properties.buttonReference}
                className="mt-6"
                icon={Binoculars}
                iconPosition="left"
                variant="primary"
                disabled={properties.lookingUpWhois}
                processing={properties.lookingUpWhois}
                onClick={lookupWhois}
            >
                Lookup WHOIS
            </Button>
        </div>
    );
}
