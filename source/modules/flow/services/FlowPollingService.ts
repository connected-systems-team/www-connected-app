'use client'; // This service uses client-only features

// Dependencies - Types
import { FlowExecution, FlowExecutionInput, FlowExecutionStatus } from '@project/source/api/GraphQlGeneratedCode';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { FlowExecutionDocument } from '@project/source/api/GraphQlGeneratedCode';

// Class - FlowPollingService
export class FlowPollingService {
    private pollingIntervalInMilliseconds: number;
    private pollingIntervalTimeout: NodeJS.Timeout | null = null;
    private flowExecutionId: string | null = null;
    private onPollResult: (flowExecution: FlowExecution) => void;
    private onPollError: (error: Error) => void;

    constructor(options: {
        pollingIntervalInMilliseconds?: number;
        onPollResult: (flowExecution: FlowExecution) => void;
        onPollError: (error: Error) => void;
    }) {
        this.pollingIntervalInMilliseconds = options.pollingIntervalInMilliseconds || 5000;
        this.onPollResult = options.onPollResult;
        this.onPollError = options.onPollError;
    }

    // Function to set the execution ID that this service is polling for
    public setFlowExecutionId(executionId: string | null): void {
        this.flowExecutionId = executionId;
    }

    // Function to get the execution ID that this service is polling for
    public getFlowExecutionId(): string | null {
        return this.flowExecutionId;
    }

    // Function to start polling for flow execution updates
    public startPolling(executionId?: string): void {
        // Set execution ID if provided
        if(executionId) {
            this.flowExecutionId = executionId;
        }

        // Don't start polling if we don't have an execution ID
        if(!this.flowExecutionId) return;

        // Clear any existing polling
        this.stopPolling();

        // Start polling at the configured interval
        this.pollingIntervalTimeout = setInterval(() => {
            this.pollFlowExecution();
        }, this.pollingIntervalInMilliseconds);

        // Do an immediate poll for initial state
        this.pollFlowExecution();
    }

    // Function to stop polling for flow execution updates
    public stopPolling(): void {
        if(this.pollingIntervalTimeout) {
            clearInterval(this.pollingIntervalTimeout);
            this.pollingIntervalTimeout = null;
        }
    }

    // Function to poll the flow execution from the GraphQL API
    public async pollFlowExecution(): Promise<void> {
        if(!this.flowExecutionId) return;

        try {
            // Query GraphQL API for flow execution status
            const flowExecutionQueryResult = await apolloClient.query({
                query: FlowExecutionDocument,
                variables: {
                    input: {
                        executionId: this.flowExecutionId,
                    } as FlowExecutionInput,
                },
                fetchPolicy: 'no-cache',
            });

            // If the query was successful
            if(flowExecutionQueryResult.data?.flowExecution) {
                // Cast to FlowExecution to handle GraphQL typing differences
                const flowExecution = flowExecutionQueryResult.data.flowExecution as FlowExecution;

                // Process the flow execution result
                this.onPollResult(flowExecution);

                // If flow is complete or failed, stop polling
                if(
                    flowExecutionQueryResult.data.flowExecution.status === FlowExecutionStatus.Success ||
                    flowExecutionQueryResult.data.flowExecution.status === FlowExecutionStatus.Failed ||
                    flowExecutionQueryResult.data.flowExecution.status === FlowExecutionStatus.Canceled
                ) {
                    this.stopPolling();
                }
            }
            else if(flowExecutionQueryResult.error) {
                throw new Error(`Error polling flow execution: ${flowExecutionQueryResult.error.message}`);
            }
        }
        catch(error) {
            // Handle the error
            this.stopPolling();
            this.onPollError(error instanceof Error ? error : new Error('Unknown error polling flow execution'));
        }
    }

    // Function to dispose of all resources used by the service
    public dispose(): void {
        this.stopPolling();
        this.flowExecutionId = null;
    }
}

// Export - Default
export default FlowPollingService;
