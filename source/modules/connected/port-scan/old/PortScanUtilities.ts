'use client'; // This utility uses client-only features

import { PortState, PortStateDescriptions, PortScanStepInput, PortScanStepOutput } from '../types/PortTypes';
import { isIpAddress } from '@structure/source/utilities/network/IpAddress';

export function extractPortScanHistoryData(flowExecution: {
    id?: string;
    stepExecutions?: GraphQlFlowStepExecutionResponse[];
    createdAt?: string;
}): PortScanHistoryData {
    // Initialize with default values
    let hostName = '-';
    let hostIp = '-';
    let port = '-';
    let portState: PortState = 'unknown';
    let portIsOpen = false;
    let latencyInMilliseconds = '-';
    let regionName = '';

    // Look for the port scan step with results
    if(flowExecution.stepExecutions && flowExecution.stepExecutions.length > 0) {
        for(const step of flowExecution.stepExecutions) {
            if(step.actionType === 'PortScan' && step.status === 'Success') {
                // Extract from input
                if(step.input) {
                    try {
                        // Parse the input
                        const inputData = parseStepInput<PortScanStepInput>(step.input);

                        hostName = inputData.host || hostName;
                        regionName = inputData.region || regionName;

                        // Extract port from input
                        const extractedPort = extractPortFromStepInput(inputData);
                        if(extractedPort) {
                            port = extractedPort;
                        }
                    }
                    catch(error) {
                        console.error('Error parsing step input:', error);
                    }
                }

                // Extract from output
                if(step.output) {
                    try {
                        // Parse the output
                        const outputData = parseStepOutput<PortScanStepOutput>(step.output);

                        // Try to extract IP address if available
                        if(outputData.ip) {
                            hostIp = outputData.ip;
                        }

                        // Extract port state
                        const extractedPortState = extractPortStateFromStepOutput(outputData);
                        if(extractedPortState !== 'unknown') {
                            portState = extractedPortState;
                            portIsOpen = portState === 'open';
                        }

                        // Extract additional data from results
                        if(outputData.results && outputData.results.length > 0) {
                            const result = outputData.results[0];
                            if(result) {
                                // Try to get host IP from result if possible
                                if(result.hostIp) {
                                    hostIp = result.hostIp;
                                }

                                // Get latency if available
                                if(result.latency) {
                                    try {
                                        latencyInMilliseconds =
                                            Math.round(parseFloat(result.latency.replace('s', '')) * 1000) + ' ms';
                                    }
                                    catch(error) {
                                        console.error('Error parsing latency:', error);
                                    }
                                }

                                // If we didn't get port from input, try from output port field
                                if(port === '-' && result.port) {
                                    port = result.port.split('/')[0] || port;
                                }
                            }
                        }
                    }
                    catch(error) {
                        console.error('Error parsing step output:', error);
                    }
                }

                // Once we find a valid port scan step, we can break
                break;
            }
        }
    }

    return {
        hostName,
        hostIp,
        port,
        portState,
        portIsOpen,
        latencyInMilliseconds,
        regionName,
    };
}

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
