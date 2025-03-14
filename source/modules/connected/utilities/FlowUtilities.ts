'use client'; // This utility uses client-only features

// Dependencies - Types
import { FlowStepExecution, GraphQlFlowStepExecutionResponse } from '../types/FlowTypes';
import { PortScanStepInput, PortScanStepOutput, PortState } from '../types/PortTypes';

// Dependencies - Utilities
import { extractPortFromStepInput, extractPortStateFromStepOutput } from './PortUtilities';

/**
 * Convert GraphQL step execution response to our internal FlowStepExecution type
 * @param step The GraphQL step execution response
 * @param executionId The flow execution ID
 * @returns A formatted FlowStepExecution object
 */
export function convertGraphQlStepToFlowStepExecution(
    step: GraphQlFlowStepExecutionResponse,
    executionId: string,
): FlowStepExecution {
    return {
        stepId: step.stepId,
        executionId: step.flowExecutionId || executionId,
        status: step.status,
        actionType: step.actionType,
        input: parseStepInput(step.input),
        output: parseStepOutput(step.output),
        errors: step.errors || undefined,
    };
}

/**
 * Step execution input can be a string (serialized JSON) or an object
 */
export type StepInputType = string | Record<string, unknown> | null | undefined;

/**
 * Step execution output can be a string (serialized JSON) or an object
 */
export type StepOutputType = string | Record<string, unknown> | null | undefined;

/**
 * Parse step execution input into a structured object
 * @param input The input to parse (string or object)
 * @returns Parsed object or empty object if parsing fails
 */
export function parseStepInput<T = Record<string, unknown>>(input: StepInputType): T {
    if(typeof input === 'string') {
        try {
            return JSON.parse(input) as T;
        }
        catch(error) {
            console.error('Error parsing step input:', error);
            return {} as T;
        }
    }

    if(!input) {
        return {} as T;
    }

    // Cast to T as it's an object and should match the expected structure
    return input as unknown as T;
}

/**
 * Parse step execution output into a structured object
 * @param output The output to parse (string or object)
 * @returns Parsed object or empty object if parsing fails
 */
export function parseStepOutput<T = Record<string, unknown>>(output: StepOutputType): T {
    if(typeof output === 'string') {
        try {
            return JSON.parse(output) as T;
        }
        catch(error) {
            console.error('Error parsing step output:', error);
            return {} as T;
        }
    }

    if(!output) {
        return {} as T;
    }

    // Cast to T as it's an object and should match the expected structure
    return output as unknown as T;
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
