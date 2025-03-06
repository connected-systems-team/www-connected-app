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
    systemError?: boolean; // Flag to indicate this is a system error rather than a port state result
    timeout?: boolean; // Flag to indicate the request timed out with no response
    errorMessage?: string; // Specific error message from the server
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
    filtered: 'filtered',
    unfiltered: 'unfiltered',
    'open|filtered': 'either open or filtered',
    'closed|filtered': 'either closed or filtered',
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
