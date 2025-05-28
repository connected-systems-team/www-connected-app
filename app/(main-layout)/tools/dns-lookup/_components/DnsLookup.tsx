'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { DnsLookupForm } from '@project/app/(main-layout)/tools/dns-lookup/_components/DnsLookupForm';
import { DnsLookupResultsAnimatedList } from '@project/app/(main-layout)/tools/dns-lookup/_components/DnsLookupResultsAnimatedList';
import { DnsLookupResultItemProperties } from '@project/app/(main-layout)/tools/dns-lookup/_types/DnsLookupTypes';

// Dependencies - Types
import { DnsRecordType } from '@project/app/_api/graphql/generated/graphql';

// Dependencies - Hooks
import { useWebSocketViaSharedWorker } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - API
import { DnsLookupAdapter } from '@project/app/(main-layout)/tools/dns-lookup/_api/DnsLookupAdapter';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - DnsLookup
export interface DnsLookupProperties {
    className?: string;
    countryCode?: string;
}
export function DnsLookup(properties: DnsLookupProperties) {
    // State
    const [isLookingUpDns, setIsLookingUpDns] = React.useState<boolean>(false);
    const [dnsLookupResultItems, setDnsLookupResultItems] = React.useState<DnsLookupResultItemProperties[]>([]);

    // Hooks
    const webSocketViaSharedWorker = useWebSocketViaSharedWorker();

    // References - DNS Lookup Form
    const dnsLookupFormSubmitButtonReference = React.useRef<ButtonElementType>(null);
    const dnsLookupFormDomainFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const dnsLookupFormRecordTypesFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const dnsLookupFormRegionFormInputReference = React.useRef<FormInputReferenceInterface>(null);

    // Reference - DNS Lookup Adapter
    const dnsLookupAdapterReference = React.useRef<DnsLookupAdapter | null>(null);

    // Function to handle DNS lookup result item (append to list)
    function handleDnsLookupResultItem(dnsLookupResultItem: DnsLookupResultItemProperties): void {
        // Add the result item to the end of the list
        setDnsLookupResultItems(function (previousDnsLookupResultItems) {
            return [...previousDnsLookupResultItems, dnsLookupResultItem];
        });

        // If this is a final result, update the lookup state
        if(dnsLookupResultItem.isFinal) {
            setIsLookingUpDns(false);
        }
    }

    // Function to lookup DNS
    async function lookupDns(
        domain: string,
        recordTypes: DnsRecordType[],
        regionIdentifier: string = 'United States',
    ): Promise<void> {
        // Reset result items
        setDnsLookupResultItems([]);

        // Set lookup state
        setIsLookingUpDns(true);

        // Start the DNS lookup
        try {
            await dnsLookupAdapterReference.current?.lookupDns(domain, recordTypes, regionIdentifier);
        }
        catch(error) {
            console.error('DNS lookup error:', error);
        }
    }

    // On mount
    React.useEffect(
        function () {
            // Initialize the adapter if it doesn't exist
            if(!dnsLookupAdapterReference.current) {
                dnsLookupAdapterReference.current = new DnsLookupAdapter(
                    webSocketViaSharedWorker,
                    handleDnsLookupResultItem,
                );
            }

            // On unmount, do nothing
            return function () {};
        },
        [webSocketViaSharedWorker],
    );

    // Render the component
    return (
        <div className="mt-6 flex flex-col gap-6">
            <DnsLookupForm
                className={mergeClassNames('', properties.className)}
                countryCode={properties.countryCode}
                domainFormInputReference={dnsLookupFormDomainFormInputReference}
                recordTypesFormInputReference={dnsLookupFormRecordTypesFormInputReference}
                regionFormInputReference={dnsLookupFormRegionFormInputReference}
                buttonReference={dnsLookupFormSubmitButtonReference}
                lookingUpDns={isLookingUpDns}
                lookupDns={lookupDns}
            />

            <DnsLookupResultsAnimatedList dnsLookupResultItems={dnsLookupResultItems} />
        </div>
    );
}
