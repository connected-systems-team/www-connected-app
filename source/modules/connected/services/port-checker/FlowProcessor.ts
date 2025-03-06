'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowExecutionStatus,
    GraphQlFlowExecutionResponse,
    GraphQlFlowStepExecutionResponse,
} from '@project/source/modules/connected/types/FlowTypes';
import {
    PortScanResult,
    PortScanStatusUpdate,
    PortState,
    PortScanStepInput,
} from '@project/source/modules/connected/types/PortTypes';

// Dependencies - Services
import { StepProcessor } from './StepProcessor';

// Dependencies - Utilities
import { convertGraphQlStepToFlowStepExecution } from '@project/source/modules/connected/utilities/FlowUtilities';

/**
 * Class for processing flow execution data
 */
export class FlowProcessor {
    private onStatusUpdate: (update: PortScanStatusUpdate) => void;
    private onResult: (result: PortScanResult) => void;
    private stepProcessor: StepProcessor;
    private currentExecutionId: string | undefined;
    private pendingResults: Set<string>;

    constructor(
        onStatusUpdate: (update: PortScanStatusUpdate) => void,
        onResult: (result: PortScanResult) => void,
        stepProcessor: StepProcessor,
        pendingResults: Set<string>,
    ) {
        this.onStatusUpdate = onStatusUpdate;
        this.onResult = onResult;
        this.stepProcessor = stepProcessor;
        this.pendingResults = pendingResults;
    }

    public setExecutionId(executionId: string | undefined): void {
        this.currentExecutionId = executionId;
        this.stepProcessor.setExecutionId(executionId);
    }

    /**
     * Process a complete flow execution to extract results
     */
    public processFlowExecution(flowExecution: GraphQlFlowExecutionResponse): void {
        // Extract host, port, region, and port state from the execution
        let host = '';
        let port = '';
        let regionIdentifier = '';
        let portState: PortState = 'unknown';
        let errorMessage = '';

        // Extract info from stepExecutions
        const stepExecutions = flowExecution.stepExecutions || [];
        for(const rawStep of stepExecutions) {
            // Convert to our internal format
            const step = convertGraphQlStepToFlowStepExecution(
                rawStep as GraphQlFlowStepExecutionResponse,
                flowExecution.id,
            );

            this.stepProcessor.extractDataFromStep(step, {
                onHostPortRegion: (data) => {
                    host = host || data.host;
                    port = port || data.port;
                    regionIdentifier = regionIdentifier || data.region;
                },
                onPortState: (state) => {
                    portState = state;
                },
                onError: (message) => {
                    errorMessage = message;
                },
            });
        }

        // Try to extract from flow execution input if still missing
        if(!host || !port) {
            try {
                const inputData = flowExecution.input;
                if(inputData) {
                    let input: PortScanStepInput;
                    if(typeof inputData === 'string') {
                        try {
                            input = JSON.parse(inputData) as PortScanStepInput;
                        }
                        catch(e) {
                            console.error('Error parsing flow input:', e);
                            return;
                        }
                    }
                    else {
                        input = inputData;
                    }
                    host = host || input.host;

                    // Handle different formats of port
                    if(input.ports && input.ports.length > 0) {
                        if(typeof input.ports[0] === 'string') {
                            port = port || input.ports[0];
                        }
                        else if(input.ports[0] && typeof input.ports[0] === 'object') {
                            // Check if the object has a port property
                            const portObject = input.ports[0] as { port?: string };
                            if(portObject.port) {
                                port = port || portObject.port;
                            }
                        }
                    }

                    regionIdentifier = regionIdentifier || input.region || '';
                }
            }
            catch(e) {
                console.error('Error parsing flow input:', e);
            }
        }

        // Check for global errors
        if(flowExecution.errors && flowExecution.errors.length > 0 && flowExecution.errors[0]) {
            errorMessage = flowExecution.errors[0].message || 'An error occurred';
        }

        // Handle error case
        if(errorMessage) {
            this.onStatusUpdate({
                message: errorMessage,
                isFinal: true,
                timestamp: new Date(),
                region: regionIdentifier,
                type: 'error',
            });

            // Still try to emit a result if we have enough info
            if(host && port) {
                this.onResult({
                    host,
                    port,
                    state: 'closed', // Assume closed on error
                    region: regionIdentifier,
                    timestamp: new Date(),
                    executionId: this.currentExecutionId,
                });
            }
        }
        // Emit result if we have enough info and region hasn't been processed yet
        else if(host && port && portState && regionIdentifier && this.pendingResults.has(regionIdentifier)) {
            this.onResult({
                host,
                port,
                state: portState,
                region: regionIdentifier,
                timestamp: new Date(),
                executionId: this.currentExecutionId,
            });
        }
        // Handle case where we have host/port but not state (assume success means open) and region hasn't been processed yet
        else if(
            host &&
            port &&
            flowExecution.status === FlowExecutionStatus.Success &&
            regionIdentifier &&
            this.pendingResults.has(regionIdentifier)
        ) {
            this.onResult({
                host,
                port,
                state: 'open', // Assume open if successful
                region: regionIdentifier,
                timestamp: new Date(),
                executionId: this.currentExecutionId,
            });
        }
        // Handle case where we're missing data and haven't already processed this region
        else if(regionIdentifier && this.pendingResults.has(regionIdentifier)) {
            this.onStatusUpdate({
                message: "Port scan completed but couldn't determine exact status",
                isFinal: true,
                timestamp: new Date(),
                region: regionIdentifier,
                type: 'warning',
            });
        }
        // Otherwise silently complete the flow without additional messages

        // Remove this region from pending
        if(regionIdentifier) {
            this.pendingResults.delete(regionIdentifier);
        }
    }
}

// Export - Default
export default FlowProcessor;
