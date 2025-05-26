// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType, Button } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { FormInputText } from '@structure/source/common/forms/FormInputText';
import { FormInputSelect } from '@structure/source/common/forms/FormInputSelect';
import { RegionFormInputSelect } from '@project/app/(main-layout)/tools/_form/RegionFormInputSelect';

// Dependencies - Assets
import { CellTower } from '@phosphor-icons/react';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Count options for ping
const pingCountOptions = [
    { value: '1', content: '1 packet' },
    { value: '2', content: '2 packets' },
    { value: '3', content: '3 packets' },
    { value: '4', content: '4 packets' },
    { value: '8', content: '8 packets' },
    { value: '16', content: '16 packets' },
    { value: '20', content: '20 packets' },
];

// Timeout options for ping
const pingTimeoutOptions = [
    { value: '1000', content: '1 second' },
    { value: '2000', content: '2 seconds' },
    { value: '5000', content: '5 seconds' },
    { value: '10000', content: '10 seconds' },
];

// Component - PingForm
export interface PingFormProperties {
    className?: string;
    countryCode?: string;
    hostFormInputReference: React.RefObject<FormInputReferenceInterface>;
    countFormInputReference: React.RefObject<FormInputReferenceInterface>;
    timeoutFormInputReference: React.RefObject<FormInputReferenceInterface>;
    regionFormInputReference: React.RefObject<FormInputReferenceInterface>;
    buttonReference: React.RefObject<ButtonElementType>;
    pinging: boolean;
    ping: (host: string, count: number, timeoutMs: number | undefined, country: string) => void;
}
export function PingForm(properties: PingFormProperties) {
    // Function to ping host
    function ping() {
        const countValue = properties.countFormInputReference.current?.getValue();
        const timeoutValue = properties.timeoutFormInputReference.current?.getValue();

        const count = countValue ? parseInt(countValue as string, 10) : 1; // Default to 1 packet
        const timeoutMs = timeoutValue ? parseInt(timeoutValue as string, 10) : undefined;

        properties.ping(
            properties.hostFormInputReference.current?.getValue() || '',
            count,
            timeoutMs,
            properties.regionFormInputReference.current?.getValue() || '',
        );
    }

    // Render the component
    return (
        <div className={mergeClassNames('flex flex-col rounded-xl border px-5 pb-5 pt-4', properties.className)}>
            {/* Host */}
            <FormInputText
                ref={properties.hostFormInputReference as React.Ref<FormInputReferenceInterface>}
                componentClassName="dark:bg-background-tertiary"
                id="host"
                label="Host"
                labelTip="Enter a hostname or IP address to ping."
                labelTipIconProperties={{
                    contentClassName: 'w-48',
                }}
                defaultValue={'google.com'}
                selectOnFocus={true}
                onKeyDown={function (event) {
                    if(event.key === 'Enter' && !properties.pinging) {
                        ping();
                    }
                }}
            />

            <div className="mt-4 flex gap-4">
                {/* Count */}
                <FormInputSelect
                    ref={properties.countFormInputReference as React.Ref<FormInputReferenceInterface>}
                    className="w-full"
                    componentClassName="dark:bg-background-tertiary dark:border-dark-4 dark:hover:bg-background-secondary"
                    id="count"
                    label="Packet Count"
                    labelTip="Number of ping packets to send."
                    labelTipIconProperties={{
                        contentClassName: 'w-48',
                    }}
                    items={pingCountOptions}
                    defaultValue="1"
                />

                {/* Timeout */}
                <FormInputSelect
                    ref={properties.timeoutFormInputReference as React.Ref<FormInputReferenceInterface>}
                    className="w-full"
                    componentClassName="dark:bg-background-tertiary dark:border-dark-4 dark:hover:bg-background-secondary"
                    id="timeout"
                    label="Timeout"
                    labelTip="Maximum time to wait for each ping response."
                    labelTipIconProperties={{
                        contentClassName: 'w-48',
                    }}
                    items={pingTimeoutOptions}
                    defaultValue="5000"
                />

                {/* Region */}
                <RegionFormInputSelect
                    formInputReference={properties.regionFormInputReference}
                    countryCode={properties.countryCode}
                    labelTip="The region of the server used to perform the ping."
                />
            </div>

            {/* Ping Button */}
            <Button
                ref={properties.buttonReference}
                className="mt-6"
                icon={CellTower}
                iconPosition="left"
                variant="primary"
                disabled={properties.pinging}
                processing={properties.pinging}
                onClick={ping}
            >
                Ping Host
            </Button>
        </div>
    );
}
