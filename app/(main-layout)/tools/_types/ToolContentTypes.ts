// Unified content types for all tools

// Badge variants covering all tools
export type ToolContentBadgeVariant =
    // Port checker variants
    | 'host'
    | 'port'
    | 'region'
    | 'port-state-positive'
    | 'port-state-negative'
    // DNS lookup variants
    | 'domain'
    | 'record-type'
    | 'ip-address'
    | 'record-value'
    | 'result-positive'
    | 'result-negative'
    // WHOIS lookup variants
    | 'date'
    // Default variant for common use
    | 'default';

// Unified badge interface
export interface ToolContentBadge {
    type: 'badge';
    variant: ToolContentBadgeVariant;
    content: string;
    href?: string;
    target?: '_blank' | '_self';
}

// Unified text interface
export interface ToolContentText {
    type: 'text';
    content: string;
}

// Unified content part type
export type ToolContentPart = ToolContentBadge | ToolContentText;

// Base interface for tool result items
export interface ToolResultItemBase {
    content?: ToolContentPart[];
    text?: string; // Keep for backward compatibility and copy functionality
    errorCode?: string;
    isFinal?: boolean;
    isSuccess?: boolean; // Added for success state tracking
}
