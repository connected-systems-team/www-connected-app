// Dependencies - Types
import { FlowExecutionErrorInterface, FlowServiceErrors } from '@project/source/modules/flow/FlowService';

// Shared error processing result
export interface FlowErrorResult {
    errorCode: string;
    message: string;
}

// Class - FlowErrorHandler
export class FlowErrorHandler {
    // Function to process common flow execution errors and return standardized error information
    public static processError(error: FlowExecutionErrorInterface): FlowErrorResult {
        let errorCode = 'UnknownError';
        let message = 'An unknown error occurred.';

        // Check for unauthorized error
        const isUnauthorizedError =
            error.message &&
            (error.message.includes('Unauthorized') ||
                error.message.includes('unauthorized') ||
                error.message.includes('401'));

        if(isUnauthorizedError) {
            errorCode = 'Unauthorized';
            message = 'Please sign in to use this tool.';
        }
        // Check for network connectivity issues
        else if(
            (error.message &&
                (error.message.includes('Failed to fetch') ||
                    error.message.includes('network') ||
                    error.message.includes('ERR_INTERNET_DISCONNECTED') ||
                    error.message.includes('ERR_CONNECTION_REFUSED'))) ||
            error.code === FlowServiceErrors.ExecutionFailed.code
        ) {
            errorCode = FlowServiceErrors.NetworkConnectionError.code;
            message = FlowServiceErrors.NetworkConnectionError.message;
        }
        // Check for general flow service errors
        else if(error.code === FlowServiceErrors.ValidationError.code) {
            errorCode = FlowServiceErrors.ValidationError.code;
            message = FlowServiceErrors.ValidationError.message;
        }
        else if(error.code === FlowServiceErrors.FlowTimedOut.code) {
            errorCode = FlowServiceErrors.FlowTimedOut.code;
            message = FlowServiceErrors.FlowTimedOut.message;
        }
        // Use the error message if available, otherwise use default
        else if(error.message) {
            message = error.message;
            // Try to extract a meaningful error code from the message
            if(error.message.includes('timeout')) {
                errorCode = 'TimeoutError';
            }
            else if(error.message.includes('validation')) {
                errorCode = 'ValidationError';
            }
            else if(error.message.includes('permission')) {
                errorCode = 'PermissionError';
            }
            else {
                errorCode = 'ExecutionError';
            }
        }

        return {
            errorCode,
            message,
        };
    }

    // Function to log error information in a consistent format
    public static logError(context: string, error: FlowExecutionErrorInterface, flowExecution?: unknown): void {
        console.error(`${context} - Flow execution error:`, {
            error: error,
            flowExecution: flowExecution,
        });
    }
}
