'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { WhoisLookupForm } from '@project/app/(main-layout)/tools/whois-lookup/_components/WhoisLookupForm';
import { WhoisLookupResultsAnimatedList } from '@project/app/(main-layout)/tools/whois-lookup/_components/WhoisLookupResultsAnimatedList';
import { WhoisLookupResultItemProperties } from '@project/app/(main-layout)/tools/whois-lookup/_types/WhoisLookupTypes';

// Dependencies - Hooks
import { useWebSocketViaSharedWorker } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - API
import { WhoisLookupAdapter } from '@project/app/(main-layout)/tools/whois-lookup/_api/WhoisLookupAdapter';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - WhoisLookup
export interface WhoisLookupProperties {
    className?: string;
    countryCode?: string;
}
export function WhoisLookup(properties: WhoisLookupProperties) {
    // State
    const [isLookingUpWhois, setIsLookingUpWhois] = React.useState<boolean>(false);
    const [whoisLookupResultItems, setWhoisLookupResultItems] = React.useState<WhoisLookupResultItemProperties[]>([]);

    // Hooks
    const webSocketViaSharedWorker = useWebSocketViaSharedWorker();

    // References - WHOIS Lookup Form
    const whoisLookupFormSubmitButtonReference = React.useRef<ButtonElementType>(null);
    const whoisLookupFormDomainFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const whoisLookupFormRegionFormInputReference = React.useRef<FormInputReferenceInterface>(null);

    // Reference - WHOIS Lookup Adapter
    const whoisLookupAdapterReference = React.useRef<WhoisLookupAdapter | null>(null);

    // Function to handle WHOIS lookup result item (append to list)
    function handleWhoisLookupResultItem(whoisLookupResultItem: WhoisLookupResultItemProperties): void {
        // Add the result item to the end of the list
        setWhoisLookupResultItems(function (previousWhoisLookupResultItems) {
            return [...previousWhoisLookupResultItems, whoisLookupResultItem];
        });

        // If this is a final result, update the lookup state
        if(whoisLookupResultItem.isFinal) {
            setIsLookingUpWhois(false);
        }
    }

    // Function to lookup WHOIS
    async function lookupWhois(domain: string, regionIdentifier: string = 'United States'): Promise<void> {
        // Reset result items
        setWhoisLookupResultItems([]);

        // Set lookup state
        setIsLookingUpWhois(true);

        // Start the WHOIS lookup
        try {
            await whoisLookupAdapterReference.current?.lookupWhois(domain, regionIdentifier);
        }
        catch(error) {
            console.error('WHOIS lookup error:', error);
        }
    }

    // On mount
    React.useEffect(
        function () {
            // Initialize the adapter if it doesn't exist
            if(!whoisLookupAdapterReference.current) {
                whoisLookupAdapterReference.current = new WhoisLookupAdapter(
                    webSocketViaSharedWorker,
                    handleWhoisLookupResultItem,
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
            <WhoisLookupForm
                className={mergeClassNames('', properties.className)}
                countryCode={properties.countryCode}
                domainFormInputReference={whoisLookupFormDomainFormInputReference}
                regionFormInputReference={whoisLookupFormRegionFormInputReference}
                buttonReference={whoisLookupFormSubmitButtonReference}
                lookingUpWhois={isLookingUpWhois}
                lookupWhois={lookupWhois}
            />

            <WhoisLookupResultsAnimatedList whoisLookupResultItems={whoisLookupResultItems} />
        </div>
    );
}
