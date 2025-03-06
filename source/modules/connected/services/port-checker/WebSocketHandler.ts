'use client'; // This service uses client-only features

// Dependencies - Types
import { WebSocketEvent } from '@structure/source/api/web-sockets/types/WebSocketMessage';
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
    public handleWebSocketMessage(event: WebSocketEvent, currentExecutionId: string | undefined): boolean {
        if(!currentExecutionId) {
            return false;
        }

        // Extract execution ID based on event type
        let executionId: string | undefined;
        let flowExecution: FlowExecution | undefined;
        let stepExecution: FlowStepExecution | undefined;

        if(event.type === 'FlowExecution') {
            const args = (event as any).arguments;
            if(args && args.length > 0) {
                executionId = args[0].id;
                flowExecution = args[0];
            }
        }
        else if(event.type === 'FlowStepExecution') {
            const args = (event as any).arguments;
            if(args && args.length > 0) {
                executionId = args[0].executionId;
                stepExecution = args[0];
            }
        }

        // Ignore messages for other executions
        if(executionId !== currentExecutionId) {
            return false;
        }

        // Process Flow Execution events
        if(event.type === 'FlowExecution' && flowExecution) {
            // If the flow execution completed, query for complete results
            if(
                flowExecution.status === FlowExecutionStatus.Success ||
                flowExecution.status === FlowExecutionStatus.Failed
            ) {
                this.onStatusUpdate({
                    message: 'Scan completed, retrieving results...',
                    isFinal: false,
                    timestamp: new Date(),
                    type: 'info',
                });

                this.onPollRequest();
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
        else if(event.type === 'FlowStepExecution' && stepExecution) {
            this.onStepExecution(stepExecution);
            return true;
        }

        return false;
    }
}

// Export - Default
export default WebSocketHandler;
