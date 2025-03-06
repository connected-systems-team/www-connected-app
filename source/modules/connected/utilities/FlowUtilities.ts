'use client'; // This utility uses client-only features

// Dependencies - Types
import { FlowStepExecution, GraphQlFlowStepExecutionResponse } from '../types/FlowTypes';
import { PortScanStepInput, PortScanStepOutput, PortState } from '../types/PortTypes';

// Dependencies - Utilities
import { extractPortFromStepInput, extractPortStateFromStepOutput } from './PortUtilities';

/**
 * Helper function to convert GraphQL response to our internal type
 */
export function convertGraphQlStepToFlowStepExecution(
    step: GraphQlFlowStepExecutionResponse,
    executionId: string,
): FlowStepExecution {
    return {
        id: step.stepId,
        executionId: step.flowExecutionId || executionId,
        status: step.status,
        actionType: step.actionType,
        input: typeof step.input === 'string' ? JSON.parse(step.input) : step.input || undefined,
        output: typeof step.output === 'string' ? JSON.parse(step.output) : step.output || undefined,
        errors: step.errors || undefined,
    };
}

/**
 * Extract data from a step execution input
 */
export function parseStepInput(input: any): any {
    if(typeof input === 'string') {
        try {
            return JSON.parse(input);
        }
        catch(error) {
            console.error('Error parsing step input:', error);
            return {};
        }
    }
    return input || {};
}

/**
 * Extract data from a step execution output
 */
export function parseStepOutput(output: any): any {
    if(typeof output === 'string') {
        try {
            return JSON.parse(output);
        }
        catch(error) {
            console.error('Error parsing step output:', error);
            return {};
        }
    }
    return output || {};
}

/**
 * Extract port scan history data from a flow execution
 * @param flowExecution The flow execution object from history data
 * @returns An object containing extracted port scan data
 */
export interface PortScanHistoryData {
    hostName: string;
    hostIp: string;
    port: string;
    portState: PortState;
    portIsOpen: boolean;
    latencyInMilliseconds: string;
    regionName: string;
}

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
                        const inputData = parseStepInput(step.input) as PortScanStepInput;
                        
                        hostName = inputData.host || hostName;
                        regionName = inputData.region || regionName;
                        
                        // Extract port from input
                        const extractedPort = extractPortFromStepInput(inputData);
                        if(extractedPort) {
                            port = extractedPort;
                        }
                    }
                    catch(e) {
                        console.error('Error parsing step input:', e);
                    }
                }

                // Extract from output
                if(step.output) {
                    try {
                        // Parse the output
                        const outputData = parseStepOutput(step.output) as PortScanStepOutput;
                        
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
                                    catch(e) {
                                        console.error('Error parsing latency:', e);
                                    }
                                }

                                // If we didn't get port from input, try from output port field
                                if(port === '-' && result.port) {
                                    port = result.port.split('/')[0] || port;
                                }
                            }
                        }
                    }
                    catch(e) {
                        console.error('Error parsing step output:', e);
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
