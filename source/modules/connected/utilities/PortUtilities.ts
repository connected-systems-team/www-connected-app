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

/**
 * Creates a web URL for a host based on port (HTTP/HTTPS)
 * @param host The hostname to create a URL for
 * @param port The port number (typically 80 or 443)
 * @returns A fully qualified URL if the port represents a web service, or null otherwise
 */
export function createWebUrlFromHostAndPort(host: string, port: number): string | null {
    // Skip IP addresses
    if(isIpAddress(host)) {
        return null;
    }

    // For port 80, create an HTTP URL
    if(port === 80) {
        return `http://${host}`;
    }

    // For port 443, create an HTTPS URL
    if(port === 443) {
        return `https://${host}`;
    }

    // Not a standard web port
    return null;
}

/**
 * Checks if a host and port combination could have a web link
 *
 * @param host Hostname to check
 * @param port Port number to check
 * @param state Port state (must be 'open' for links)
 * @param hasError Whether there was an error or timeout
 * @returns Object with url and text parts if linkable, null otherwise
 */
export interface HostLinkData {
    url: string;
    beforeText: string;
    hostText: string;
    afterText: string;
}

export function getHostLinkData(
    host: string | undefined,
    port: number | undefined,
    state: string,
    displayText: string,
    hasError: boolean = false,
): HostLinkData | null {
    // Only create links for web ports (80, 443) when they're open and there's no error
    if(!host || !port || !(port === 80 || port === 443) || state !== 'open' || hasError) {
        return null;
    }

    // Try to get a URL for the host and port
    const url = createWebUrlFromHostAndPort(host, port);
    if(!url) {
        return null;
    }

    // Try to find the position of the host in the text
    const hostPattern = `on ${host}`;
    const index = displayText.indexOf(hostPattern);

    // If we can't find the host pattern in the text, return null
    if(index === -1) {
        return null;
    }

    // Extract the parts of the text
    const beforeText = displayText.substring(0, index + 3); // Include "on "
    const afterText = displayText.substring(index + hostPattern.length);

    // Return data for rendering a link
    return {
        url: url,
        beforeText: beforeText,
        hostText: host,
        afterText: afterText,
    };
}
