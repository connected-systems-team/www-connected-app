// Dependencies - Types
import { ToolContentPart, ToolResultItemBase } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';

// Legacy types for backward compatibility
export type PingContentPart = ToolContentPart;
export type PingContentBadge = Extract<ToolContentPart, { type: 'badge' }>;
export type PingContentText = Extract<ToolContentPart, { type: 'text' }>;

// Interface for individual ping result
export interface PingResult {
    sequence: number;
    responseTime: number; // in milliseconds
    ttl: number;
    timestamp: string;
    isSuccess: boolean;
}

// Interface for ping statistics
export interface PingStatistics {
    packetsSent: number;
    packetsReceived: number;
    packetsLost: number;
    packetLossPercentage: number;
    minimumResponseTime?: number;
    maximumResponseTime?: number;
    averageResponseTime?: number;
}

// Interface for ping result item
export interface PingResultItemProperties extends ToolResultItemBase {
    host: string;
    count: number;
    timeout?: number;
    region?: string;
    results?: PingResult[];
    statistics?: PingStatistics;
    resolvedIpAddress?: string;
    isSuccess?: boolean;
}
