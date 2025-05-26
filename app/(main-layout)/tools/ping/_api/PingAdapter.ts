'use client'; // This adapter uses client-only features

// Dependencies - Types
import {
    PingFlowExecutionInterface,
    PingFlowService,
    PingFlowClientInputInterface,
} from '@project/app/(main-layout)/tools/ping/_api/PingFlowService';
import {
    PingResultItemProperties,
    PingContentPart,
    PingResult,
    PingStatistics,
} from '@project/app/(main-layout)/tools/ping/_types/PingTypes';
import { WebSocketViaSharedWorkerContextInterface } from '@structure/source/api/web-sockets/providers/WebSocketViaSharedWorkerProvider';
import { FlowExecutionErrorInterface } from '@project/source/modules/flow/FlowService';

// Dependencies - Base Classes
import { BaseFlowAdapter } from '@project/app/(main-layout)/tools/_adapters/BaseFlowAdapter';
import { FlowErrorResult } from '@project/app/(main-layout)/tools/_adapters/FlowErrorHandler';
import { ToolErrorMappingUtilities } from '@project/app/(main-layout)/tools/_adapters/ToolErrorMappingUtilities';

// Dependencies - Utilities
import { getCountryByName } from '@structure/source/utilities/geo/Countries';

// Class - PingAdapter
export class PingAdapter extends BaseFlowAdapter<
    PingFlowClientInputInterface,
    PingFlowExecutionInterface['output'],
    PingResultItemProperties,
    PingFlowService
