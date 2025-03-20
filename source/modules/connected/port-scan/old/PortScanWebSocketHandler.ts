'use client'; // This service uses client-only features

// Dependencies - Types
import {
    FlowExecutionStatus,
    FlowStepExecution,
    FlowExecution,
    PortScanWebSocketEvent,
} from '@project/source/modules/connected/flows/types/FlowTypes';
import { PortScanStatusUpdateInterface } from '@project/source/modules/connected/port-scan/types/PortScanTypes';

// Class - PortCheckerWebSocketHandler
export class PortCheckerWebSocketHandler {
    private onStatusUpdate: (update: PortScanStatusUpdateInterface) => void;
    private onStepExecution: (stepExecution: FlowStepExecution) => void;
    private onPollRequest: () => void;

    constructor(
        onStatusUpdate: (update: PortScanStatusUpdateInterface) => void,
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
    public handleWebSocketMessage(
        event: PortScanWebSocketEvent | { data?: { event?: string; arguments?: unknown[] }; event?: string },
        currentExecutionId: string | undefined,
    ): boolean {
        // Log with type-safe property checking
        console.log('WebSocketHandler: handleWebSocketMessage', {
            event,
            currentExecutionId,
            hasData: 'data' in event ? !!event.data : false,
            eventType: 'event' in event ? event.event : 'type' in event ? event.type : 'unknown',
            isPortScanWebSocketEvent: 'type' in event && typeof event.type === 'string',
        });

        if(!currentExecutionId) {
            console.log('WebSocketHandler: No currentExecutionId, ignoring message');
            return false;
        }

        // Log incoming message details

        // Extract execution ID based on event type
        let executionId: string | undefined;
        let flowExecution: FlowExecution | undefined;
        let stepExecution: FlowStepExecution | undefined;

        // Handle both direct event types and wrapped events in data property
        let eventType: string | undefined;

        // Type-safe detailed event inspection
        const eventDetails: Record<string, unknown> = {
            hasType: 'type' in event,
            typeValue: 'type' in event ? event.type : undefined,
            hasEvent: 'event' in event,
            eventValue: 'event' in event ? event.event : undefined,
            hasData: 'data' in event,
        };

        // Only add data properties if data exists
        if('data' in event && event.data) {
            eventDetails.dataType = typeof event.data;
            if(typeof event.data === 'object') {
                eventDetails.dataHasEvent = 'event' in event.data;
                eventDetails.dataEventValue = 'event' in event.data ? event.data.event : undefined;
            }
            // Don't log the entire raw data as it could be large
            eventDetails.hasRawData = true;
        }

        console.log('WebSocketHandler: Detailed event inspection', eventDetails);

        // Type guard for PortScanWebSocketEvent
        if('type' in event && typeof event.type === 'string') {
            eventType = event.type;
        }
        // Type guard for wrapper object with event property
        else if('event' in event && typeof event.event === 'string') {
            eventType = event.event;
        }
        // Type guard for wrapper object with data.event property
        else if(
            event &&
            typeof event === 'object' &&
            'data' in event &&
            event.data &&
            typeof event.data === 'object' &&
            'event' in (event.data as Record<string, unknown>) &&
            typeof (event.data as Record<string, unknown>).event === 'string'
        ) {
            eventType = (event.data as Record<string, unknown>).event as string;
        }

        // Special handling for normal web socket messages from shared worker
        if(eventType === 'message' && 'data' in event && event.data && typeof event.data === 'object') {
            // Try to extract event information from data
            const eventData = event.data;

            console.log('WebSocketHandler: Examining event data', {
                hasType: typeof eventData === 'object' && 'type' in eventData,
                dataType: typeof eventData === 'object' && 'type' in eventData ? eventData.type : undefined,
            });

            // Check if the data contains a web socket event we care about
            if(typeof eventData === 'object' && 'type' in eventData) {
                // Look for FlowExecution or FlowStepExecution in the event object
                if(eventData.type === 'FlowExecution' || eventData.type === 'FlowStepExecution') {
                    console.log('WebSocketHandler: Found flow event in message data', {
                        type: eventData.type,
                        data: eventData,
                    });
                    eventType = eventData.type;

                    // If this is a flow event directly, restructure it to match expected format
                    if(eventData.type === 'FlowExecution' && 'arguments' in eventData) {
                        // Ensure arguments is properly typed as [FlowExecution]
                        const flowArg =
                            Array.isArray(eventData.arguments) && eventData.arguments.length > 0
                                ? (eventData.arguments[0] as FlowExecution)
                                : ({ id: '', status: '' } as FlowExecution);

                        event = {
                            type: 'FlowExecution' as const,
                            arguments: [flowArg] as [FlowExecution],
                        };
                    }
                    else if(eventData.type === 'FlowStepExecution' && 'arguments' in eventData) {
                        // Ensure arguments is properly typed as [FlowStepExecution]
                        const stepArg =
                            Array.isArray(eventData.arguments) && eventData.arguments.length > 0
                                ? (eventData.arguments[0] as FlowStepExecution)
                                : ({ executionId: '', stepId: '', status: '', actionType: '' } as FlowStepExecution);

                        event = {
                            type: 'FlowStepExecution' as const,
                            arguments: [stepArg] as [FlowStepExecution],
                        };
                    }
                }
            }

            // Try to extract flow execution from the event data itself if it appears to be a flow structure
            // This is the case when the WebSocket message directly contains the flow execution data
            if(eventData && typeof eventData === 'object') {
                // Check if this might be a wrapped flow execution (common with some web socket protocols)
                if('id' in eventData && 'status' in eventData && 'steps' in eventData) {
                    console.log('WebSocketHandler: Found potential flow execution in message data', eventData);

                    // Restructure as a flow execution event
                    event = {
                        type: 'FlowExecution' as const,
                        arguments: [eventData as FlowExecution] as [FlowExecution],
                    };
                    eventType = 'FlowExecution';
                }
                // Check if this might be a flow step execution
                else if('executionId' in eventData && 'stepId' in eventData && 'status' in eventData) {
                    console.log('WebSocketHandler: Found potential flow step execution in message data', eventData);

                    // Restructure as a flow step execution event
                    event = {
                        type: 'FlowStepExecution' as const,
                        arguments: [eventData as FlowStepExecution] as [FlowStepExecution],
                    };
                    eventType = 'FlowStepExecution';
                }
            }
        }

        if(eventType === 'FlowExecution') {
            console.log('WebSocketHandler: Processing FlowExecution event', event);

            // Get arguments using type guards
            let args: unknown[] | undefined;
            let flowExecutionData: any = null;

            // Direct arguments in PortScanWebSocketEvent
            if('arguments' in event && Array.isArray(event.arguments)) {
                args = event.arguments;
                if(args && args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
                    flowExecutionData = args[0];
                }
            }
            // Nested arguments in data property
            else if(
                event &&
                typeof event === 'object' &&
                'data' in event &&
                event.data &&
                typeof event.data === 'object'
            ) {
                // Try to get arguments if available
                if(
                    'arguments' in (event.data as Record<string, unknown>) &&
                    Array.isArray((event.data as Record<string, unknown>).arguments)
                ) {
                    args = (event.data as Record<string, unknown>).arguments as unknown[];
                    if(args && args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
                        flowExecutionData = args[0];
                    }
                }
                // If the data itself has flow execution properties, use it directly
                else if(
                    typeof event.data === 'object' &&
                    'id' in (event.data as Record<string, unknown>) &&
                    'status' in (event.data as Record<string, unknown>)
                ) {
                    flowExecutionData = event.data;
                }
                // If data contains a type property and is the FlowExecution object
                else if(
                    typeof event.data === 'object' &&
                    'type' in (event.data as Record<string, unknown>) &&
                    (event.data as Record<string, unknown>).type === 'FlowExecution'
                ) {
                    // Check if it has the flow execution directly
                    if(
                        'id' in (event.data as Record<string, unknown>) &&
                        'status' in (event.data as Record<string, unknown>)
                    ) {
                        flowExecutionData = event.data;
                    }
                    // Or maybe it has it in a data property
                    else if(
                        'data' in (event.data as Record<string, unknown>) &&
                        typeof (event.data as Record<string, unknown>).data === 'object'
                    ) {
                        const nestedData = (event.data as Record<string, unknown>).data;
                        if(
                            nestedData &&
                            typeof nestedData === 'object' &&
                            'id' in (nestedData as Record<string, unknown>) &&
                            'status' in (nestedData as Record<string, unknown>)
                        ) {
                            flowExecutionData = nestedData;
                        }
                    }
                }
            }

            if(flowExecutionData) {
                console.log('WebSocketHandler: Found flow execution data', flowExecutionData);
                executionId = flowExecutionData.id;
                flowExecution = flowExecutionData as FlowExecution;
            }
            else {
                console.log('WebSocketHandler: Could not extract flow execution data');
            }
        }
        else if(eventType === 'FlowStepExecution') {
            console.log('WebSocketHandler: Processing FlowStepExecution event', event);

            // Get arguments using type guards
            let args: unknown[] | undefined;
            let stepExecutionData: any = null;

            // Direct arguments in PortScanWebSocketEvent
            if('arguments' in event && Array.isArray(event.arguments)) {
                args = event.arguments;
                if(args && args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
                    stepExecutionData = args[0];
                }
            }
            // Nested arguments in data property
            else if(
                event &&
                typeof event === 'object' &&
                'data' in event &&
                event.data &&
                typeof event.data === 'object'
            ) {
                // Try to get arguments if available
                if(
                    'arguments' in (event.data as Record<string, unknown>) &&
                    Array.isArray((event.data as Record<string, unknown>).arguments)
                ) {
                    args = (event.data as Record<string, unknown>).arguments as unknown[];
                    if(args && args.length > 0 && typeof args[0] === 'object' && args[0] !== null) {
                        stepExecutionData = args[0];
                    }
                }
                // If the data itself has step execution properties, use it directly
                else if(
                    typeof event.data === 'object' &&
                    'executionId' in (event.data as Record<string, unknown>) &&
                    'stepId' in (event.data as Record<string, unknown>) &&
                    'status' in (event.data as Record<string, unknown>)
                ) {
                    stepExecutionData = event.data;
                }
                // If data contains a type property and is the FlowStepExecution object
                else if(
                    typeof event.data === 'object' &&
                    'type' in (event.data as Record<string, unknown>) &&
                    (event.data as Record<string, unknown>).type === 'FlowStepExecution'
                ) {
                    // Check if it has the step execution directly
                    if(
                        'executionId' in (event.data as Record<string, unknown>) &&
                        'stepId' in (event.data as Record<string, unknown>) &&
                        'status' in (event.data as Record<string, unknown>)
                    ) {
                        stepExecutionData = event.data;
                    }
                    // Or maybe it has it in a data property
                    else if(
                        'data' in (event.data as Record<string, unknown>) &&
                        typeof (event.data as Record<string, unknown>).data === 'object'
                    ) {
                        const nestedData = (event.data as Record<string, unknown>).data;
                        if(
                            nestedData &&
                            typeof nestedData === 'object' &&
                            'executionId' in (nestedData as Record<string, unknown>) &&
                            'stepId' in (nestedData as Record<string, unknown>) &&
                            'status' in (nestedData as Record<string, unknown>)
                        ) {
                            stepExecutionData = nestedData;
                        }
                    }
                }
            }

            if(stepExecutionData) {
                console.log('WebSocketHandler: Found step execution data', stepExecutionData);
                executionId = stepExecutionData.executionId; // This is the ID linking to the parent flow execution
                stepExecution = stepExecutionData as FlowStepExecution;

                // Direct check for host resolution errors in any flow step execution
                if(
                    stepExecutionData.errors &&
                    stepExecutionData.errors.length > 0 &&
                    stepExecutionData.errors[0] &&
                    stepExecutionData.errors[0].message &&
                    stepExecutionData.errors[0].message.includes('Failed to resolve host')
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

                    try {
                        if(stepExecutionData.input) {
                            // Safely access input properties if they exist
                            const input = stepExecutionData.input;
                            if(typeof input === 'object' && input !== null) {
                                host = 'host' in input && typeof input.host === 'string' ? input.host : '';

                                // Try to get port from the ports array
                                if('ports' in input && Array.isArray(input.ports) && input.ports.length > 0) {
                                    const portData = input.ports[0];
                                    if(typeof portData === 'string') {
                                        port = portData;
                                    }
                                    else if(typeof portData === 'object' && portData !== null && 'port' in portData) {
                                        port = typeof portData.port === 'string' ? portData.port : '';
                                    }
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
            else {
                console.log('WebSocketHandler: Could not extract step execution data');
            }
        }

        // Ignore messages for other executions
        if(executionId !== currentExecutionId) {
            return false;
        }

        // Process Flow Execution events
        if(eventType === 'FlowExecution' && flowExecution) {
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
        else if(eventType === 'FlowStepExecution' && stepExecution) {
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
export default PortCheckerWebSocketHandler;
