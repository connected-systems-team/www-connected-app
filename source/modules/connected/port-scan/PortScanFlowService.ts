'use client'; // This service uses client-only features

// Dependencies - Types
import { FlowService, FlowServiceEventHandlersInterface } from '@project/source/modules/flow/FlowService';
import { FlowStepResultInterface, FlowStepUpdateDataInterface } from '@project/source/modules/flow/types/FlowTypes';
import { NmapPortStateType } from '@project/source/modules/connected/port-scan/types/PortScanTypes';

// Dependencies - API
import { apolloClient } from '@structure/source/api/apollo/ApolloClient';
import { PortScanCreateDocument } from '@project/source/api/GraphQlGeneratedCode';

// Type - PortScanFlowInputInterface - Input for a new port scan
export interface PortScanFlowInputInterface {
    host: string;
    port: number;
    regionIdentifier: string; // E.g., north-america
}

// Server Type - PortScanFlowStepInputInterface - Input for a port scan flow step
export interface PortScanFlowStepInputInterface extends Record<string, unknown> {
    host: string;
    ports?: Array<string | { port: string }>;
    region?: string;
}

// Server Type - PortScanFlowStepOutputInterface - Output for a port scan flow step
export interface PortScanFlowStepOutputInterface extends Record<string, unknown> {
    status: 'success' | 'error' | 'mismatch';
    ipAddress?: string;
    addressesScanned: number;
    // When a domain resolves to multiple IPs
    additionalIps?: string[];
    // hostsUp - Not the same as additionalIps.length because additionalIps can be empty
    // Used to determine if someone put in an invalid IP address
    hostsUp: number;
    hostName?: string;
    ports?: Array<{
        port: string;
        state: NmapPortStateType;
        // If the port state is different from the expected state in monitoring
        mismatch: boolean;
        // If nmap returns a service name that is listening on the port, e.g., http
        service?: string;
    }>;
    // The time it took in seconds to perform the scan
    scanTime: string;
    // This will only exist if a scan is succesful, the time it took to get a response
    latency?: string;
    error?: {
        message?: string;
        host?: string;
        port?: string;
    };
}

// Type - PortScanFlowStepResultInterface - Port scan specific flow step result
export interface PortScanFlowStepResultInterface
    extends FlowStepResultInterface<PortScanFlowStepInputInterface, PortScanFlowStepOutputInterface> {
    // Additional port scan specific properties could be added here if needed
}

// Type - PortScanFlowStepUpdateDataInterface - Data for a port scan flow step update
export interface PortScanFlowStepUpdateDataInterface extends FlowStepUpdateDataInterface {
    message: string;
    isFinal?: boolean;
}

// Type - PortScanResultInterface - Result of a port scan
export interface PortScanResultInterface {
    flowExecutionId: string;
    portState: NmapPortStateType;
    host: string;
    port: number;
    regionIdentifier: string;
    createdAt: Date;
    error?: {
        message: string;
        // Flag to indicate this is a system error (e.g., 500) rather than a port state result
        isSystemError?: boolean;
        // Flag to indicate the request was timed out
        timedOut?: boolean;
    };
}

// Type - PortScanFlowServiceInterface
// Extends the generic flow service event handlers with port scan specific handlers
export interface PortScanFlowServiceEventHandlersInterface
    extends FlowServiceEventHandlersInterface<PortScanResultInterface> {
    // Additional port scan specific event handlers could be added here
}

// Class - PortScanFlowService
export class PortScanFlowService extends FlowService<
    PortScanFlowInputInterface,
    PortScanFlowStepInputInterface,
    PortScanFlowStepOutputInterface,
    PortScanResultInterface
> {
    // Function to create a new flow execution
    protected async createFlowExecution(input: PortScanFlowInputInterface): Promise<string> {
        // Execute the port scan mutation to create the flow
        const portScanMutation = await apolloClient.mutate({
            mutation: PortScanCreateDocument,
            variables: {
                input: {
                    host: input.host,
                    ports: [input.port.toString()],
                    region: input.regionIdentifier,
                },
            },
        });

        // If the mutation failed, throw an error
        if(!portScanMutation.data?.portScanCreate) {
            throw new Error('Failed to create port scan.');
        }

        // Return the flow execution ID
        return portScanMutation.data.portScanCreate;
    }
}

// Export - Default
export default PortScanFlowService;
