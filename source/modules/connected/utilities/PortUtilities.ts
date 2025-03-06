'use client'; // This utility uses client-only features

import { PortState, PortStateDescriptions, PortScanStepInput, PortScanStepOutput } from '../types/PortTypes';
import { isIpAddress } from '@structure/source/utilities/network/IpAddress';

/**
 * Get a user-friendly description for a port state
 */
export function getPortStateDescription(state: PortState): string {
    return PortStateDescriptions[state] || state;
}

/**
 * Extract port from different possible input formats
 */
export function extractPortFromStepInput(input: PortScanStepInput): string {
    let portNumber = '';

    if(input.ports) {
        if(Array.isArray(input.ports)) {
            if(typeof input.ports[0] === 'object') {
                portNumber = input.ports[0].port || '';
            }
            else {
                portNumber = input.ports[0] || '';
            }
        }
    }

    return portNumber;
}

/**
 * Extract port state from port scan output
 */
export function extractPortStateFromStepOutput(output: PortScanStepOutput): PortState {
    let portState: PortState = 'unknown';

    if(output.ports && output.ports.length > 0 && output.ports[0] && output.ports[0].state) {
        portState = output.ports[0].state;
    }
    else if(output.results && output.results.length > 0 && output.results[0] && output.results[0].state) {
        portState = output.results[0].state;
    }
    else if(
        output.status === 'success' &&
        output.results &&
        output.results.length > 0 &&
        output.results[0] &&
        output.results[0].port
    ) {
        const portResult = output.results[0];
        if(portResult.port && typeof portResult.port === 'string' && portResult.port.includes('/tcp')) {
            // For successful TCP port checks without explicit state, assume open
            portState = 'open';
        }
    }

    return portState;
}
