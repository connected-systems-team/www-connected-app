'use client'; // This service uses client-only features

// Dependencies - Types
import { FlowStepExecution, FlowStepExecutionStatus } from '@project/source/modules/connected/types/FlowTypes';
import {
    PortScanResult,
    PortScanStatusUpdate,
    PortState,
    PortScanStepInput,
    PortScanStepOutput,
} from '@project/source/modules/connected/types/PortTypes';

// Dependencies - Utilities
import { parseStepInput, parseStepOutput } from '@project/source/modules/connected/utilities/FlowUtilities';
import {
    extractPortFromStepInput,
    extractPortStateFromStepOutput,
} from '@project/source/modules/connected/utilities/PortUtilities';

/**
 * Class for processing step execution data and extracting results
 */
export class StepProcessor {
    private onStatusUpdate: (update: PortScanStatusUpdate) => void;
    private onResult: (result: PortScanResult) => void;
    private currentExecutionId: string | undefined;
    private pendingResults: Set<string>;

    constructor(
        onStatusUpdate: (update: PortScanStatusUpdate) => void,
        onResult: (result: PortScanResult) => void,
        pendingResults: Set<string>,
    ) {
        this.onStatusUpdate = onStatusUpdate;
        this.onResult = onResult;
        this.pendingResults = pendingResults;
    }

    public setExecutionId(executionId: string | undefined): void {
        this.currentExecutionId = executionId;
    }

    /**
     * Process a step execution to extract results
     */
    public processStepExecution(stepExecution: FlowStepExecution): boolean {
        // Check if this is a completed port scan step with results
        if(
            stepExecution.actionType === 'PortScan' &&
            stepExecution.status === FlowStepExecutionStatus.Success &&
            stepExecution.output &&
            stepExecution.input
        ) {
            try {
                // Parse input and output
                const input = parseStepInput(stepExecution.input) as PortScanStepInput;
                const output = parseStepOutput(stepExecution.output) as PortScanStepOutput;

                // Extract host, port, region from input
                const host = input.host;
                let portNumber = extractPortFromStepInput(input);
                const region = input.region || '';

                // Extract port state from output results
                const portState: PortState = extractPortStateFromStepOutput(output);

                // If we didn't get port from input, try from output
                if(!portNumber && output.results && output.results.length > 0) {
                    const result = output.results[0];
                    if(result && result.port) {
                        portNumber = result.port.split('/')[0] || '';
                    }
                }

                // If we have the key information, emit the result
                if(portState && portNumber && host) {
                    // Notify region completion
                    this.onStatusUpdate({
                        message: `Scan complete`,
                        isFinal: false,
                        timestamp: new Date(),
                        region: region,
                        type: 'info',
                    });

                    // Only emit result if this region hasn't been processed yet
                    if(this.pendingResults.has(region)) {
                        // Emit the result
                        this.onResult({
                            host,
                            port: portNumber,
                            state: portState,
                            region,
                            timestamp: new Date(),
                            executionId: this.currentExecutionId,
                        });

                        // Remove this region from pending
                        this.pendingResults.delete(region);
                    }

                    // Return true if all regions processed
                    return this.pendingResults.size === 0;
                }
                else {
                    // Just show progress update for this region
                    this.onStatusUpdate({
                        message: 'Processing...',
                        isFinal: false,
                        timestamp: new Date(),
                        region: region,
                        type: 'info',
                    });
                }
            }
            catch(error) {
                console.error('Error processing step execution:', error);
            }
        }
        // Check for failed port scan step with error information
        else if(
            stepExecution.actionType === 'PortScan' &&
            stepExecution.status === FlowStepExecutionStatus.Failed &&
            stepExecution.input &&
            stepExecution.errors &&
            stepExecution.errors.length > 0
        ) {
            try {
                // Parse input to get host, port, region
                const input = parseStepInput(stepExecution.input) as PortScanStepInput;
                const host = input.host;
                const portNumber = extractPortFromStepInput(input);
                const region = input.region || '';

                // Get the error message - we've already checked that errors exist and have at least one item
                const errorMessage =
                    stepExecution.errors[0] && stepExecution.errors[0].message
                        ? stepExecution.errors[0].message
                        : 'Unknown error';

                // Process failed step execution

                // Special handling for host resolution errors
                const isHostResolutionError = errorMessage.includes('Failed to resolve host');

                // Emit a status update with the error
                this.onStatusUpdate({
                    message: isHostResolutionError
                        ? 'Failed to resolve host: The hostname could not be found.'
                        : errorMessage,
                    isFinal: true,
                    timestamp: new Date(),
                    region: region,
                    type: 'error',
                });

                // If we have the key information, emit a result with systemError flag
                if(host && portNumber && this.pendingResults.has(region)) {
                    // Emit system error result for failed step

                    this.onResult({
                        host,
                        port: portNumber,
                        state: 'unknown',
                        region,
                        timestamp: new Date(),
                        executionId: this.currentExecutionId,
                        systemError: true,
                        errorMessage: errorMessage,
                    });

                    // Remove this region from pending
                    this.pendingResults.delete(region);
                }

                // Return true if all regions processed
                return this.pendingResults.size === 0;
            }
            catch(error) {
                console.error('Error processing failed step execution:', error);
            }
        }
        else {
            // Extract region if available for progress updates
            let regionIdentifier = '';
            try {
                if(stepExecution.input && typeof stepExecution.input === 'object' && stepExecution.input.region) {
                    regionIdentifier = stepExecution.input.region;
                }
                else if(typeof stepExecution.input === 'string') {
                    const input = JSON.parse(stepExecution.input);
                    regionIdentifier = input.region || '';
                }
            }
            catch(error) {
                console.error('Error extracting region from step execution:', error);
            }

            // Just show progress update
            this.onStatusUpdate({
                message: 'Processing step...',
                isFinal: false,
                timestamp: new Date(),
                region: regionIdentifier,
                type: 'info',
            });
        }

        return false;
    }

    /**
     * Extract data from a step execution for flow processing
     */
    public extractDataFromStep(
        step: FlowStepExecution,
        callbacks: {
            onHostPortRegion: (data: { host: string; port: string; region: string }) => void;
            onPortState: (state: PortState) => void;
            onError: (message: string) => void;
        },
    ): void {
        // Get host and port info from input
        if(step.input) {
            try {
                const input = parseStepInput(step.input) as PortScanStepInput;

                const host = input.host || '';
                const port = extractPortFromStepInput(input);
                const region = input.region || '';

                if(host || port || region) {
                    callbacks.onHostPortRegion({ host, port, region });
                }
            }
            catch(error) {
                console.error('Error parsing step input:', error);
            }
        }

        // Get port state from output
        if(step.output) {
            try {
                const output = parseStepOutput(step.output) as PortScanStepOutput;
                const portState = extractPortStateFromStepOutput(output);

                if(portState !== 'unknown') {
                    callbacks.onPortState(portState);
                }
            }
            catch(error) {
                console.error('Error parsing step output:', error);
            }
        }

        // Special handling for failed steps - check both status and errors
        if(step.status === FlowStepExecutionStatus.Failed && step.errors && step.errors.length > 0) {
            // Get the error message from the first error
            const errorMessage =
                step.errors[0] && step.errors[0].message ? step.errors[0].message : 'An error occurred';
            callbacks.onError(errorMessage);
        }
        // Fallback error handling for any errors that might be present
        else if(step.errors && step.errors.length > 0 && step.errors[0]) {
            const errorMessage = step.errors[0].message || 'An error occurred';
            callbacks.onError(errorMessage);
        }
    }
}

// Export - Default
export default StepProcessor;