> {
    constructor(
        webSocketViaSharedWorker: WebSocketViaSharedWorkerContextInterface,
        onPingResultItem: (result: PingResultItemProperties) => void,
    ) {
        super(webSocketViaSharedWorker, PingFlowService, onPingResultItem);
    }

    // Public method to perform ping
    public async ping(host: string, count: number, timeoutMs: number | undefined, country: string): Promise<void> {
        const input: PingFlowClientInputInterface = {
            host: host.trim().toLowerCase(),
            count: count,
            timeoutMs: timeoutMs,
            country: country,
        };

        await this.executeFlow(input);
    }

    // Required abstract method implementations
    protected getAdapterName(): string {
        return 'PingAdapter';
    }

    protected createInitialStatusItem(input: PingFlowClientInputInterface): PingResultItemProperties {
        // Get country data for display
        const countryData = getCountryByName(input.country);

        // Create structured content with badges
        const timeoutText = input.timeoutMs ? ` (timeout: ${input.timeoutMs}ms)` : '';
        const initialContent: PingContentPart[] = [
            { type: 'text', content: 'Pinging ' },
            { type: 'badge', variant: 'host', content: input.host },
            { type: 'text', content: ` ${input.count} times from ` },
            { type: 'badge', variant: 'region', content: input.country },
            { type: 'text', content: `${timeoutText}...` },
        ];

        return {
            host: input.host,
            count: input.count,
            timeout: input.timeoutMs,
            region: input.country,
            content: initialContent,
            text: `Pinging ${input.host} ${input.count} times from ${countryData?.emoji || '🌐'} ${
                input.country
            }${timeoutText}...`,
            isFinal: false,
            isSuccess: false,
        };
    }

    protected createErrorStatusItem(
        input: PingFlowClientInputInterface,
        message: string,
        errorCode?: string,
    ): PingResultItemProperties {
        const errorContent: PingContentPart[] = [
            { type: 'badge', variant: 'result-negative', content: 'Error' },
            { type: 'text', content: `: ${message}` },
        ];

        return {
            host: input.host,
            count: input.count,
            timeout: input.timeoutMs,
            region: input.country,
            content: errorContent,
            text: message,
            errorCode: errorCode,
            isFinal: true,
            isSuccess: false,
        };
    }

    protected processFlowOutput(
        output: PingFlowExecutionInterface['output'],
        input: PingFlowClientInputInterface,
    ): void {
        // Check for error in the output
        if(output?.error) {
            const errorItem = this.createErrorStatusItem(
                input,
                output.error.message || 'Ping failed with unknown error.',
                'PingError',
            );
            this.onResultItem(errorItem);
            return;
        }

        // Convert server responses to client results
        const results: PingResult[] = [];
        if(output?.responses && Array.isArray(output.responses)) {
            for(let i = 0; i < output.responses.length; i++) {
                const response = output.responses[i];
                if(!response) continue; // Skip if response is undefined

                const sequenceNumber = i + 1; // Generate sequence number since API returns -1
                const isTimeout = output.timeouts?.includes(sequenceNumber) || false;

                results.push({
                    sequence: sequenceNumber,
                    responseTime: response.timeMs,
                    ttl: response.ttl > 0 ? response.ttl : 64, // Default TTL if -1
                    timestamp: new Date().toISOString(), // Generate timestamp
                    isSuccess: !isTimeout && response.timeMs > 0,
                });
            }
        }

        // Create statistics from server data
        let statistics: PingStatistics | undefined;
        if(output?.transmitted !== undefined && output?.received !== undefined) {
            const responseTimes = results.filter((result) => result.isSuccess).map((result) => result.responseTime);

            statistics = {
                packetsSent: output.transmitted,
                packetsReceived: output.received,
                packetsLost: output.transmitted - output.received,
                packetLossPercentage: output.lossPercent || 0,
                minimumResponseTime: responseTimes.length > 0 ? Math.min(...responseTimes) : undefined,
                maximumResponseTime: responseTimes.length > 0 ? Math.max(...responseTimes) : undefined,
                averageResponseTime:
                    responseTimes.length > 0
                        ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
                        : undefined,
            };
        }

        // Create final result item
        let text: string;
        let finalContent: PingContentPart[];

        // Check if we have a resolved IP to show
        const resolvedIp = output?.resolvedIp;
        const hasResolvedIp = resolvedIp && resolvedIp !== input.host;

        if(results.length > 0) {
            // Success with results
            const lossPercentage = output?.lossPercent || 0;
            const totalPings = output?.transmitted || results.length;

            if(lossPercentage === 0) {
                text = `Successfully pinged ${input.host}`;
                if(hasResolvedIp) {
                    text += ` (${resolvedIp})`;
                }
                text += ` ${totalPings} times with 0% packet loss.`;

                finalContent = [
                    { type: 'text', content: 'Successfully pinged ' },
                    { type: 'badge', variant: 'host', content: input.host },
                ];
                if(hasResolvedIp) {
                    finalContent.push(
                        { type: 'text', content: ' (' },
                        { type: 'badge', variant: 'ip-address', content: resolvedIp },
                        { type: 'text', content: ')' },
                    );
                }
                finalContent.push(
                    { type: 'text', content: ` ${totalPings} times with ` },
                    { type: 'badge', variant: 'result-positive', content: '0% packet loss' },
                    { type: 'text', content: '.' },
                );
            }
            else {
                text = `Pinged ${input.host}`;
                if(hasResolvedIp) {
                    text += ` (${resolvedIp})`;
                }
                text += ` ${totalPings} times with ${lossPercentage}% packet loss.`;

                finalContent = [
                    { type: 'text', content: 'Pinged ' },
                    { type: 'badge', variant: 'host', content: input.host },
                ];
                if(hasResolvedIp) {
                    finalContent.push(
                        { type: 'text', content: ' (' },
                        { type: 'badge', variant: 'ip-address', content: resolvedIp },
                        { type: 'text', content: ')' },
                    );
                }
                finalContent.push(
                    { type: 'text', content: ` ${totalPings} times with ` },
                    {
                        type: 'badge',
                        variant: lossPercentage === 0 ? 'result-positive' : 'result-negative',
                        content: `${lossPercentage}% packet loss`,
                    },
                    { type: 'text', content: '.' },
                );
            }

            // Add average response time if available
            if(statistics?.averageResponseTime) {
                text += ` Average response time: ${statistics.averageResponseTime.toFixed(1)}ms.`;
                finalContent.push(
                    { type: 'text', content: ' Average response time: ' },
                    { type: 'badge', variant: 'default', content: `${statistics.averageResponseTime.toFixed(1)}ms` },
                    { type: 'text', content: '.' },
                );
            }
        }
        else {
            // No results but might have resolved IP
            if(hasResolvedIp) {
                text = `Could not ping ${input.host} (resolved to ${resolvedIp}).`;
                finalContent = [
                    { type: 'text', content: 'Could not ping ' },
                    { type: 'badge', variant: 'host', content: input.host },
                    { type: 'text', content: ' (resolved to ' },
                    { type: 'badge', variant: 'ip-address', content: resolvedIp },
                    { type: 'text', content: ').' },
                ];
            }
            else {
                text = `No ping results received for ${input.host}.`;
                finalContent = [
                    { type: 'text', content: 'No ping results received for ' },
                    { type: 'badge', variant: 'host', content: input.host },
                    { type: 'text', content: '.' },
                ];
            }
        }

        // Send the final result
        this.onResultItem({
            host: input.host,
            count: input.count,
            timeout: input.timeoutMs,
            region: input.country,
            content: finalContent,
            text: text,
            results: results,
            statistics: statistics,
            resolvedIpAddress: output?.resolvedIp,
            isFinal: true,
            isSuccess: output?.success === true,
        });
    }

    // Override to handle ping-specific errors
    protected processToolSpecificError(error: FlowExecutionErrorInterface): FlowErrorResult | null {
        return ToolErrorMappingUtilities.processErrorWithPatterns(
            error,
            ToolErrorMappingUtilities.getPingErrorPatterns(),
        );
    }
}
