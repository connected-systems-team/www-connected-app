'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowExecutionStatus,
    FlowStepExecutionStatus,
    GraphQlFlowStepExecutionResponse,
} from '@project/source/modules/connected/types/FlowTypes';
import { PortScanStatusUpdate } from '@project/source/modules/connected/types/PortTypes';

// Dependencies - API
import { ApolloClient } from '@apollo/client';
import { PortScanDocument } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - Services
import { FlowProcessor } from './FlowProcessor';
import { StepProcessor } from './StepProcessor';

// Dependencies - Utilities
import { convertGraphQlStepToFlowStepExecution } from '@project/source/modules/connected/utilities/FlowUtilities';

/**
 * Class for handling polling functionality as a fallback for WebSockets
 */
export class PollingService {
    private apolloClient: ApolloClient<object>;
    private onStatusUpdate: (update: PortScanStatusUpdate) => void;
    private flowProcessor: FlowProcessor;
    private stepProcessor: StepProcessor;
    private pollingInterval: number;
    private pollingTimeoutId: NodeJS.Timeout | undefined;

    constructor(
        apolloClient: ApolloClient<object>,
        onStatusUpdate: (update: PortScanStatusUpdate) => void,
        flowProcessor: FlowProcessor,
        stepProcessor: StepProcessor,
        pollingInterval: number,
    ) {
        this.apolloClient = apolloClient;
        this.onStatusUpdate = onStatusUpdate;
        this.flowProcessor = flowProcessor;
        this.stepProcessor = stepProcessor;
        this.pollingInterval = pollingInterval;
    }

    /**
     * Clean up polling timeout
     */
    public cleanup(): void {
        if(this.pollingTimeoutId) {
            clearTimeout(this.pollingTimeoutId);
            this.pollingTimeoutId = undefined;
        }
    }

    /**
     * Poll for port scan results using GraphQL
     */
    public async pollPortScan(executionId: string | undefined, isActive: boolean): Promise<boolean> {
        if(!executionId || !isActive) {
            return false; // Not complete, since we didn't do anything
        }

        try {
            // Query the port scan from the GraphQL API
            const portScanQueryResult = await this.apolloClient.query({
                query: PortScanDocument,
                variables: {
                    input: {
                        executionId: executionId,
                    },
                },
                fetchPolicy: 'no-cache',
            });

            const flowExecution = portScanQueryResult.data.portScan;

            // Check if we received port scan data
            if(!flowExecution) {
                if(isActive) {
                    this.pollingTimeoutId = setTimeout(
                        () => this.pollPortScan(executionId, isActive),
                        this.pollingInterval,
                    );
                }
                return false; // Not complete, need to poll again
            }

            // Process all step executions to find results
            if(flowExecution.stepExecutions && flowExecution.stepExecutions.length > 0) {
                for(const step of flowExecution.stepExecutions as unknown as GraphQlFlowStepExecutionResponse[]) {
                    // Check if this is a port scan step with results
                    if(step.actionType === 'PortScan' && step.status === FlowStepExecutionStatus.Success) {
                        // Convert to our internal FlowStepExecution type
                        const stepExecution = convertGraphQlStepToFlowStepExecution(step, flowExecution.id);
                        console.log('PollingService: Processing port scan step', {
                            stepId: step.stepId,
                            status: step.status,
                            hasOutput: !!step.output,
                            output: step.output ? JSON.stringify(step.output) : null,
                        });
                        const isComplete = this.stepProcessor.processStepExecution(stepExecution);
                        console.log('PollingService: Step complete?', isComplete);

                        // If step processing indicates it's complete, we should stop
                        if(isComplete) {
                            console.log('PollingService: Step processing reports complete, will not poll again');
                            return true; // Complete, stop polling this execution
                        }
                    }
                }
            }

            // If flow execution still running, continue polling
            if(
                isActive &&
                flowExecution.status !== FlowExecutionStatus.Success &&
                flowExecution.status !== FlowExecutionStatus.Failed
            ) {
                this.pollingTimeoutId = setTimeout(
                    () => this.pollPortScan(executionId, isActive),
                    this.pollingInterval,
                );
                return false; // Not complete, need to poll again
            }
            // If completed but no results, try extract from other sources
            else if(flowExecution.status === FlowExecutionStatus.Success) {
                this.flowProcessor.processFlowExecution(flowExecution as unknown as any);
                return true; // Flow is complete, no need to poll again
            }
            // Handle errors
            else if(flowExecution.status === FlowExecutionStatus.Failed) {
                const errorMessage =
                    flowExecution.errors && flowExecution.errors.length > 0 && flowExecution.errors[0]
                        ? flowExecution.errors[0].message || 'Port scan failed'
                        : 'Port scan failed';

                this.onStatusUpdate({
                    message: errorMessage,
                    isFinal: true,
                    timestamp: new Date(),
                    type: 'error',
                });

                // Process the flow to extract any relevant info
                this.flowProcessor.processFlowExecution(flowExecution as unknown as any);
                return true; // Complete with error
            }

            // If we got here without returning, we're not complete
            return false;
        }
        catch(error) {
            console.error('Polling error:', error);

            if(isActive) {
                this.pollingTimeoutId = setTimeout(
                    () => this.pollPortScan(executionId, isActive),
                    this.pollingInterval,
                );
            }
            return false; // Not complete due to error
        }
    }
}

// Export - Default
export default PollingService;
