import { FlowExecutionStatus, FlowStepExecutionStatus } from '@project/source/api/GraphQlGeneratedCode';
import { PortScanStepInput, PortScanStepOutput } from './PortTypes';

// GraphQL Flow Execution response types to handle different property names
export interface GraphQlFlowStepExecutionResponse {
    stepId: string; // GraphQL uses stepId instead of id
    flowExecutionId?: string; // Reference to parent execution
    status: FlowStepExecutionStatus | string;
    actionType: string;
    attempt: number;
    input?: PortScanStepInput | string | null;
    output?: PortScanStepOutput | string | null;
    errors?: FlowExecutionError[] | null;
    __typename?: string;
    // Additional fields from GraphQL schema that might be present
    startedAt?: Date | null;
    completedAt?: Date | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    elapsedTimeMs?: number | null;
    flowExecution?: GraphQlFlowExecutionResponse | null;
}

export interface GraphQlFlowExecutionResponse {
    id: string;
    status: FlowExecutionStatus | string;
    input?: PortScanStepInput | string | null;
    stepExecutions?: GraphQlFlowStepExecutionResponse[];
    errors?: FlowExecutionError[] | null;
    __typename?: string;
    // Additional fields from GraphQL schema that might be present
    triggerId?: string | null;
    triggerType?: string;
    elapsedTimeMs?: number | null;
    startedAt?: Date | null;
    completedAt?: Date | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    createdByAccountId?: string | null;
    createdByProfileId?: string | null;
    flowVersionId?: string | null;
}

// Flow Execution API response types - Our internal types
export interface FlowExecution {
    id: string;
    status: FlowExecutionStatus | string;
    input?: PortScanStepInput;
    stepExecutions?: FlowStepExecution[];
    errors?: FlowExecutionError[];
}

export interface FlowStepExecution {
    stepId: string;
    executionId: string;
    status: FlowStepExecutionStatus | string;
    actionType: string;
    input?: PortScanStepInput;
    output?: PortScanStepOutput;
    errors?: FlowExecutionError[];
}

export interface FlowExecutionError {
    message: string;
    code?: string;
}

// WebSocket event types
export interface FlowExecutionEvent {
    type: 'FlowExecution';
    arguments: [FlowExecution];
}

export interface FlowStepExecutionEvent {
    type: 'FlowStepExecution';
    arguments: [FlowStepExecution];
}

export type PortScanWebSocketEvent = FlowExecutionEvent | FlowStepExecutionEvent;

// Re-export GraphQL types for convenience
export { FlowExecutionStatus, FlowStepExecutionStatus };
