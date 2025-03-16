'use client'; // This service uses client-only features

// Dependencies - Types
import { WebSocketEventMessage } from '@structure/source/api/web-sockets/types/WebSocketMessage';
import {
    FlowExecutionStatus,
    FlowStepExecution,
    FlowExecution,
} from '@project/source/modules/connected/types/FlowTypes';
import { PortScanStatusUpdate } from '@project/source/modules/connected/types/PortTypes';

/**
 * Class for handling WebSocket messages related to port checking
 */
export class WebSocketHandler {
    private onStatusUpdate: (update: PortScanStatusUpdate) => void;
    private onStepExecution: (stepExecution: FlowStepExecution) => void;
    private onPollRequest: () => void;

    constructor(
        onStatusUpdate: (update: PortScanStatusUpdate) => void,
        onStepExecution: (stepExecution: FlowStepExecution) => void,
        onPollRequest: () => void,
    ) {
        this.onStatusUpdate = onStatusUpdate;
        this.onStepExecution = onStepExecution;
        this.onPollRequest = onPollRequest;
    }

    /**
     * Handle WebSocket messages from the server
     */
    public handleWebSocketMessage(event: any, currentExecutionId: string | undefined): boolean {
        if(!currentExecutionId) {
            return false;
        }

        // No need for message logging in production

        // Extract execution ID based on event type
        let executionId: string | undefined;
        let flowExecution: FlowExecution | undefined;
        let stepExecution: FlowStepExecution | undefined;

        if(event.event === 'FlowExecution') {
            const args = event.data && event.data.arguments;
            if(args && args.length > 0) {
                executionId = args[0].id;
                flowExecution = args[0];
            }
        }
        else if(event.event === 'FlowStepExecution') {
            const args = event.data && event.data.arguments;
            if(args && args.length > 0) {
                executionId = args[0].flowExecutionId; // Note: It's flowExecutionId, not executionId
                stepExecution = args[0];

                // Direct check for host resolution errors in any flow step execution
                if(
                    args[0].errors &&
                    args[0].errors.length > 0 &&
                    args[0].errors[0] &&
                    args[0].errors[0].message &&
                    args[0].errors[0].message.includes('Failed to resolve host')
                ) {
                    // Found host resolution error in step execution

                    // Send an immediate status update
                    this.onStatusUpdate({
                        message: 'Failed to resolve host: The hostname could not be found.',
                        isFinal: true,
                        timestamp: new Date(),
                        type: 'error',
                    });

                    // Extract host and port information if available
                    let host = '';
                    let port = '';
                    let region = '';

                    try {
                        if(args[0].input) {
                            host = args[0].input.host || '';
                            region = args[0].input.region || '';

                            // Try to get port from the ports array
                            if(args[0].input.ports && args[0].input.ports.length > 0) {
                                if(typeof args[0].input.ports[0] === 'string') {
                                    port = args[0].input.ports[0];
                                }
                                else if(typeof args[0].input.ports[0] === 'object') {
                                    port = args[0].input.ports[0].port || '';
                                }
                            }
                        }
                    }
                    catch(error) {
                        console.error('Error extracting host/port from step execution', error);
                    }

                    // If we have host and port, send a direct onPollRequest to force immediate result
                    if(host && port) {
                        this.onPollRequest();
                    }
                }
            }
        }

        // Ignore messages for other executions
        if(executionId !== currentExecutionId) {
            return false;
        }

        // Process Flow Execution events
        if(event.event === 'FlowExecution' && flowExecution) {
            // If the flow execution completed, query for complete results
            if(flowExecution.status === FlowExecutionStatus.Success) {
                this.onStatusUpdate({
                    message: 'Scan completed, retrieving results...',
                    isFinal: false,
                    timestamp: new Date(),
                    type: 'info',
                });

                this.onPollRequest();
            }
            else if(flowExecution.status === FlowExecutionStatus.Failed) {
                // Immediately provide a clear error status to the user
                this.onStatusUpdate({
                    message: 'The port check service encountered an error. Please try again.',
                    isFinal: true,
                    timestamp: new Date(),
                    type: 'error',
                });

                // Still poll for complete details if available
                this.onPollRequest();

                // If the execution doesn't have any input/context information,
                // we may need to create a synthetic result to update the UI
                if(!flowExecution.input && !flowExecution.stepExecutions?.length) {
                    // Create a basic system error response for the UI
                    this.onStatusUpdate({
                        message: 'Internal server error: Unable to complete the port check',
                        isFinal: true,
                        timestamp: new Date(),
                        type: 'error',
                    });
                }
            }
            else {
                // Update with flow execution progress
                this.onStatusUpdate({
                    message: `Port check ${String(flowExecution.status).toLowerCase()}...`,
                    isFinal: false,
                    timestamp: new Date(),
                    type: 'info',
                });
            }

            return true;
        }
        // Process Step Execution events
        else if(event.event === 'FlowStepExecution' && stepExecution) {
            // Check specifically for failed port scan steps with error messages
            if(
                stepExecution.actionType === 'PortScan' &&
                stepExecution.status === 'Failed' &&
                stepExecution.errors &&
                stepExecution.errors.length > 0
            ) {
                // Extract the error message
                const errorMessage = stepExecution.errors[0]?.message || 'Unknown error';

                console.log('WebSocketHandler: Failed flow step execution detected', {
                    message: errorMessage,
                    stepExecution,
                });

                // Show a specific status update for this error
                if(errorMessage.includes('Failed to resolve host')) {
                    console.log('WebSocketHandler: Failed to resolve host error detected');

                    this.onStatusUpdate({
                        message: `Failed to resolve host: The hostname could not be found.`,
                        isFinal: true,
                        timestamp: new Date(),
                        type: 'error',
                    });

                    // For host resolution errors, forward a result to make sure this gets processed immediately
                    // Try to extract host, port, region from input to create a system error result
                    try {
                        if(stepExecution.input && typeof stepExecution.input === 'object') {
                            const hostInput = stepExecution.input.host;
                            const regionInput = stepExecution.input.region;
                            let portInput = null;

                            // Try to get port from different formats
                            if(stepExecution.input.ports && Array.isArray(stepExecution.input.ports)) {
                                if(stepExecution.input.ports.length > 0) {
                                    if(typeof stepExecution.input.ports[0] === 'string') {
                                        portInput = stepExecution.input.ports[0];
                                    }
                                    else if(
                                        typeof stepExecution.input.ports[0] === 'object' &&
                                        stepExecution.input.ports[0].port
                                    ) {
                                        portInput = stepExecution.input.ports[0].port;
                                    }
                                }
                            }

                            // Pass direct result to step processor to process as a result
                            if(hostInput && portInput) {
                                console.log(
                                    'WebSocketHandler: Forwarding host resolution error as system error result',
                                );
                                // Just pass the stepExecution as is - we've already detected the error
                                this.onStepExecution(stepExecution);
                            }
                        }
                    }
                    catch(error) {
                        console.error('Error processing failed host resolution in WebSocketHandler:', error);
                    }
                }
            }

            // Process the step execution normally
            this.onStepExecution(stepExecution);
            return true;
        }

        return false;
    }
}

// Export - Default
export default WebSocketHandler;