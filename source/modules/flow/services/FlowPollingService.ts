'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowExecution,
    FlowExecutionInput,
    FlowExecutionStatus,
} from '@project/source/api/graphql/GraphQlGeneratedCode';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { FlowExecutionDocument } from '@project/source/api/graphql/GraphQlGeneratedCode';

// Class - FlowPollingService
export class FlowPollingService {
    private pollingIntervalInMilliseconds: number;
    private pollingIntervalTimeout: NodeJS.Timeout | null = null;
    private flowExecutionId: string | null = null;
    private polling: boolean = false;
    private onPollResult: (flowExecution: FlowExecution) => void;
    private onPollError: (error: Error) => void;

    constructor(
        pollingIntervalInMilliseconds: number,
        options: {
            onPollResult: (flowExecution: FlowExecution) => void;
            onPollError: (error: Error) => void;
        },
    ) {
        this.pollingIntervalInMilliseconds = pollingIntervalInMilliseconds;
        this.onPollResult = options.onPollResult;
        this.onPollError = options.onPollError;
    }

    // Function to set the execution ID that this service is polling for
    public setFlowExecutionId(executionId: string) {
        // console.log('[FlowPollingService] Setting flow execution ID:', executionId);
        this.flowExecutionId = executionId;
    }

    // Function to get the execution ID that this service is polling for
    public getFlowExecutionId(): string | null {
        return this.flowExecutionId;
    }

    // Function to start polling for flow execution updates
    public startPolling(): void {
        // Don't start polling if we don't have an execution ID
        if(!this.flowExecutionId) {
            console.warn('[FlowPollingService] No flow execution ID set, cannot start polling');
            return;
        }

        // Don't restart if already active
        if(this.polling) {
            console.log('[FlowPollingService] Polling already active, not restarting');
            return;
        }

        // Clear any existing polling interval
        this.clearPollingInterval();

        // Start polling at the configured interval
        this.pollingIntervalTimeout = setInterval(() => {
            this.pollFlowExecution();
        }, this.pollingIntervalInMilliseconds);

        // Set active status
        this.polling = true;

        // console.log('[FlowPollingService] Polling started');

        // Do an immediate poll for initial state
        this.pollFlowExecution();
    }

    // Function to stop polling for flow execution updates
    public stopPolling(): void {
        // console.log('[FlowPollingService.stopPolling()]');
        this.clearPollingInterval();
        this.polling = false;
    }

    // Function to clear the polling interval
    public clearPollingInterval(): void {
        if(this.pollingIntervalTimeout) {
            clearInterval(this.pollingIntervalTimeout);
            this.pollingIntervalTimeout = null;
        }
    }

    // Function to check if polling is currently active
    public isPolling(): boolean {
        return this.polling;
    }

    // Function to poll the flow execution from the GraphQL API
    public async pollFlowExecution(): Promise<void> {
        if(!this.flowExecutionId) {
            console.warn('[FlowPollingService.pollFlowExecution()] No flow execution ID set, cannot poll');
            return;
        }

        try {
            console.log('[FlowPollingService] Polling flow execution:', this.flowExecutionId);

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
            console.log('flowExecutionQueryResult', flowExecutionQueryResult);

            // If the query was successful and has data
            if(flowExecutionQueryResult.data?.flowExecution) {
                // Cast to FlowExecution to handle GraphQL typing differences
                const flowExecution = flowExecutionQueryResult.data.flowExecution as FlowExecution;

                console.log(
                    '[FlowPollingService] Received poll result:',
                    flowExecution.status,
                    'Has output:',
                    !!flowExecution.output,
                );

                // Process the flow execution result
                this.onPollResult(flowExecution);

                // If flow is complete or failed, stop polling
                if(
                    flowExecutionQueryResult.data.flowExecution.status === FlowExecutionStatus.Success ||
                    flowExecutionQueryResult.data.flowExecution.status === FlowExecutionStatus.Failed ||
                    flowExecutionQueryResult.data.flowExecution.status === FlowExecutionStatus.Canceled
                ) {
                    console.log('[FlowPollingService] Flow completed, stopping polling');
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
