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
import { extractPortFromStepInput, extractPortStateFromStepOutput } from '@project/source/modules/connected/utilities/PortUtilities';

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
                // Parse input and output if they're strings
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
                        message: `Server scan complete`,
                        isFinal: false,
                        timestamp: new Date(),
                        region: region,
                        type: 'info',
                    });

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
            catch(e) {
                console.error('Error extracting region from step execution:', e);
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
            catch(e) {
                console.error('Error parsing step input:', e);
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

        // Get error info if present
        if(step.errors && step.errors.length > 0 && step.errors[0]) {
            callbacks.onError(step.errors[0].message || 'An error occurred');
        }
    }
}

// Export - Default
export default StepProcessor;
