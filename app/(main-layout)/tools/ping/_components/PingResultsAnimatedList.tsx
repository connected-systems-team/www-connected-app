// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import {
    PingResultItemProperties,
    PingResult,
    PingStatistics,
} from '@project/app/(main-layout)/tools/ping/_types/PingTypes';

// Dependencies - Main Components
import { ToolResultAnimatedList } from '@project/app/(main-layout)/tools/_components/ToolResultAnimatedList';
import { AnimatedListItemBadge } from '@project/source/common/animations/AnimatedListItemBadge';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';

// Component - PingResultsAnimatedList
export interface PingResultsAnimatedListProperties {
    pingResultItems: PingResultItemProperties[];
}
export function PingResultsAnimatedList(properties: PingResultsAnimatedListProperties) {
    // Function to determine if an item is in a negative state
    function isNegativeState(item: PingResultItemProperties): boolean {
        return !item.isSuccess || !!item.errorCode;
    }

    // Function to render final actions with ping-specific logic
    function renderFinalActions(item: PingResultItemProperties, displayText: string): React.ReactNode {
        return (
            <div className="w-full">
                <div className="flex items-center">
                    {/* Only show copy button for error cases or when there are no results */}
                    {(!item.results || item.results.length === 0 || !item.isSuccess) && (
                        <CopyButton
                            className="ml-1.5"
                            iconClassName="h-3.5 w-3.5"
                            value={displayText}
                            notice={{
                                title: 'Copied to Clipboard',
                                content: '"' + displayText + '"',
                            }}
                        />
                    )}
                </div>
                {/* Always show detailed results when available */}
                {item.results && item.results.length > 0 && renderPingResultDetails(item.results, item.statistics)}
            </div>
        );
    }

    // Function to render detailed ping results
    function renderPingResultDetails(results: PingResult[], statistics?: PingStatistics): React.ReactNode {
        return (
            <div className="mt-3 space-y-3 rounded-lg bg-background-tertiary p-3">
                {/* Individual ping results */}
                <div className="space-y-2">
                    {results.map(function (result, resultIndex) {
                        return (
                            <div key={resultIndex} className="flex items-center justify-between text-xs">
                                <div className="flex flex-wrap items-center gap-2">
                                    <AnimatedListItemBadge variant="default">
                                        Seq: {result.sequence}
                                    </AnimatedListItemBadge>
                                    {result.isSuccess ? (
                                        <>
                                            <AnimatedListItemBadge variant="result-positive">
                                                {result.responseTime.toFixed(1)}ms
                                            </AnimatedListItemBadge>
                                            <span className="text-foreground-secondary">TTL: {result.ttl}</span>
                                        </>
                                    ) : (
                                        <AnimatedListItemBadge variant="result-negative">Failed</AnimatedListItemBadge>
                                    )}
                                </div>
                                <CopyButton
                                    iconClassName="h-3 w-3"
                                    value={result.isSuccess ? `${result.responseTime.toFixed(1)}ms` : 'Failed'}
                                    notice={{
                                        title: 'Copied to Clipboard',
                                        content: `Seq ${result.sequence}: ${
                                            result.isSuccess ? `${result.responseTime.toFixed(1)}ms` : 'Failed'
                                        }`,
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* Statistics summary */}
                {statistics && (
                    <div className="border-t border-border pt-3">
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-foreground-secondary">Packets:</span>
                                    <AnimatedListItemBadge variant="default">
                                        {statistics.packetsReceived}/{statistics.packetsSent}
                                    </AnimatedListItemBadge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-foreground-secondary">Loss:</span>
                                    <AnimatedListItemBadge
                                        variant={
                                            statistics.packetLossPercentage === 0
                                                ? 'result-positive'
                                                : 'result-negative'
                                        }
                                    >
                                        {statistics.packetLossPercentage}%
                                    </AnimatedListItemBadge>
                                </div>
                            </div>
                            <div className="space-y-1">
                                {statistics.minimumResponseTime !== undefined && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-foreground-secondary">Min:</span>
                                        <AnimatedListItemBadge variant="default">
                                            {statistics.minimumResponseTime.toFixed(1)}ms
                                        </AnimatedListItemBadge>
                                    </div>
                                )}
                                {statistics.maximumResponseTime !== undefined && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-foreground-secondary">Max:</span>
                                        <AnimatedListItemBadge variant="default">
                                            {statistics.maximumResponseTime.toFixed(1)}ms
                                        </AnimatedListItemBadge>
                                    </div>
                                )}
                                {statistics.averageResponseTime !== undefined && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-foreground-secondary">Avg:</span>
                                        <AnimatedListItemBadge variant="default">
                                            {statistics.averageResponseTime.toFixed(1)}ms
                                        </AnimatedListItemBadge>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Render the component
    return (
        <ToolResultAnimatedList<PingResultItemProperties>
            resultItems={properties.pingResultItems}
            renderFinalActions={renderFinalActions}
            isNegativeState={isNegativeState}
        />
    );
}
