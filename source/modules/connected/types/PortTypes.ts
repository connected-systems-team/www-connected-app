// Core port scan types - This extends the GraphQL PortScanCreateInput by allowing port to be a number
export interface PortScanInput {
    host: string;
    port: string | number;
    region: string;
}

export interface PortScanResult {
    host: string;
    port: string | number;
    state: PortState;
    region: string;
    timestamp: Date;
    executionId?: string;
}

// Enum of possible port states
export type PortState = 'open' | 'closed' | 'filtered' | 'unfiltered' | 'open|filtered' | 'closed|filtered' | 'unknown';

// User-friendly port state descriptions
export interface PortStateDescription {
    state: PortState;
    description: string;
}

export const PortStateDescriptions: Record<PortState, string> = {
    open: 'open',
    closed: 'closed',
    filtered: 'filtered (firewall may be blocking)', // We'll strip the parentheses part in the UI
    unfiltered: 'unfiltered (but not open)',
    'open|filtered': 'either open or filtered (cannot determine precisely)',
    'closed|filtered': 'either closed or filtered (cannot determine precisely)',
    unknown: 'in an unknown state',
};

// Status updates for port scanning process
export interface PortScanStatusUpdate {
    message: string;
    isFinal: boolean;
    timestamp: Date;
    region?: string;
    type: 'info' | 'success' | 'error' | 'warning';
}

// Specific input/output types for port scan steps
export interface PortScanStepInput extends Record<string, unknown> {
    host: string;
    ports?: Array<string | { port: string }>;
    region?: string;
}

export interface PortScanStepResult {
    state: PortState;
    port?: string;
    hostIp?: string;
    latency?: string;
}

export interface PortScanStepOutput extends Record<string, unknown> {
    results?: PortScanStepResult[];
    ip?: string;
    status?: 'success' | 'error' | string;
    ports?: Array<{
        state: PortState;
        port: string;
    }>;
}
