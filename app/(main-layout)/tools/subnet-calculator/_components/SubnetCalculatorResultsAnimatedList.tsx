// Dependencies - React
import React from 'react';

// Dependencies - Main Components
import { CopyButton } from '@structure/source/common/buttons/CopyButton';
import { AnimatedListItem } from '@project/source/common/animations/AnimatedListItem';
import { AnimatedListItemBadge } from '@project/source/common/animations/AnimatedListItemBadge';

// Dependencies - Types
import {
    SubnetCalculatorResultItemInterface,
    SubnetCalculatorResultsAnimatedListProperties,
} from '@project/app/(main-layout)/tools/subnet-calculator/_types/SubnetCalculatorTypes';

// Component - SubnetCalculatorResultsAnimatedList
export function SubnetCalculatorResultsAnimatedList(properties: SubnetCalculatorResultsAnimatedListProperties) {
    // Function to render a clean subnet result item
    function renderSubnetResult(item: SubnetCalculatorResultItemInterface, index: number): React.ReactNode {
        if(!item.calculation) {
            // Show processing state or errors
            return (
                <AnimatedListItem
                    key={index}
                    content={
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {item.content?.map((part, partIndex) => {
                                    if(part.type === 'badge') {
                                        return (
                                            <AnimatedListItemBadge key={partIndex} variant={part.variant}>
                                                {part.content}
                                            </AnimatedListItemBadge>
                                        );
                                    }
                                    return <span key={partIndex}>{part.content}</span>;
                                })}
                            </div>
                        </div>
                    }
                    isFinal={item.isFinal}
                    isFirst={index === 0}
                    isActive={true}
                    hasNextItem={false}
                />
            );
        }

        const calculation = item.calculation;
        const isError = !calculation.isValidNetwork;

        if(isError) {
            return (
                <AnimatedListItem 
                    key={index} 
                    content={
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AnimatedListItemBadge variant="result-negative">Error</AnimatedListItemBadge>
                                <span>{calculation.errorMessage || 'Invalid subnet configuration'}</span>
                            </div>
                            <CopyButton
                                iconClassName="h-3.5 w-3.5"
                                value={calculation.errorMessage || 'Error'}
                                notice={{
                                    title: 'Copied to Clipboard',
                                    content: 'Error message copied',
                                }}
                            />
                        </div>
                    }
                    isFinal={true}
                    isFirst={index === 0}
                    isActive={true}
                    hasNextItem={false}
                />
            );
        }

        // Create copy text for all details
        const copyText = `Subnet Calculation Results\n\nInput: ${calculation.inputIpAddress}/${calculation.cidrNotation.replace('/', '')}\n\nNetwork Information:\nNetwork Address: ${calculation.networkAddress}\nBroadcast Address: ${calculation.broadcastAddress}\nSubnet Mask: ${calculation.subnetMask}\nWildcard Mask: ${calculation.wildcardMask}\nCIDR Notation: ${calculation.cidrNotation}\n\nHost Information:\nFirst Host: ${calculation.firstHostAddress}\nLast Host: ${calculation.lastHostAddress}\nTotal Hosts: ${calculation.totalHosts.toLocaleString()}\nUsable Hosts: ${calculation.usableHosts.toLocaleString()}\n\nClassification:\nNetwork Class: Class ${calculation.networkClass}${calculation.isPrivate ? '\nNetwork Type: Private' : ''}`;

        return (
            <AnimatedListItem 
                key={index} 
                content={
                    <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AnimatedListItemBadge variant="result-positive">Valid Network</AnimatedListItemBadge>
                            <AnimatedListItemBadge variant="ip-address">{calculation.inputIpAddress}</AnimatedListItemBadge>
                            <AnimatedListItemBadge variant="default">{calculation.cidrNotation}</AnimatedListItemBadge>
                        </div>
                        <CopyButton
                            iconClassName="h-3.5 w-3.5"
                            value={copyText}
                            notice={{
                                title: 'Copied to Clipboard',
                                content: 'Subnet details copied',
                            }}
                        />
                    </div>

                    {/* Network Information */}
                    <div className="rounded-lg bg-background-tertiary p-4">
                        <h4 className="mb-3 text-sm font-medium text-foreground">Network Information</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-foreground-secondary">Network:</span>
                                <div className="flex items-center gap-2">
                                    <AnimatedListItemBadge variant="ip-address">{calculation.networkAddress}</AnimatedListItemBadge>
                                    <CopyButton
                                        iconClassName="h-3 w-3"
                                        value={calculation.networkAddress}
                                        notice={{
                                            title: 'Copied to Clipboard',
                                            content: 'Network address copied',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-foreground-secondary">Broadcast:</span>
                                <div className="flex items-center gap-2">
                                    <AnimatedListItemBadge variant="ip-address">{calculation.broadcastAddress}</AnimatedListItemBadge>
                                    <CopyButton
                                        iconClassName="h-3 w-3"
                                        value={calculation.broadcastAddress}
                                        notice={{
                                            title: 'Copied to Clipboard',
                                            content: 'Broadcast address copied',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-foreground-secondary">Subnet Mask:</span>
                                <span className="font-mono text-xs">{calculation.subnetMask}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-foreground-secondary">Wildcard Mask:</span>
                                <span className="font-mono text-xs">{calculation.wildcardMask}</span>
                            </div>
                        </div>
                    </div>

                    {/* Host Information */}
                    <div className="rounded-lg bg-background-tertiary p-4">
                        <h4 className="mb-3 text-sm font-medium text-foreground">Host Information</h4>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-foreground-secondary">First Host:</span>
                                <div className="flex items-center gap-2">
                                    <AnimatedListItemBadge variant="ip-address">{calculation.firstHostAddress}</AnimatedListItemBadge>
                                    <CopyButton
                                        iconClassName="h-3 w-3"
                                        value={calculation.firstHostAddress}
                                        notice={{
                                            title: 'Copied to Clipboard',
                                            content: 'First host address copied',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-foreground-secondary">Last Host:</span>
                                <div className="flex items-center gap-2">
                                    <AnimatedListItemBadge variant="ip-address">{calculation.lastHostAddress}</AnimatedListItemBadge>
                                    <CopyButton
                                        iconClassName="h-3 w-3"
                                        value={calculation.lastHostAddress}
                                        notice={{
                                            title: 'Copied to Clipboard',
                                            content: 'Last host address copied',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-foreground-secondary">Total Hosts:</span>
                                <AnimatedListItemBadge variant="default">{calculation.totalHosts.toLocaleString()}</AnimatedListItemBadge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-foreground-secondary">Usable Hosts:</span>
                                <AnimatedListItemBadge variant="result-positive">{calculation.usableHosts.toLocaleString()}</AnimatedListItemBadge>
                            </div>
                        </div>
                    </div>

                    {/* Classification & Binary Info */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Classification */}
                        <div className="rounded-lg bg-background-tertiary p-4">
                            <h4 className="mb-3 text-sm font-medium text-foreground">Classification</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-foreground-secondary">Network Class:</span>
                                    <AnimatedListItemBadge variant="default">Class {calculation.networkClass}</AnimatedListItemBadge>
                                </div>
                                {calculation.isPrivate && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-foreground-secondary">Network Type:</span>
                                        <AnimatedListItemBadge variant="default">Private</AnimatedListItemBadge>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Binary Representation */}
                        <div className="rounded-lg bg-background-tertiary p-4">
                            <h4 className="mb-3 text-sm font-medium text-foreground">Binary</h4>
                            <div className="space-y-2 text-xs">
                                <div>
                                    <div className="text-foreground-secondary">Network:</div>
                                    <div className="font-mono">{calculation.binaryNetworkAddress}</div>
                                </div>
                                <div>
                                    <div className="text-foreground-secondary">Subnet Mask:</div>
                                    <div className="font-mono">{calculation.binarySubnetMask}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                }
                isFinal={true}
                isFirst={index === 0}
                isActive={true}
                hasNextItem={false}
            />
        );
    }

    // Render the component
    return (
        <div className="space-y-4">
            {properties.resultItems.map((item, index) => renderSubnetResult(item, index))}
        </div>
    );
}
