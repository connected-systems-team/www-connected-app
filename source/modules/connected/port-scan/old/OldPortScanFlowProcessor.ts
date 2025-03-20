'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowExecutionStatus,
    GraphQlFlowExecutionResponse,
    GraphQlFlowStepExecutionResponse,
} from '@project/source/modules/connected/flows/types/FlowTypes';
import {
    PortScanResultInterface,
    PortScanStatusUpdateInterface,
    NmapPortStateType,
    PortScanFlowStepInputInterface,
} from '@project/source/modules/connected/port-scan/types/PortScanTypes';

// Dependencies - Services
import { StepProcessor } from './OldPortScanFlowStepProcessor';

// Dependencies - Utilities
import { convertGraphQlStepToFlowStepExecution } from '@project/source/modules/connected/flows/utilities/FlowUtilities';

/**
 * Class for processing flow execution data
 */
export class FlowProcessor {
    private onStatusUpdate: (update: PortScanStatusUpdateInterface) => void;
    private onResult: (result: PortScanResultInterface) => void;
    private stepProcessor: StepProcessor;
    private currentExecutionId: string | undefined;

    constructor(
        onStatusUpdate: (update: PortScanStatusUpdateInterface) => void,
        onResult: (result: PortScanResultInterface) => void,
        stepProcessor: StepProcessor,
    ) {
        this.onStatusUpdate = onStatusUpdate;
        this.onResult = onResult;
        this.stepProcessor = stepProcessor;
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
        let portState: NmapPortStateType = 'unknown';
        let errorMessage = '';
        let isUnresolvedDomain = false;
        let isHostResolutionError = false;
        let isHostDown = false;

        // Extract info from stepExecutions
        const stepExecutions = flowExecution.stepExecutions || [];
        for(const rawStep of stepExecutions) {
            // Convert to our internal format
            const step = convertGraphQlStepToFlowStepExecution(
                rawStep as GraphQlFlowStepExecutionResponse,
                flowExecution.id,
            );

            // Check if this is a domain resolution failure (hostsUp=0, addressesScanned=0)
            // or a host down error
            if(step.output) {
                try {
                    const output = typeof step.output === 'string' ? JSON.parse(step.output) : step.output;

                    if(output.hostsUp === 0 && output.addressesScanned === 0) {
                        isUnresolvedDomain = true;
                    }

                    // Check for "Host is down" error with hostsUp=0
                    if(
                        output.hostsUp === 0 &&
                        output.error &&
                        output.error.message &&
                        output.error.message.includes('Host is down')
                    ) {
                        // Set error message and mark as host down
                        errorMessage = 'Host is down or not responding.';
                        isHostDown = true;
                    }
                }
                catch(error) {
                    console.error('Error checking for unresolved domain or host down:', error);
                }
            }

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
                    let input: PortScanFlowStepInputInterface;
                    if(typeof inputData === 'string') {
                        try {
                            input = JSON.parse(inputData) as PortScanFlowStepInputInterface;
                        }
                        catch(error) {
                            console.error('Error parsing flow input:', error);
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
            catch(error) {
                console.error('Error parsing flow input:', error);
            }
        }

        // Check for global errors
        if(flowExecution.errors && flowExecution.errors.length > 0 && flowExecution.errors[0]) {
            errorMessage = flowExecution.errors[0].message || 'An error occurred';
        }

        // Look directly in the steps for host resolution errors
        if(stepExecutions && stepExecutions.length > 0) {
            for(const step of stepExecutions) {
                if(step.status === 'Failed' && step.errors && step.errors.length > 0) {
                    // Look for host resolution errors
                    const stepErrorMsg = step.errors[0]?.message;

                    if(stepErrorMsg && stepErrorMsg.includes('Failed to resolve host')) {
                        // Found host resolution error in step
                        errorMessage = 'Failed to resolve host: The hostname could not be found.';
                        isHostResolutionError = true;
                        break;
                    }
                }
            }
        }

        // Mark host resolution issues even from successful steps with hostsUp=0 and addressesScanned=0
        if(isUnresolvedDomain) {
            errorMessage = 'Failed to resolve host: The hostname could not be found.';
            isHostResolutionError = true;
        }

        // Check for flow execution failure
        if(flowExecution.status === FlowExecutionStatus.Failed) {
            if(!errorMessage) {
                errorMessage = 'Internal server error: The port check service is currently experiencing issues';
            }
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

            // For system errors, we'll emit a special system error result
            // This will help UI differentiate between port states and system errors
            if(host && port) {
                let specificErrorMessage: string | undefined = undefined;

                if(isHostResolutionError) {
                    specificErrorMessage = 'Failed to resolve host.';
                }
                else if(isHostDown) {
                    specificErrorMessage = 'Host is down.';
                }

                this.onResult({
                    host,
                    port,
                    state: 'unknown',
                    region: regionIdentifier,
                    timestamp: new Date(),
                    executionId: this.currentExecutionId,
                    systemError: true, // Flag that this is a system error, not a port state
                    errorMessage: specificErrorMessage,
                });
            }
        }
        // Emit result if we have enough info
        else if(host && port && portState && regionIdentifier) {
            this.onResult({
                host,
                port,
                state: portState,
                region: regionIdentifier,
                timestamp: new Date(),
                executionId: this.currentExecutionId,
            });
        }
        // Handle case where we have host/port but not state (assume success means open)
        else if(host && port && flowExecution.status === FlowExecutionStatus.Success && regionIdentifier) {
            this.onResult({
                host,
                port,
                state: 'open', // Assume open if successful
                region: regionIdentifier,
                timestamp: new Date(),
                executionId: this.currentExecutionId,
            });
        }
        // Handle case where we're missing data
        else if(regionIdentifier) {
            this.onStatusUpdate({
                message: "Port scan completed but couldn't determine exact status",
                isFinal: true,
                timestamp: new Date(),
                region: regionIdentifier,
                type: 'warning',
            });
        }
        // Otherwise silently complete the flow without additional messages
    }
}

// Export - Default
export default FlowProcessor;
