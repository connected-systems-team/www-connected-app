// Dependencies - React and Next.js
import React from 'react';

// Dependencies - Types
import { DnsRecordType } from '@project/source/api/graphql/generated/graphql';
import {
    DnsLookupResultItemProperties,
    DnsRecordResult,
} from '@project/app/(main-layout)/tools/dns-lookup/_types/DnsLookupTypes';

// Dependencies - Main Components
import { ToolResultAnimatedList } from '@project/app/(main-layout)/tools/_components/ToolResultAnimatedList';
import { AnimatedListItemBadge } from '@project/source/common/animations/AnimatedListItemBadge';
import { CopyButton } from '@structure/source/common/buttons/CopyButton';

// Component - DnsLookupResultsAnimatedList
export interface DnsLookupResultsAnimatedListProperties {
    dnsLookupResultItems: DnsLookupResultItemProperties[];
}
export function DnsLookupResultsAnimatedList(properties: DnsLookupResultsAnimatedListProperties) {
    // Function to determine if an item is in a negative state
    function isNegativeState(item: DnsLookupResultItemProperties): boolean {
        return !item.isSuccess || !!item.errorCode;
    }

    // Function to render final actions with DNS-specific logic
    function renderFinalActions(item: DnsLookupResultItemProperties, displayText: string): React.ReactNode {
        return (
            <div className="w-full">
                <div className="flex items-center">
                    {/* Only show copy button for error cases or when there are no records */}
                    {(!item.records || item.records.length === 0 || !item.isSuccess) && (
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
                {/* Always show detailed records when available */}
                {item.records && item.records.length > 0 && renderDnsRecordDetails(item.records)}
            </div>
        );
    }

    // Function to render detailed DNS records
    function renderDnsRecordDetails(records: DnsRecordResult[]): React.ReactNode {
        return (
            <div className="mt-3 space-y-3 rounded-lg bg-background-tertiary p-3">
                {records.map(function (record, recordIndex) {
                    const isClickableRecord =
                        record.type === DnsRecordType.A ||
                        record.type === DnsRecordType.Aaaa ||
                        record.type === DnsRecordType.Cname;
                    const isIpAddress = record.type === DnsRecordType.A || record.type === DnsRecordType.Aaaa;

                    return (
                        <div key={recordIndex} className="space-y-1">
                            {/* Main record line */}
                            <div className="flex items-center justify-between text-xs">
                                <div className="flex flex-wrap items-center gap-2">
                                    <AnimatedListItemBadge variant="record-type">{record.type}</AnimatedListItemBadge>
                                    <AnimatedListItemBadge
                                        variant={isIpAddress ? 'ip-address' : 'record-value'}
                                        href={
                                            isClickableRecord && record.value
                                                ? record.type === DnsRecordType.A || record.type === DnsRecordType.Aaaa
                                                    ? `http://${record.value}`
                                                    : undefined
                                                : undefined
                                        }
                                        target="_blank"
                                    >
                                        {record.value}
                                    </AnimatedListItemBadge>
                                    {record.priority !== undefined && (
                                        <span className="text-foreground-secondary">Priority: {record.priority}</span>
                                    )}
                                    {record.weight !== undefined && (
                                        <span className="text-foreground-secondary">Weight: {record.weight}</span>
                                    )}
                                    {record.port !== undefined && (
                                        <span className="text-foreground-secondary">Port: {record.port}</span>
                                    )}
                                    {record.ttl !== undefined && (
                                        <span className="text-foreground-secondary">TTL: {record.ttl}s</span>
                                    )}
                                </div>
                                <CopyButton
                                    iconClassName="h-3 w-3"
                                    value={record.value}
                                    notice={{
                                        title: 'Copied to Clipboard',
                                        content: `${record.type}: ${record.value}`,
                                    }}
                                />
                            </div>

                            {/* SOA record details */}
                            {record.type === DnsRecordType.Soa && (
                                <div className="ml-4 space-y-1 text-xs text-foreground-secondary">
                                    {record.hostmaster && <div>Hostmaster: {record.hostmaster}</div>}
                                    {record.serial !== undefined && <div>Serial: {record.serial}</div>}
                                    {record.refresh !== undefined && <div>Refresh: {record.refresh}s</div>}
                                    {record.retry !== undefined && <div>Retry: {record.retry}s</div>}
                                    {record.expire !== undefined && <div>Expire: {record.expire}s</div>}
                                    {record.minttl !== undefined && <div>Min TTL: {record.minttl}s</div>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    // Render the component
    return (
        <ToolResultAnimatedList<DnsLookupResultItemProperties>
            resultItems={properties.dnsLookupResultItems}
            renderFinalActions={renderFinalActions}
            isNegativeState={isNegativeState}
        />
    );
}
