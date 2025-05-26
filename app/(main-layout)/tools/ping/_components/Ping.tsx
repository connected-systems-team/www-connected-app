'use client'; // This component uses client-only features

// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Main Components
import { ButtonElementType } from '@structure/source/common/buttons/Button';
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import { PingForm } from '@project/app/(main-layout)/tools/ping/_components/PingForm';
import { PingResultsAnimatedList } from '@project/app/(main-layout)/tools/ping/_components/PingResultsAnimatedList';
import { PingResultItemProperties } from '@project/app/(main-layout)/tools/ping/_types/PingTypes';

// Dependencies - Hooks
import { useWebSocketViaSharedWorker } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - API
import { PingAdapter } from '@project/app/(main-layout)/tools/ping/_api/PingAdapter';

// Dependencies - Utilities
import { mergeClassNames } from '@structure/source/utilities/Style';

// Component - Ping
export interface PingProperties {
    className?: string;
    countryCode?: string;
}
export function Ping(properties: PingProperties) {
    // State
    const [isPinging, setIsPinging] = React.useState<boolean>(false);
    const [pingResultItems, setPingResultItems] = React.useState<PingResultItemProperties[]>([]);

    // Hooks
    const webSocketViaSharedWorker = useWebSocketViaSharedWorker();

    // References - Ping Form
    const pingFormSubmitButtonReference = React.useRef<ButtonElementType>(null);
    const pingFormHostFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const pingFormCountFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const pingFormTimeoutFormInputReference = React.useRef<FormInputReferenceInterface>(null);
    const pingFormRegionFormInputReference = React.useRef<FormInputReferenceInterface>(null);

    // Reference - Ping Adapter
    const pingAdapterReference = React.useRef<PingAdapter | null>(null);

    // Function to handle ping result item (append to list)
    function handlePingResultItem(pingResultItem: PingResultItemProperties): void {
        // Add the result item to the end of the list
        setPingResultItems(function (previousPingResultItems) {
            return [...previousPingResultItems, pingResultItem];
        });

        // If this is a final result, update the ping state
        if(pingResultItem.isFinal) {
            setIsPinging(false);
        }
    }

    // Function to ping host
    async function ping(
        host: string,
        count: number,
        timeoutMs: number | undefined,
        regionIdentifier: string = 'United States',
    ): Promise<void> {
        // Reset result items
        setPingResultItems([]);

        // Set ping state
        setIsPinging(true);

        // Start the ping
        try {
            await pingAdapterReference.current?.ping(host, count, timeoutMs, regionIdentifier);
        }
        catch(error) {
            console.error('Ping error:', error);
        }
    }

    // On mount
    React.useEffect(
        function () {
            // Initialize the adapter if it doesn't exist
            if(!pingAdapterReference.current) {
                pingAdapterReference.current = new PingAdapter(webSocketViaSharedWorker, handlePingResultItem);
            }

            // On unmount, do nothing
            return function () {};
        },
        [webSocketViaSharedWorker],
    );

    // Render the component
    return (
        <div className="mt-6 flex flex-col gap-6">
            <PingForm
                className={mergeClassNames('', properties.className)}
                countryCode={properties.countryCode}
                hostFormInputReference={pingFormHostFormInputReference}
                countFormInputReference={pingFormCountFormInputReference}
                timeoutFormInputReference={pingFormTimeoutFormInputReference}
                regionFormInputReference={pingFormRegionFormInputReference}
                buttonReference={pingFormSubmitButtonReference}
                pinging={isPinging}
                ping={ping}
            />

            <PingResultsAnimatedList pingResultItems={pingResultItems} />
        </div>
    );
}
