'use client'; // This component uses client-only features

// Dependencies - React
import React from 'react';

// Dependencies - Hooks
import { useWebSocketViaSharedWorker } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';

// Dependencies - Types
import { FormInputReferenceInterface } from '@structure/source/common/forms/FormInput';
import {
    SslTlsCheckerProperties,
    SslTlsCheckerResultItemInterface,
} from '@project/app/(main-layout)/tools/ssl-tls-checker/_types/SslTlsCheckerTypes';

// Dependencies - Components
import { SslTlsCheckerForm } from '@project/app/(main-layout)/tools/ssl-tls-checker/_components/SslTlsCheckerForm';
import { SslTlsCheckerResultsAnimatedList } from '@project/app/(main-layout)/tools/ssl-tls-checker/_components/SslTlsCheckerResultsAnimatedList';

// Dependencies - Services
import { SslTlsCheckerAdapter } from '@project/app/(main-layout)/tools/ssl-tls-checker/_api/SslTlsCheckerAdapter';

// Component - SslTlsChecker
export function SslTlsChecker(properties: SslTlsCheckerProperties) {
    // State
    const [isProcessing, setIsProcessing] = React.useState<boolean>(false);
    const [resultItems, setResultItems] = React.useState<SslTlsCheckerResultItemInterface[]>([]);

    // Hooks
    const webSocketViaSharedWorker = useWebSocketViaSharedWorker();

    // References
    const hostReference = React.useRef<FormInputReferenceInterface>(null);
    const portReference = React.useRef<FormInputReferenceInterface>(null);
    const regionReference = React.useRef<FormInputReferenceInterface>(null);
    const adapterReference = React.useRef<SslTlsCheckerAdapter | null>(null);

    // Function to handle result items from the adapter
    function handleResultItem(resultItem: SslTlsCheckerResultItemInterface): void {
        setResultItems(function (previousResultItems) {
            return [...previousResultItems, resultItem];
        });

        // If this is the final result, stop processing
        if(resultItem.isFinal) {
            setIsProcessing(false);
        }
    }

    // Function to perform SSL/TLS check
    async function performSslTlsCheck(host: string, port: number, region: string): Promise<void> {
        // Clear previous results
        setResultItems([]);
        setIsProcessing(true);

        // Perform the SSL/TLS check using the adapter
        await adapterReference.current?.checkSslTlsCertificate(host, port, region);
    }

    // Effect to initialize the adapter
    React.useEffect(
        function () {
            // Create the adapter if it doesn't exist
            if(!adapterReference.current && webSocketViaSharedWorker) {
                adapterReference.current = new SslTlsCheckerAdapter(webSocketViaSharedWorker, handleResultItem);
            }
        },
        [webSocketViaSharedWorker],
    );

    // Render the component
    return (
        <div className="mt-6 flex flex-col gap-6">
            <SslTlsCheckerForm
                hostReference={hostReference}
                portReference={portReference}
                regionReference={regionReference}
                countryCode={properties.countryCode}
                isProcessing={isProcessing}
                performSslTlsCheck={performSslTlsCheck}
            />
            <SslTlsCheckerResultsAnimatedList resultItems={resultItems} />
        </div>
    );
}
