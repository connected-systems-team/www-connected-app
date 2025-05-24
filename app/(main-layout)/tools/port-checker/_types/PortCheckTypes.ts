// Dependencies - Types
import { PortStateType } from '@project/app/(main-layout)/tools/port-checker/_adapters/PortCheckStatusAdapter';

// Types for structured content
export interface PortCheckContentBadge {
    type: 'badge';
    variant: 'host' | 'port' | 'region' | 'port-state-positive' | 'port-state-negative';
    content: string;
    href?: string;
    target?: '_blank' | '_self';
}

export interface PortCheckContentText {
    type: 'text';
    content: string;
}

export type PortCheckContentPart = PortCheckContentBadge | PortCheckContentText;

// Interface for status item with associated port state
export interface PortCheckStatusItemProperties {
    portState: PortStateType;
    content?: PortCheckContentPart[];
    text?: string; // Keep for backward compatibility and copy functionality
    host?: string;
    port?: number;
    errorCode?: string; // Error code from PortCheckFlowServiceErrors or FlowServiceErrors
    isFinal?: boolean;
}
