// Dependencies - Types
import { PortStateType } from '@project/app/(main-layout)/tools/port-checker/_api/PortCheckStatusAdapter';
import { ToolContentPart, ToolResultItemBase } from '@project/app/(main-layout)/tools/_types/ToolContentTypes';

// Legacy types for backward compatibility
export type PortCheckContentPart = ToolContentPart;
export type PortCheckContentBadge = Extract<ToolContentPart, { type: 'badge' }>;
export type PortCheckContentText = Extract<ToolContentPart, { type: 'text' }>;

// Interface for status item with associated port state
export interface PortCheckStatusItemProperties extends ToolResultItemBase {
    portState: PortStateType;
    host?: string;
    port?: number;
}
