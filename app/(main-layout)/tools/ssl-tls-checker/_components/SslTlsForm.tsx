// Dependencies - React
import React from 'react';

// Dependencies - Main Components
import { Button } from '@structure/source/common/buttons/Button';
import { FormInputText } from '@structure/source/common/forms/FormInputText';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';

// Dependencies - Form Components
import { RegionFormInputSelect } from '@project/app/(main-layout)/tools/_form/RegionFormInputSelect';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Dependencies - Types
import { SslTlsFormProperties } from '@project/app/(main-layout)/tools/ssl-tls-checker/_types/SslTlsTypes';

// Component - SslTlsForm
export function SslTlsForm(properties: SslTlsFormProperties) {
    // Function to check certificate
    function checkCertificate() {
        const host = properties.hostReference.current?.getValue() || '';
        const portString = properties.portReference.current?.getValue() || '';
        const region = properties.regionReference.current?.getValue() || '';

        // Parse port to number, default to 443 for HTTPS
        const port = parseInt(portString) || 443;

        // Perform the SSL/TLS check
        properties.performSslTlsCheck(host, port, region);
    }

    // Render the component
    return (
        <div className={mergeClassNames('flex flex-col rounded-xl border px-5 pb-5 pt-4', properties.className)}>
            {/* Host */}
            <FormInputText
                ref={properties.hostReference as React.Ref<FormInputReferenceInterface>}
                componentClassName="dark:bg-background-tertiary"
                id="host"
                label="Host"
                labelTip="Enter a domain name or IP address to check its SSL/TLS certificate."
                labelTipIconProperties={{
                    contentClassName: 'w-48',
                }}
                defaultValue={'github.com'}
                selectOnFocus={true}
                onKeyDown={function (event) {
                    if(event.key === 'Enter' && !properties.isProcessing) {
                        checkCertificate();
                    }
                }}
            />

            <div className="mt-4 flex gap-4">
                {/* Port */}
                <FormInputText
                    ref={properties.portReference as React.Ref<FormInputReferenceInterface>}
                    className="w-full"
                    componentClassName="dark:bg-background-tertiary"
                    id="port"
                    label="Port"
                    labelTip="The port number to check the SSL/TLS certificate on (typically 443 for HTTPS)."
                    labelTipIconProperties={{
                        contentClassName: 'w-48',
                    }}
                    defaultValue={'443'}
                    selectOnFocus={true}
                    onKeyDown={function (event) {
                        if(event.key === 'Enter' && !properties.isProcessing) {
                            checkCertificate();
                        }
                    }}
                />

                {/* Region */}
                <RegionFormInputSelect
                    formInputReference={properties.regionReference}
                    countryCode={properties.countryCode}
                    labelTip="The region of the server used to check the SSL/TLS certificate."
                />
            </div>

            {/* Check Certificate Button */}
            <Button
                className="mt-6"
                variant="primary"
                processing={properties.isProcessing}
                disabled={properties.isProcessing}
                onClick={checkCertificate}
            >
                Check Certificate
            </Button>
        </div>
    );
}
