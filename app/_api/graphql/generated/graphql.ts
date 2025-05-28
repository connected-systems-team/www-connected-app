/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
    DateTimeISO: { input: any; output: any };
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: { input: any; output: any };
};

/** The operator of a field filter */
export enum ColumnFilterConditionOperator {
    Equal = 'Equal',
    GreaterThan = 'GreaterThan',
    GreaterThanOrEqual = 'GreaterThanOrEqual',
    In = 'In',
    IsNotNull = 'IsNotNull',
    IsNull = 'IsNull',
    LessThan = 'LessThan',
    LessThanOrEqual = 'LessThanOrEqual',
    Like = 'Like',
    NotEqual = 'NotEqual',
    NotIn = 'NotIn',
    NotLike = 'NotLike',
}

export type ColumnFilterInput = {
    caseSensitive?: InputMaybe<Scalars['Boolean']['input']>;
    column: Scalars['String']['input'];
    operator: ColumnFilterConditionOperator;
    value: Scalars['JSON']['input'];
};

/** Types of connected tools available for network operations */
export enum ConnectedToolType {
    Dns = 'Dns',
    Ping = 'Ping',
    PortCheck = 'PortCheck',
    TlsCertificate = 'TlsCertificate',
    Traceroute = 'Traceroute',
    Whois = 'Whois',
}

/** DNS Record Types */
export enum DnsRecordType {
    A = 'A',
    Aaaa = 'AAAA',
    Cname = 'CNAME',
    Mx = 'MX',
    Ns = 'NS',
    Ptr = 'PTR',
    Soa = 'SOA',
    Srv = 'SRV',
    Txt = 'TXT',
}

/** Enabled filter type */
export enum EnabledFilterType {
    All = 'All',
    Disabled = 'Disabled',
    Enabled = 'Enabled',
}

export type FlowEntity = {
    __typename?: 'FlowEntity';
    activeVersion?: Maybe<FlowVersionEntity>;
    activeVersionId?: Maybe<Scalars['String']['output']>;
    createdAt: Scalars['DateTimeISO']['output'];
    createdByAccountId: Scalars['String']['output'];
    createdByProfileId: Scalars['String']['output'];
    description?: Maybe<Scalars['String']['output']>;
    executions: Array<FlowExecution>;
    id: Scalars['String']['output'];
    name: Scalars['String']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
    updatedByAccountId?: Maybe<Scalars['String']['output']>;
    updatedByProfileId?: Maybe<Scalars['String']['output']>;
    versions: Array<FlowVersionEntity>;
};

export type FlowExecution = {
    __typename?: 'FlowExecution';
    completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
    createdAt: Scalars['DateTimeISO']['output'];
    createdByAccountId: Scalars['String']['output'];
    createdByProfileId: Scalars['String']['output'];
    elapsedTimeMs?: Maybe<Scalars['Float']['output']>;
    entryPointId: Scalars['String']['output'];
    errors?: Maybe<Array<Scalars['JSON']['output']>>;
    flowEntity?: Maybe<FlowEntity>;
    flowType: FlowType;
    flowTypeId: Scalars['String']['output'];
    flowVersionEntity?: Maybe<FlowVersionEntity>;
    flowVersionId?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    input?: Maybe<Scalars['JSON']['output']>;
    logs?: Maybe<Array<Scalars['JSON']['output']>>;
    metadata?: Maybe<Scalars['JSON']['output']>;
    output?: Maybe<Scalars['JSON']['output']>;
    startedAt: Scalars['DateTimeISO']['output'];
    status: FlowExecutionStatus;
    stepExecutions: Array<FlowStepExecution>;
    triggerId?: Maybe<Scalars['String']['output']>;
    triggerType: FlowTriggerType;
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type FlowExecutionHistoryInput = {
    entryPointId?: InputMaybe<Scalars['String']['input']>;
    flowTypeId?: InputMaybe<Scalars['String']['input']>;
    flowVersionId?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Array<FlowExecutionStatus>>;
    triggerId?: InputMaybe<Scalars['String']['input']>;
};

export type FlowExecutionInput = {
    executionId: Scalars['String']['input'];
};

export enum FlowExecutionStatus {
    Canceled = 'Canceled',
    Failed = 'Failed',
    NotStarted = 'NotStarted',
    Running = 'Running',
    Success = 'Success',
}

export type FlowStepExecution = {
    __typename?: 'FlowStepExecution';
    actionType: Scalars['String']['output'];
    attempt: Scalars['Float']['output'];
    completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
    createdAt: Scalars['DateTimeISO']['output'];
    elapsedTimeMs?: Maybe<Scalars['Float']['output']>;
    errors?: Maybe<Scalars['JSON']['output']>;
    flowExecution: FlowExecution;
    flowExecutionId: Scalars['String']['output'];
    id: Scalars['String']['output'];
    input?: Maybe<Scalars['JSON']['output']>;
    logs?: Maybe<Array<Scalars['JSON']['output']>>;
    output?: Maybe<Scalars['JSON']['output']>;
    startedAt?: Maybe<Scalars['DateTimeISO']['output']>;
    status: FlowStepExecutionStatus;
    stepId: Scalars['String']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
};

export enum FlowStepExecutionStatus {
    Failed = 'Failed',
    NotStarted = 'NotStarted',
    Running = 'Running',
    Success = 'Success',
}

export type FlowSubscribeInput = {
    triggerId: Scalars['String']['input'];
};

export enum FlowTriggerType {
    Manual = 'Manual',
    Recurring = 'Recurring',
    Webhook = 'Webhook',
}

export enum FlowType {
    Custom = 'Custom',
    Entity = 'Entity',
    Static = 'Static',
}

export type FlowVersionEntity = {
    __typename?: 'FlowVersionEntity';
    createdAt: Scalars['DateTimeISO']['output'];
    createdByAccountId: Scalars['String']['output'];
    createdByProfileId: Scalars['String']['output'];
    executions: Array<FlowExecution>;
    flow: FlowEntity;
    flowId: Scalars['String']['output'];
    graph: Scalars['JSON']['output'];
    id: Scalars['String']['output'];
};

export type GridCapability = {
    __typename?: 'GridCapability';
    createdAt: Scalars['DateTimeISO']['output'];
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    name: Scalars['String']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridCapabilityCreateInput = {
    description?: InputMaybe<Scalars['String']['input']>;
    name: Scalars['String']['input'];
};

export type GridCapabilityInput = {
    id?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type GridCapabilityUpdateInput = {
    description?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    name?: InputMaybe<Scalars['String']['input']>;
};

export type GridCloudProvider = {
    __typename?: 'GridCloudProvider';
    adapter: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    name: Scalars['String']['output'];
    note?: Maybe<Scalars['String']['output']>;
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridCloudProviderCreateInput = {
    adapter: Scalars['String']['input'];
    description?: InputMaybe<Scalars['String']['input']>;
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
    name: Scalars['String']['input'];
    note?: InputMaybe<Scalars['String']['input']>;
};

export type GridCloudProviderInput = {
    id?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type GridCloudProviderListInput = {
    adapter?: InputMaybe<Scalars['String']['input']>;
    enabledOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GridCloudProviderUpdateInput = {
    adapter?: InputMaybe<Scalars['String']['input']>;
    description?: InputMaybe<Scalars['String']['input']>;
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['String']['input'];
    name?: InputMaybe<Scalars['String']['input']>;
    note?: InputMaybe<Scalars['String']['input']>;
};

export type GridNode = {
    __typename?: 'GridNode';
    createdAt: Scalars['DateTimeISO']['output'];
    enabled: Scalars['Boolean']['output'];
    healthEndpoint: Scalars['String']['output'];
    host: Scalars['String']['output'];
    id: Scalars['String']['output'];
    lastSeenAt?: Maybe<Scalars['DateTimeISO']['output']>;
    name: Scalars['String']['output'];
    note?: Maybe<Scalars['String']['output']>;
    online: Scalars['Boolean']['output'];
    providerRegionId: Scalars['String']['output'];
    settings?: Maybe<Scalars['JSON']['output']>;
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridNodeCapability = {
    __typename?: 'GridNodeCapability';
    capabilityId: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['String']['output'];
    nodeId: Scalars['String']['output'];
};

export type GridNodeCapabilityAssignInput = {
    capabilityId: Scalars['String']['input'];
    nodeId: Scalars['String']['input'];
};

export type GridNodeCapabilityListInput = {
    capabilityId?: InputMaybe<Scalars['String']['input']>;
    nodeId?: InputMaybe<Scalars['String']['input']>;
};

export type GridNodeCapabilityRemoveInput = {
    capabilityId: Scalars['String']['input'];
    nodeId: Scalars['String']['input'];
};

export type GridNodeCreateInput = {
    host: Scalars['String']['input'];
    name: Scalars['String']['input'];
    port?: InputMaybe<Scalars['Float']['input']>;
    providerRegionId: Scalars['String']['input'];
};

export type GridNodeInput = {
    id?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type GridNodeListInput = {
    providerRegionId?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
};

export type GridNodeUpdateInput = {
    id: Scalars['String']['input'];
    name?: InputMaybe<Scalars['String']['input']>;
};

export type GridProviderRegion = {
    __typename?: 'GridProviderRegion';
    cloudProviderId: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    healthEndpoint?: Maybe<Scalars['String']['output']>;
    host?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    key?: Maybe<Scalars['String']['output']>;
    note?: Maybe<Scalars['String']['output']>;
    online: Scalars['Boolean']['output'];
    providerRegionCode: Scalars['String']['output'];
    regionId: Scalars['String']['output'];
    secure: Scalars['Boolean']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridProviderRegionCapability = {
    __typename?: 'GridProviderRegionCapability';
    capabilityId: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['String']['output'];
    providerRegionId: Scalars['String']['output'];
};

export type GridProviderRegionCapabilityAssignInput = {
    capabilityId: Scalars['String']['input'];
    providerRegionId: Scalars['String']['input'];
};

export type GridProviderRegionCapabilityListInput = {
    capabilityId?: InputMaybe<Scalars['String']['input']>;
    providerRegionId?: InputMaybe<Scalars['String']['input']>;
};

export type GridProviderRegionCapabilityRemoveInput = {
    capabilityId: Scalars['String']['input'];
    providerRegionId: Scalars['String']['input'];
};

export type GridProviderRegionCreateInput = {
    cloudProviderId: Scalars['String']['input'];
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
    healthEndpoint?: InputMaybe<Scalars['String']['input']>;
    host?: InputMaybe<Scalars['String']['input']>;
    key?: InputMaybe<Scalars['String']['input']>;
    online?: InputMaybe<Scalars['Boolean']['input']>;
    providerRegionCode: Scalars['String']['input'];
    regionId: Scalars['String']['input'];
    secure?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GridProviderRegionInput = {
    cloudProviderId?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    providerRegionCode?: InputMaybe<Scalars['String']['input']>;
    regionId?: InputMaybe<Scalars['String']['input']>;
};

export type GridProviderRegionListInput = {
    cloudProviderId?: InputMaybe<Scalars['String']['input']>;
    enabledOnly?: InputMaybe<Scalars['Boolean']['input']>;
    regionId?: InputMaybe<Scalars['String']['input']>;
};

export type GridProviderRegionUpdateInput = {
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['String']['input'];
    providerRegionCode?: InputMaybe<Scalars['String']['input']>;
};

export type GridRegion = {
    __typename?: 'GridRegion';
    country: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    division: Scalars['String']['output'];
    enabled: Scalars['Boolean']['output'];
    id: Scalars['String']['output'];
    locality: Scalars['String']['output'];
    note?: Maybe<Scalars['String']['output']>;
    region: Scalars['String']['output'];
    site?: Maybe<Scalars['String']['output']>;
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridRegionCreateInput = {
    country: Scalars['String']['input'];
    division: Scalars['String']['input'];
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
    locality: Scalars['String']['input'];
    region: Scalars['String']['input'];
    site?: InputMaybe<Scalars['String']['input']>;
};

export type GridRegionInput = {
    id?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

/** Grid region level */
export enum GridRegionLevel {
    Country = 'Country',
    Division = 'Division',
    Locality = 'Locality',
    Region = 'Region',
    Site = 'Site',
}

export type GridRegionLevels = {
    __typename?: 'GridRegionLevels';
    country?: Maybe<Scalars['String']['output']>;
    division?: Maybe<Scalars['String']['output']>;
    locality?: Maybe<Scalars['String']['output']>;
    region?: Maybe<Scalars['String']['output']>;
    site?: Maybe<Scalars['String']['output']>;
};

export type GridRegionLevelsInput = {
    country?: InputMaybe<Scalars['String']['input']>;
    division?: InputMaybe<Scalars['String']['input']>;
    locality?: InputMaybe<Scalars['String']['input']>;
    region?: InputMaybe<Scalars['String']['input']>;
    site?: InputMaybe<Scalars['String']['input']>;
};

export type GridRegionLevelsListInput = {
    level: GridRegionLevel;
};

export type GridRegionListInput = {
    enabled?: InputMaybe<EnabledFilterType>;
};

export type GridRegionUpdateInput = {
    country?: InputMaybe<Scalars['String']['input']>;
    division?: InputMaybe<Scalars['String']['input']>;
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['String']['input'];
    locality?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
    note?: InputMaybe<Scalars['String']['input']>;
    region?: InputMaybe<Scalars['String']['input']>;
    site?: InputMaybe<Scalars['String']['input']>;
};

export type GridTask = {
    __typename?: 'GridTask';
    allowAsync: Scalars['Boolean']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    description?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    name: Scalars['String']['output'];
    note?: Maybe<Scalars['String']['output']>;
    timeoutMs: Scalars['Float']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridTaskCapability = {
    __typename?: 'GridTaskCapability';
    capabilityId: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['String']['output'];
    required: Scalars['Boolean']['output'];
    taskId: Scalars['String']['output'];
};

export type GridTaskCapabilityCreateInput = {
    capabilityId: Scalars['String']['input'];
    required?: InputMaybe<Scalars['Boolean']['input']>;
    taskId: Scalars['String']['input'];
};

export type GridTaskCapabilityDeleteInput = {
    capabilityId: Scalars['String']['input'];
    taskId: Scalars['String']['input'];
};

export type GridTaskCapabilityListInput = {
    capabilityId?: InputMaybe<Scalars['String']['input']>;
    taskId?: InputMaybe<Scalars['String']['input']>;
};

export type GridTaskCapabilityUpdateInput = {
    capabilityId: Scalars['String']['input'];
    required: Scalars['Boolean']['input'];
    taskId: Scalars['String']['input'];
};

export type GridTaskCreateInput = {
    allowAsync?: InputMaybe<Scalars['Boolean']['input']>;
    description?: InputMaybe<Scalars['String']['input']>;
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
    name: Scalars['String']['input'];
    timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type GridTaskExecution = {
    __typename?: 'GridTaskExecution';
    attempt: Scalars['Float']['output'];
    completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
    createdAt: Scalars['DateTimeISO']['output'];
    error?: Maybe<Scalars['JSON']['output']>;
    flowId?: Maybe<Scalars['String']['output']>;
    id: Scalars['String']['output'];
    inputData?: Maybe<Scalars['JSON']['output']>;
    isAsync?: Maybe<Scalars['Boolean']['output']>;
    maxAttempts?: Maybe<Scalars['Float']['output']>;
    nodeId?: Maybe<Scalars['String']['output']>;
    outputData?: Maybe<Scalars['JSON']['output']>;
    providerRegionId?: Maybe<Scalars['String']['output']>;
    startedAt?: Maybe<Scalars['DateTimeISO']['output']>;
    status: GridTaskExecutionStatus;
    taskTypeId: Scalars['String']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridTaskExecutionInput = {
    flowId?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
    nodeId?: InputMaybe<Scalars['String']['input']>;
    providerRegionId?: InputMaybe<Scalars['String']['input']>;
    taskTypeId?: InputMaybe<Scalars['String']['input']>;
};

export type GridTaskExecutionListInput = {
    flowId?: InputMaybe<Scalars['String']['input']>;
    nodeId?: InputMaybe<Scalars['String']['input']>;
    providerRegionId?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<GridTaskExecutionStatus>;
    taskTypeId?: InputMaybe<Scalars['String']['input']>;
};

/** The possible states of a task ran on the Grid. */
export enum GridTaskExecutionStatus {
    Failed = 'Failed',
    Pending = 'Pending',
    Retry = 'Retry',
    Running = 'Running',
    Success = 'Success',
}

export type GridTaskInput = {
    id?: InputMaybe<Scalars['String']['input']>;
    name?: InputMaybe<Scalars['String']['input']>;
};

export type GridTaskListInput = {
    enabledOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GridTaskProviderSupport = {
    __typename?: 'GridTaskProviderSupport';
    cloudProviderId: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['String']['output'];
    taskId: Scalars['String']['output'];
};

export type GridTaskProviderSupportCreateInput = {
    cloudProviderId: Scalars['String']['input'];
    taskId: Scalars['String']['input'];
};

export type GridTaskProviderSupportDeleteInput = {
    cloudProviderId: Scalars['String']['input'];
    taskId: Scalars['String']['input'];
};

export type GridTaskUpdateInput = {
    allowAsync?: InputMaybe<Scalars['Boolean']['input']>;
    description?: InputMaybe<Scalars['String']['input']>;
    enabled?: InputMaybe<Scalars['Boolean']['input']>;
    id: Scalars['String']['input'];
    name?: InputMaybe<Scalars['String']['input']>;
    timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    flowAbortPrivileged: OperationResult;
    flowCancelPrivileged: OperationResult;
    flowPurgeByDatePrivileged: OperationResult;
    flowPurgePrivileged: OperationResult;
    flowSubscribe: FlowExecution;
    flowUnsubscribe: FlowExecution;
    /** Create a new capability. */
    gridCapabilityCreatePrivileged: GridCapability;
    /** Delete a capability. */
    gridCapabilityDeletePrivileged: OperationResult;
    /** Update a capability. */
    gridCapabilityUpdatePrivileged: GridCapability;
    /** Create a new grid cloud provider. */
    gridCloudProviderCreatePrivileged: GridCloudProvider;
    /** Delete a grid cloud provider. */
    gridCloudProviderDeletePrivileged: OperationResult;
    /** Update a grid cloud provider. */
    gridCloudProviderUpdatePrivileged: GridCloudProvider;
    /** Assign a capability to a node. */
    gridNodeCapabilityCreatePrivileged: GridNodeCapability;
    /** Remove a capability from a node. */
    gridNodeCapabilityDeletePrivileged: OperationResult;
    /** Create a new node. */
    gridNodeCreatePrivileged: GridNode;
    /** Delete a node. */
    gridNodeDeletePrivileged: OperationResult;
    /** Update a node. */
    gridNodeUpdatePrivileged: GridNode;
    /** Assign a capability to a provider region. */
    gridProviderRegionCapabilityCreatePrivileged: GridProviderRegionCapability;
    /** Remove a capability from a provider region. */
    gridProviderRegionCapabilityDeletePrivileged: OperationResult;
    /** Create a new provider region. */
    gridProviderRegionCreatePrivileged: GridProviderRegion;
    /** Delete a provider region. */
    gridProviderRegionDeletePrivileged: OperationResult;
    /** Update a provider region. */
    gridProviderRegionUpdatePrivileged: GridProviderRegion;
    /** Create a new region. */
    gridRegionCreatePrivileged: GridRegion;
    /** Delete a region. */
    gridRegionDeletePrivileged: OperationResult;
    /** Update a region. */
    gridRegionUpdatePrivileged: GridRegion;
    /** Assign a capability to a task type. */
    gridTaskCapabilityCreatePrivileged: GridTaskCapability;
    /** Remove a capability from a task type. */
    gridTaskCapabilityDeletePrivileged: OperationResult;
    /** Update a task type capability. */
    gridTaskCapabilityUpdatePrivileged: GridTaskCapability;
    /** Create a new task type. */
    gridTaskCreatePrivileged: GridTask;
    /** Delete a task type. */
    gridTaskDeletePrivileged: OperationResult;
    /** Assign a task type to a cloud provider. */
    gridTaskProviderSupportCreatePrivileged: GridTaskProviderSupport;
    /** Remove a task type from a cloud provider. */
    gridTaskProviderSupportDeletePrivileged: OperationResult;
    /** Update a task. */
    gridTaskUpdatePrivileged: GridTask;
    networkToolDnsCreate: Scalars['String']['output'];
    networkToolPingCreate: Scalars['String']['output'];
    networkToolPortCheckCreate: Scalars['String']['output'];
    networkToolTlsCertificateCreate: Scalars['String']['output'];
    networkToolTracerouteCreate: Scalars['String']['output'];
    networkToolWhoisCreate: Scalars['String']['output'];
    /** Create a new billable action. */
    stripeBillableActionCreatePrivileged: StripeBillableAction;
    /** Delete a billable action. */
    stripeBillableActionDeletePrivileged: OperationResult;
    /** Update a billable action. */
    stripeBillableActionUpdatePrivileged: StripeBillableAction;
};

export type MutationFlowAbortPrivilegedArgs = {
    objectId: Scalars['String']['input'];
};

export type MutationFlowCancelPrivilegedArgs = {
    objectId: Scalars['String']['input'];
    timeout?: InputMaybe<Scalars['Float']['input']>;
};

export type MutationFlowPurgeByDatePrivilegedArgs = {
    date: Scalars['DateTimeISO']['input'];
};

export type MutationFlowPurgePrivilegedArgs = {
    objectId: Scalars['String']['input'];
};

export type MutationFlowSubscribeArgs = {
    input: FlowSubscribeInput;
};

export type MutationFlowUnsubscribeArgs = {
    input: FlowSubscribeInput;
};

export type MutationGridCapabilityCreatePrivilegedArgs = {
    input: GridCapabilityCreateInput;
};

export type MutationGridCapabilityDeletePrivilegedArgs = {
    input: GridCapabilityInput;
};

export type MutationGridCapabilityUpdatePrivilegedArgs = {
    input: GridCapabilityUpdateInput;
};

export type MutationGridCloudProviderCreatePrivilegedArgs = {
    input: GridCloudProviderCreateInput;
};

export type MutationGridCloudProviderDeletePrivilegedArgs = {
    input: GridCloudProviderInput;
};

export type MutationGridCloudProviderUpdatePrivilegedArgs = {
    input: GridCloudProviderUpdateInput;
};

export type MutationGridNodeCapabilityCreatePrivilegedArgs = {
    input: GridNodeCapabilityAssignInput;
};

export type MutationGridNodeCapabilityDeletePrivilegedArgs = {
    input: GridNodeCapabilityRemoveInput;
};

export type MutationGridNodeCreatePrivilegedArgs = {
    input: GridNodeCreateInput;
};

export type MutationGridNodeDeletePrivilegedArgs = {
    input: GridNodeInput;
};

export type MutationGridNodeUpdatePrivilegedArgs = {
    input: GridNodeUpdateInput;
};

export type MutationGridProviderRegionCapabilityCreatePrivilegedArgs = {
    input: GridProviderRegionCapabilityAssignInput;
};

export type MutationGridProviderRegionCapabilityDeletePrivilegedArgs = {
    input: GridProviderRegionCapabilityRemoveInput;
};

export type MutationGridProviderRegionCreatePrivilegedArgs = {
    input: GridProviderRegionCreateInput;
};

export type MutationGridProviderRegionDeletePrivilegedArgs = {
    input: GridProviderRegionInput;
};

export type MutationGridProviderRegionUpdatePrivilegedArgs = {
    input: GridProviderRegionUpdateInput;
};

export type MutationGridRegionCreatePrivilegedArgs = {
    input: GridRegionCreateInput;
};

export type MutationGridRegionDeletePrivilegedArgs = {
    input: GridRegionInput;
};

export type MutationGridRegionUpdatePrivilegedArgs = {
    input: GridRegionUpdateInput;
};

export type MutationGridTaskCapabilityCreatePrivilegedArgs = {
    input: GridTaskCapabilityCreateInput;
};

export type MutationGridTaskCapabilityDeletePrivilegedArgs = {
    input: GridTaskCapabilityDeleteInput;
};

export type MutationGridTaskCapabilityUpdatePrivilegedArgs = {
    input: GridTaskCapabilityUpdateInput;
};

export type MutationGridTaskCreatePrivilegedArgs = {
    input: GridTaskCreateInput;
};

export type MutationGridTaskDeletePrivilegedArgs = {
    input: GridTaskInput;
};

export type MutationGridTaskProviderSupportCreatePrivilegedArgs = {
    input: GridTaskProviderSupportCreateInput;
};

export type MutationGridTaskProviderSupportDeletePrivilegedArgs = {
    input: GridTaskProviderSupportDeleteInput;
};

export type MutationGridTaskUpdatePrivilegedArgs = {
    input: GridTaskUpdateInput;
};

export type MutationNetworkToolDnsCreateArgs = {
    input: NetworkToolDnsCreateInput;
};

export type MutationNetworkToolPingCreateArgs = {
    input: NetworkToolPingCreateInput;
};

export type MutationNetworkToolPortCheckCreateArgs = {
    input: NetworkToolPortCheckCreateInput;
};

export type MutationNetworkToolTlsCertificateCreateArgs = {
    input: NetworkToolTlsCertificateCreateInput;
};

export type MutationNetworkToolTracerouteCreateArgs = {
    input: NetworkToolTracerouteCreateInput;
};

export type MutationNetworkToolWhoisCreateArgs = {
    input: NetworkToolWhoisCreateInput;
};

export type MutationStripeBillableActionCreatePrivilegedArgs = {
    input: StripeBillableActionCreateInput;
};

export type MutationStripeBillableActionDeletePrivilegedArgs = {
    input: StripeBillableActionInput;
};

export type MutationStripeBillableActionUpdatePrivilegedArgs = {
    input: StripeBillableActionUpdateInput;
};

export type NetworkToolDnsCreateInput = {
    domain: Scalars['String']['input'];
    region: GridRegionLevelsInput;
    types?: InputMaybe<Array<DnsRecordType>>;
};

export type NetworkToolHistoryInput = {
    networkTool: ConnectedToolType;
};

export type NetworkToolPingCreateInput = {
    count: Scalars['Float']['input'];
    host: Scalars['String']['input'];
    region: GridRegionLevelsInput;
    timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type NetworkToolPortCheckCreateInput = {
    host: Scalars['String']['input'];
    port: Scalars['Float']['input'];
    region: GridRegionLevelsInput;
    timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type NetworkToolTlsCertificateCreateInput = {
    host: Scalars['String']['input'];
    port: Scalars['Float']['input'];
    region: GridRegionLevelsInput;
    timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type NetworkToolTracerouteCreateInput = {
    host: Scalars['String']['input'];
    maxHops?: InputMaybe<Scalars['Float']['input']>;
    queryCount?: InputMaybe<Scalars['Float']['input']>;
    region: GridRegionLevelsInput;
    timeoutMs?: InputMaybe<Scalars['Float']['input']>;
    waitTime?: InputMaybe<Scalars['Float']['input']>;
};

export type NetworkToolWhoisCreateInput = {
    host: Scalars['String']['input'];
    region: GridRegionLevelsInput;
    timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type OperationResult = {
    __typename?: 'OperationResult';
    success: Scalars['Boolean']['output'];
};

/** The order direction of a query */
export enum OrderByDirection {
    Ascending = 'Ascending',
    Descending = 'Descending',
}

export type OrderByInput = {
    direction?: InputMaybe<OrderByDirection>;
    key: Scalars['String']['input'];
};

export type Pagination = {
    __typename?: 'Pagination';
    itemIndex: Scalars['Int']['output'];
    itemIndexForNextPage?: Maybe<Scalars['Int']['output']>;
    itemIndexForPreviousPage?: Maybe<Scalars['Int']['output']>;
    itemsPerPage: Scalars['Int']['output'];
    itemsTotal: Scalars['Int']['output'];
    page: Scalars['Int']['output'];
    pagesTotal: Scalars['Int']['output'];
};

export type PaginationFlowExecutionResult = {
    __typename?: 'PaginationFlowExecutionResult';
    items: Array<FlowExecution>;
    pagination: Pagination;
};

export type PaginationGridCapability = {
    __typename?: 'PaginationGridCapability';
    items: Array<GridCapability>;
    pagination: Pagination;
};

export type PaginationInput = {
    filters?: InputMaybe<Array<ColumnFilterInput>>;
    itemIndex?: InputMaybe<Scalars['Int']['input']>;
    itemsPerPage: Scalars['Int']['input'];
    orderBy?: InputMaybe<Array<OrderByInput>>;
};

export type Query = {
    __typename?: 'Query';
    flowExecution?: Maybe<FlowExecution>;
    flowExecutionHistory: PaginationFlowExecutionResult;
    flowInfoPrivileged: Scalars['JSON']['output'];
    /** Get all capabilities. */
    gridCapabilitiesPrivileged: Array<PaginationGridCapability>;
    /** Get a capability by ID or name. */
    gridCapabilityPrivileged?: Maybe<GridCapability>;
    /** Get a grid cloud provider by ID or name. */
    gridCloudProviderPrivileged?: Maybe<GridCloudProvider>;
    /** Get all grid cloud providers. */
    gridCloudProvidersPrivileged: Array<GridCloudProvider>;
    /** Get all node capabilities. */
    gridNodeCapabilitiesPrivileged: Array<GridNodeCapability>;
    /** Get a node by ID or name. */
    gridNodePrivileged?: Maybe<GridNode>;
    /** Get all nodes. */
    gridNodesPrivileged: Array<GridNode>;
    /** Get all provider region capabilities. */
    gridProviderRegionCapabilitiesPrivileged: Array<GridProviderRegionCapability>;
    /** Get a provider region by ID or other criteria. */
    gridProviderRegionPrivleged?: Maybe<GridProviderRegion>;
    /** Get all provider regions. */
    gridProviderRegionsPrivileged: Array<GridProviderRegion>;
    /** Get all regions. */
    gridRegionLevels: Array<GridRegionLevels>;
    /** Get a region by ID or name. */
    gridRegionPrivileged?: Maybe<GridRegion>;
    /** Get all regions. */
    gridRegionsPrivileged: Array<GridRegion>;
    /** Get all task type capabilities. */
    gridTaskCapabilitiesPrivileged: Array<GridTaskCapability>;
    /** Get a specific task execution. */
    gridTaskExecutionPrivileged?: Maybe<GridTaskExecution>;
    /** Get task executions. */
    gridTaskExecutionsPrivileged: Array<GridTaskExecution>;
    /** Get a task type by ID, name, or name and version. */
    gridTaskPrivileged?: Maybe<GridTask>;
    /** Get all task provider supports. */
    gridTaskProviderSupportPrivileged: Array<GridTaskProviderSupport>;
    /** Get all task types. */
    gridTasksPrivileged: Array<GridTask>;
    networkToolHistory: PaginationFlowExecutionResult;
    /** Get a single billable action by ID or billableAction. */
    stripeBillableActionPrivileged?: Maybe<StripeBillableAction>;
    /** List all billable actions. */
    stripeBillableActionsPrivileged: Array<StripeBillableAction>;
};

export type QueryFlowExecutionArgs = {
    input: FlowExecutionInput;
};

export type QueryFlowExecutionHistoryArgs = {
    input: FlowExecutionHistoryInput;
    pagination: PaginationInput;
};

export type QueryFlowInfoPrivilegedArgs = {
    objectId: Scalars['String']['input'];
};

export type QueryGridCapabilitiesPrivilegedArgs = {
    pagination: PaginationInput;
};

export type QueryGridCapabilityPrivilegedArgs = {
    input: GridCapabilityInput;
};

export type QueryGridCloudProviderPrivilegedArgs = {
    input: GridCloudProviderInput;
};

export type QueryGridCloudProvidersPrivilegedArgs = {
    input?: InputMaybe<GridCloudProviderListInput>;
};

export type QueryGridNodeCapabilitiesPrivilegedArgs = {
    input?: InputMaybe<GridNodeCapabilityListInput>;
    pagination: PaginationInput;
};

export type QueryGridNodePrivilegedArgs = {
    input: GridNodeInput;
};

export type QueryGridNodesPrivilegedArgs = {
    input?: InputMaybe<GridNodeListInput>;
    pagination: PaginationInput;
};

export type QueryGridProviderRegionCapabilitiesPrivilegedArgs = {
    input?: InputMaybe<GridProviderRegionCapabilityListInput>;
};

export type QueryGridProviderRegionPrivlegedArgs = {
    input: GridProviderRegionInput;
};

export type QueryGridProviderRegionsPrivilegedArgs = {
    input?: InputMaybe<GridProviderRegionListInput>;
};

export type QueryGridRegionLevelsArgs = {
    input: GridRegionLevelsListInput;
};

export type QueryGridRegionPrivilegedArgs = {
    input: GridRegionInput;
};

export type QueryGridRegionsPrivilegedArgs = {
    input?: InputMaybe<GridRegionListInput>;
};

export type QueryGridTaskCapabilitiesPrivilegedArgs = {
    input?: InputMaybe<GridTaskCapabilityListInput>;
};

export type QueryGridTaskExecutionPrivilegedArgs = {
    input: GridTaskExecutionInput;
};

export type QueryGridTaskExecutionsPrivilegedArgs = {
    input?: InputMaybe<GridTaskExecutionListInput>;
    pagination: PaginationInput;
};

export type QueryGridTaskPrivilegedArgs = {
    input: GridTaskInput;
};

export type QueryGridTaskProviderSupportPrivilegedArgs = {
    input?: InputMaybe<TaskProviderSupportListInput>;
};

export type QueryGridTasksPrivilegedArgs = {
    input?: InputMaybe<GridTaskListInput>;
};

export type QueryNetworkToolHistoryArgs = {
    input: NetworkToolHistoryInput;
    pagination: PaginationInput;
};

export type QueryStripeBillableActionPrivilegedArgs = {
    input: StripeBillableActionInput;
};

export type QueryStripeBillableActionsPrivilegedArgs = {
    input?: InputMaybe<StripeBillableActionListInput>;
};

export type StripeBillableAction = {
    __typename?: 'StripeBillableAction';
    billableAction: Scalars['String']['output'];
    billableActionLogs: Array<StripeBillableActionLog>;
    createdAt: Scalars['DateTimeISO']['output'];
    createdByAccountId: Scalars['String']['output'];
    createdByProfileId: Scalars['String']['output'];
    description: Scalars['String']['output'];
    id: Scalars['String']['output'];
    stripeEventName: Scalars['String']['output'];
    unitValue: Scalars['Float']['output'];
    updatedAt: Scalars['DateTimeISO']['output'];
    updatedByAccountId?: Maybe<Scalars['String']['output']>;
    updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type StripeBillableActionCreateInput = {
    billableAction: Scalars['String']['input'];
    description: Scalars['String']['input'];
    stripeEventName: Scalars['String']['input'];
    unitValue: Scalars['Float']['input'];
};

export type StripeBillableActionInput = {
    billableAction?: InputMaybe<Scalars['String']['input']>;
    id?: InputMaybe<Scalars['String']['input']>;
};

export type StripeBillableActionListInput = {
    stripeEventName?: InputMaybe<Scalars['String']['input']>;
};

export type StripeBillableActionLog = {
    __typename?: 'StripeBillableActionLog';
    billableAction: StripeBillableAction;
    billableActionId: Scalars['String']['output'];
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['String']['output'];
    meteredEventLog: StripeMeteredEventLog;
    meteredEventLogId: Scalars['String']['output'];
    sourceId: Scalars['String']['output'];
    sourceType: Scalars['String']['output'];
    timestamp: Scalars['DateTimeISO']['output'];
    value: Scalars['Float']['output'];
};

export type StripeBillableActionUpdateInput = {
    billableAction?: InputMaybe<Scalars['String']['input']>;
    description?: InputMaybe<Scalars['String']['input']>;
    id: Scalars['String']['input'];
    stripeEventName?: InputMaybe<Scalars['String']['input']>;
    unitValue?: InputMaybe<Scalars['Float']['input']>;
};

export type StripeCustomer = {
    __typename?: 'StripeCustomer';
    createdAt: Scalars['DateTimeISO']['output'];
    id: Scalars['String']['output'];
    stripeCustomerId: Scalars['String']['output'];
};

export type StripeMeteredEventLog = {
    __typename?: 'StripeMeteredEventLog';
    createdAt: Scalars['DateTimeISO']['output'];
    customerId: Scalars['String']['output'];
    eventName: Scalars['String']['output'];
    id: Scalars['String']['output'];
    idempotencyKey: Scalars['String']['output'];
    requestId: Scalars['String']['output'];
    status: StripeMeteredEventLogStatus;
    stripeCustomer: StripeCustomer;
    timestamp: Scalars['DateTimeISO']['output'];
    value: Scalars['Float']['output'];
};

/** The status of the Stripe metered event log. */
export enum StripeMeteredEventLogStatus {
    Failed = 'Failed',
    Pending = 'Pending',
    Success = 'Success',
}

export type TaskProviderSupportListInput = {
    cloudProviderId?: InputMaybe<Scalars['String']['input']>;
    taskId?: InputMaybe<Scalars['String']['input']>;
};

export type GridRegionLevelsQueryVariables = Exact<{
    input: GridRegionLevelsListInput;
}>;

export type GridRegionLevelsQuery = {
    __typename?: 'Query';
    gridRegionLevels: Array<{
        __typename?: 'GridRegionLevels';
        region?: string | null;
        country?: string | null;
        division?: string | null;
        locality?: string | null;
        site?: string | null;
    }>;
};

export type NetworkToolPortCheckCreateMutationVariables = Exact<{
    input: NetworkToolPortCheckCreateInput;
}>;

export type NetworkToolPortCheckCreateMutation = { __typename?: 'Mutation'; networkToolPortCheckCreate: string };

export type NetworkToolDnsCreateMutationVariables = Exact<{
    input: NetworkToolDnsCreateInput;
}>;

export type NetworkToolDnsCreateMutation = { __typename?: 'Mutation'; networkToolDnsCreate: string };

export type NetworkToolPingCreateMutationVariables = Exact<{
    input: NetworkToolPingCreateInput;
}>;

export type NetworkToolPingCreateMutation = { __typename?: 'Mutation'; networkToolPingCreate: string };

export type NetworkToolTlsCertificateCreateMutationVariables = Exact<{
    input: NetworkToolTlsCertificateCreateInput;
}>;

export type NetworkToolTlsCertificateCreateMutation = {
    __typename?: 'Mutation';
    networkToolTlsCertificateCreate: string;
};

export type NetworkToolTracerouteCreateMutationVariables = Exact<{
    input: NetworkToolTracerouteCreateInput;
}>;

export type NetworkToolTracerouteCreateMutation = { __typename?: 'Mutation'; networkToolTracerouteCreate: string };

export type NetworkToolWhoisCreateMutationVariables = Exact<{
    input: NetworkToolWhoisCreateInput;
}>;

export type NetworkToolWhoisCreateMutation = { __typename?: 'Mutation'; networkToolWhoisCreate: string };

export type NetworkToolHistoryQueryVariables = Exact<{
    input: NetworkToolHistoryInput;
    pagination: PaginationInput;
}>;

export type NetworkToolHistoryQuery = {
    __typename?: 'Query';
    networkToolHistory: {
        __typename?: 'PaginationFlowExecutionResult';
        items: Array<{
            __typename?: 'FlowExecution';
            id: string;
            triggerId?: string | null;
            triggerType: FlowTriggerType;
            status: FlowExecutionStatus;
            metadata?: any | null;
            flowVersionId?: string | null;
            elapsedTimeMs?: number | null;
            startedAt: any;
            completedAt?: any | null;
            updatedAt: any;
            createdAt: any;
            errors?: Array<any> | null;
            stepExecutions: Array<{
                __typename?: 'FlowStepExecution';
                stepId: string;
                status: FlowStepExecutionStatus;
                actionType: string;
                attempt: number;
                input?: any | null;
                output?: any | null;
                updatedAt: any;
                elapsedTimeMs?: number | null;
                startedAt?: any | null;
                completedAt?: any | null;
                createdAt: any;
                errors?: any | null;
            }>;
        }>;
        pagination: {
            __typename?: 'Pagination';
            itemIndex: number;
            itemIndexForPreviousPage?: number | null;
            itemIndexForNextPage?: number | null;
            itemsPerPage: number;
            itemsTotal: number;
            page: number;
            pagesTotal: number;
        };
    };
};

export type FlowExecutionQueryVariables = Exact<{
    input: FlowExecutionInput;
}>;

export type FlowExecutionQuery = {
    __typename?: 'Query';
    flowExecution?: {
        __typename?: 'FlowExecution';
        id: string;
        triggerId?: string | null;
        triggerType: FlowTriggerType;
        flowVersionId?: string | null;
        status: FlowExecutionStatus;
        input?: any | null;
        output?: any | null;
        elapsedTimeMs?: number | null;
        errors?: Array<any> | null;
        startedAt: any;
        completedAt?: any | null;
        updatedAt: any;
        createdAt: any;
        stepExecutions: Array<{
            __typename?: 'FlowStepExecution';
            id: string;
            stepId: string;
            flowExecutionId: string;
            status: FlowStepExecutionStatus;
            attempt: number;
            actionType: string;
            input?: any | null;
            output?: any | null;
            elapsedTimeMs?: number | null;
            startedAt?: any | null;
            completedAt?: any | null;
            updatedAt: any;
            createdAt: any;
            errors?: any | null;
        }>;
    } | null;
};

export type FlowExecutionHistoryQueryVariables = Exact<{
    input: FlowExecutionHistoryInput;
    pagination: PaginationInput;
}>;

export type FlowExecutionHistoryQuery = {
    __typename?: 'Query';
    flowExecutionHistory: {
        __typename?: 'PaginationFlowExecutionResult';
        items: Array<{
            __typename?: 'FlowExecution';
            id: string;
            triggerId?: string | null;
            triggerType: FlowTriggerType;
            flowVersionId?: string | null;
            status: FlowExecutionStatus;
            elapsedTimeMs?: number | null;
            startedAt: any;
            completedAt?: any | null;
            updatedAt: any;
            createdAt: any;
            errors?: Array<any> | null;
            stepExecutions: Array<{
                __typename?: 'FlowStepExecution';
                id: string;
                stepId: string;
                flowExecutionId: string;
                status: FlowStepExecutionStatus;
                attempt: number;
                actionType: string;
                input?: any | null;
                output?: any | null;
                elapsedTimeMs?: number | null;
                startedAt?: any | null;
                completedAt?: any | null;
                updatedAt: any;
                createdAt: any;
                errors?: any | null;
            }>;
        }>;
        pagination: {
            __typename?: 'Pagination';
            itemIndex: number;
            itemIndexForPreviousPage?: number | null;
            itemIndexForNextPage?: number | null;
            itemsPerPage: number;
            itemsTotal: number;
            page: number;
            pagesTotal: number;
        };
    };
};

export const GridRegionLevelsDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GridRegionLevels' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'GridRegionLevelsListInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'gridRegionLevels' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'region' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'country' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'division' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'locality' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'site' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GridRegionLevelsQuery, GridRegionLevelsQueryVariables>;
export const NetworkToolPortCheckCreateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'NetworkToolPortCheckCreate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'NetworkToolPortCheckCreateInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'networkToolPortCheckCreate' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NetworkToolPortCheckCreateMutation, NetworkToolPortCheckCreateMutationVariables>;
export const NetworkToolDnsCreateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'NetworkToolDnsCreate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'NetworkToolDnsCreateInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'networkToolDnsCreate' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NetworkToolDnsCreateMutation, NetworkToolDnsCreateMutationVariables>;
export const NetworkToolPingCreateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'NetworkToolPingCreate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'NetworkToolPingCreateInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'networkToolPingCreate' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NetworkToolPingCreateMutation, NetworkToolPingCreateMutationVariables>;
export const NetworkToolTlsCertificateCreateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'NetworkToolTlsCertificateCreate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: {
                            kind: 'NamedType',
                            name: { kind: 'Name', value: 'NetworkToolTlsCertificateCreateInput' },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'networkToolTlsCertificateCreate' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NetworkToolTlsCertificateCreateMutation, NetworkToolTlsCertificateCreateMutationVariables>;
export const NetworkToolTracerouteCreateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'NetworkToolTracerouteCreate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'NetworkToolTracerouteCreateInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'networkToolTracerouteCreate' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NetworkToolTracerouteCreateMutation, NetworkToolTracerouteCreateMutationVariables>;
export const NetworkToolWhoisCreateDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'NetworkToolWhoisCreate' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'NetworkToolWhoisCreateInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'networkToolWhoisCreate' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                        ],
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NetworkToolWhoisCreateMutation, NetworkToolWhoisCreateMutationVariables>;
export const NetworkToolHistoryDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'NetworkToolHistory' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'NetworkToolHistoryInput' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'networkToolHistory' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'pagination' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'items' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'triggerId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'triggerType' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'stepExecutions' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'stepId' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'actionType' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'attempt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'input' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'output' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'elapsedTimeMs' },
                                                        },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'completedAt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'errors' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'metadata' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'flowVersionId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'elapsedTimeMs' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'completedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'errors' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pagination' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'itemIndex' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'itemIndexForPreviousPage' },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'itemIndexForNextPage' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'itemsPerPage' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'itemsTotal' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'pagesTotal' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<NetworkToolHistoryQuery, NetworkToolHistoryQueryVariables>;
export const FlowExecutionDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FlowExecution' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'FlowExecutionInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'flowExecution' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'triggerId' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'triggerType' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'flowVersionId' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'input' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'output' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stepExecutions' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'stepId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'flowExecutionId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'attempt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'actionType' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'input' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'output' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'elapsedTimeMs' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'completedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'errors' } },
                                        ],
                                    },
                                },
                                { kind: 'Field', name: { kind: 'Name', value: 'elapsedTimeMs' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'errors' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'completedAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FlowExecutionQuery, FlowExecutionQueryVariables>;
export const FlowExecutionHistoryDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'FlowExecutionHistory' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'FlowExecutionHistoryInput' } },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
                    type: {
                        kind: 'NonNullType',
                        type: { kind: 'NamedType', name: { kind: 'Name', value: 'PaginationInput' } },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'flowExecutionHistory' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'input' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'input' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'pagination' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'pagination' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'items' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'triggerId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'triggerType' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'flowVersionId' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'stepExecutions' },
                                                selectionSet: {
                                                    kind: 'SelectionSet',
                                                    selections: [
                                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'stepId' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'flowExecutionId' },
                                                        },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'attempt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'actionType' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'input' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'output' } },
                                                        {
                                                            kind: 'Field',
                                                            name: { kind: 'Name', value: 'elapsedTimeMs' },
                                                        },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'completedAt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                                        { kind: 'Field', name: { kind: 'Name', value: 'errors' } },
                                                    ],
                                                },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'elapsedTimeMs' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'startedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'completedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'errors' } },
                                        ],
                                    },
                                },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'pagination' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'itemIndex' } },
                                            {
                                                kind: 'Field',
                                                name: { kind: 'Name', value: 'itemIndexForPreviousPage' },
                                            },
                                            { kind: 'Field', name: { kind: 'Name', value: 'itemIndexForNextPage' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'itemsPerPage' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'itemsTotal' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'pagesTotal' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<FlowExecutionHistoryQuery, FlowExecutionHistoryQueryVariables>;
export type GraphQLInputTypeMetadata =
    | GraphQLInputScalarTypeMetadata
    | GraphQLInputEnumTypeMetadata
    | GraphQLInputObjectTypeMetadata;

interface BaseGraphQLInputTypeMetadata {
    readonly type: string;
    readonly description?: string;
}

export interface GraphQLInputScalarTypeMetadata extends BaseGraphQLInputTypeMetadata {
    readonly kind: 'scalar';
}

export interface GraphQLInputEnumTypeMetadata extends BaseGraphQLInputTypeMetadata {
    readonly kind: 'enum';
    readonly values: Array<string>;
}

export interface GraphQLInputObjectTypeMetadata extends BaseGraphQLInputTypeMetadata {
    readonly kind: 'object';
    readonly fields: ReadonlyArray<GraphQLInputObjectFieldMetadata>;
}

export type GraphQLInputObjectFieldMetadata =
    | GraphQLInputObjectScalarFieldMetadata
    | GraphQLInputObjectEnumFieldMetadata
    | GraphQLInputObjectObjectFieldMetadata
    | GraphQLInputObjectListFieldMetadata
    | GraphQLInputObjectScalarListFieldMetadata;

interface BaseGraphQLInputObjectFieldMetadata {
    readonly name: string;
    readonly required: boolean;
    readonly validation?: ReadonlyArray<GraphQLInputObjectFieldValidationMetadata>;
}

export interface GraphQLInputObjectScalarFieldMetadata extends BaseGraphQLInputObjectFieldMetadata {
    readonly kind: 'scalar';
    readonly type: string;
}

export interface GraphQLInputObjectEnumFieldMetadata extends BaseGraphQLInputObjectFieldMetadata {
    readonly kind: 'enum';
    readonly type: GraphQLInputEnumTypeMetadata;
}

export interface GraphQLInputObjectObjectFieldMetadata extends BaseGraphQLInputObjectFieldMetadata {
    readonly kind: 'object';
    readonly type: GraphQLInputObjectTypeMetadata;
}

interface BaseGraphQLInputObjectListFieldMetadata extends BaseGraphQLInputObjectFieldMetadata {
    readonly kind: 'list';
    readonly allowsEmpty: boolean;
}

export interface GraphQLInputObjectListFieldMetadata extends BaseGraphQLInputObjectListFieldMetadata {
    readonly itemKind: 'enum' | 'object';
    readonly type: GraphQLInputTypeMetadata;
}

export interface GraphQLInputObjectScalarListFieldMetadata extends BaseGraphQLInputObjectListFieldMetadata {
    readonly itemKind: 'scalar';
    readonly type: string;
}

export interface GraphQLInputObjectFieldValidationMetadata {
    readonly type: string;
    readonly constraints?: ReadonlyArray<any>;
    readonly each?: boolean;
    readonly context?: any;
    readonly options?: any;
}

export namespace GraphQLInputTypes {
    export const FlowExecutionStatus: GraphQLInputEnumTypeMetadata = {
        kind: 'enum',
        type: 'FlowExecutionStatus',
        values: ['NotStarted', 'Running', 'Success', 'Failed', 'Canceled'],
    };

    export const FlowExecutionHistoryInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'FlowExecutionHistoryInput',
        fields: [
            {
                name: 'flowTypeId',
                kind: 'scalar',
                type: 'String',
                required: false,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'flowVersionId',
                kind: 'scalar',
                type: 'String',
                required: false,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'triggerId',
                kind: 'scalar',
                type: 'String',
                required: false,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'entryPointId',
                kind: 'scalar',
                type: 'String',
                required: false,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'status',
                kind: 'enum',
                type: GraphQLInputTypes.FlowExecutionStatus,
                required: true,
                validation: [
                    {
                        type: 'isEnum',
                        constraints: [
                            {
                                NotStarted: 'NotStarted',
                                Running: 'Running',
                                Success: 'Success',
                                Failed: 'Failed',
                                Canceled: 'Canceled',
                            },
                            ['NotStarted', 'Running', 'Success', 'Failed', 'Canceled'],
                        ],
                    },
                ],
            },
        ],
    };

    export const FlowExecutionInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'FlowExecutionInput',
        fields: [
            {
                name: 'executionId',
                kind: 'scalar',
                type: 'String',
                required: true,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
        ],
    };

    export const OrderByDirection: GraphQLInputEnumTypeMetadata = {
        kind: 'enum',
        type: 'OrderByDirection',
        values: ['Ascending', 'Descending'],
    };

    export const OrderByInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'OrderByInput',
        fields: [
            {
                name: 'key',
                kind: 'scalar',
                type: 'String',
                required: true,
            },
            {
                name: 'direction',
                kind: 'enum',
                type: GraphQLInputTypes.OrderByDirection,
                required: false,
            },
        ],
    };

    export const ColumnFilterConditionOperator: GraphQLInputEnumTypeMetadata = {
        kind: 'enum',
        type: 'ColumnFilterConditionOperator',
        values: [
            'Equal',
            'NotEqual',
            'GreaterThan',
            'GreaterThanOrEqual',
            'LessThan',
            'LessThanOrEqual',
            'Like',
            'NotLike',
            'In',
            'NotIn',
            'IsNull',
            'IsNotNull',
        ],
    };

    export const ColumnFilterInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'ColumnFilterInput',
        fields: [
            {
                name: 'operator',
                kind: 'enum',
                type: GraphQLInputTypes.ColumnFilterConditionOperator,
                required: true,
            },
            {
                name: 'caseSensitive',
                kind: 'scalar',
                type: 'Boolean',
                required: false,
            },
            {
                name: 'column',
                kind: 'scalar',
                type: 'String',
                required: true,
            },
            {
                name: 'value',
                kind: 'scalar',
                type: 'JSON',
                required: true,
            },
        ],
    };

    export const PaginationInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'PaginationInput',
        fields: [
            {
                name: 'itemsPerPage',
                kind: 'scalar',
                type: 'Int',
                required: true,
            },
            {
                name: 'itemIndex',
                kind: 'scalar',
                type: 'Int',
                required: false,
            },
            {
                name: 'filters',
                kind: 'object',
                type: GraphQLInputTypes.ColumnFilterInput,
                required: true,
            },
            {
                name: 'orderBy',
                kind: 'object',
                type: GraphQLInputTypes.OrderByInput,
                required: true,
            },
        ],
    };

    export const ConnectedToolType: GraphQLInputEnumTypeMetadata = {
        kind: 'enum',
        type: 'ConnectedToolType',
        values: ['Dns', 'Ping', 'PortCheck', 'Traceroute', 'TlsCertificate', 'Whois'],
    };

    export const NetworkToolHistoryInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'NetworkToolHistoryInput',
        fields: [
            {
                name: 'networkTool',
                kind: 'enum',
                type: GraphQLInputTypes.ConnectedToolType,
                required: true,
                validation: [
                    {
                        type: 'isEnum',
                        constraints: [
                            {
                                Dns: 'Dns',
                                Ping: 'Ping',
                                PortCheck: 'PortCheck',
                                Traceroute: 'Traceroute',
                                TlsCertificate: 'TlsCertificate',
                                Whois: 'Whois',
                            },
                            ['Dns', 'Ping', 'PortCheck', 'Traceroute', 'TlsCertificate', 'Whois'],
                        ],
                    },
                ],
            },
        ],
    };

    export const NetworkToolWhoisCreateInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'NetworkToolWhoisCreateInput',
        fields: [
            {
                name: 'host',
                kind: 'scalar',
                type: 'String',
                required: true,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'timeoutMs',
                kind: 'scalar',
                type: 'Float',
                required: false,
                validation: [
                    {
                        type: 'max',
                        constraints: [60000],
                    },
                    {
                        type: 'min',
                        constraints: [1000],
                    },
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'unknown',
                        constraints: [null],
                    },
                ],
            },
            {
                name: 'region',
                kind: 'object',
                type: GraphQLInputTypes.GridRegionLevelsInput,
                required: true,
            },
        ],
    };

    export const NetworkToolTracerouteCreateInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'NetworkToolTracerouteCreateInput',
        fields: [
            {
                name: 'host',
                kind: 'scalar',
                type: 'String',
                required: true,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'maxHops',
                kind: 'scalar',
                type: 'Float',
                required: false,
                validation: [
                    {
                        type: 'max',
                        constraints: [255],
                    },
                    {
                        type: 'min',
                        constraints: [1],
                    },
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'unknown',
                        constraints: [null],
                    },
                ],
            },
            {
                name: 'queryCount',
                kind: 'scalar',
                type: 'Float',
                required: false,
                validation: [
                    {
                        type: 'max',
                        constraints: [10],
                    },
                    {
                        type: 'min',
                        constraints: [1],
                    },
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'unknown',
                        constraints: [null],
                    },
                ],
            },
            {
                name: 'waitTime',
                kind: 'scalar',
                type: 'Float',
                required: false,
                validation: [
                    {
                        type: 'max',
                        constraints: [10],
                    },
                    {
                        type: 'min',
                        constraints: [1],
                    },
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'unknown',
                        constraints: [null],
                    },
                ],
            },
            {
                name: 'timeoutMs',
                kind: 'scalar',
                type: 'Float',
                required: false,
                validation: [
                    {
                        type: 'max',
                        constraints: [60000],
                    },
                    {
                        type: 'min',
                        constraints: [1000],
                    },
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'unknown',
                        constraints: [null],
                    },
                ],
            },
            {
                name: 'region',
                kind: 'object',
                type: GraphQLInputTypes.GridRegionLevelsInput,
                required: true,
            },
        ],
    };

    export const NetworkToolTlsCertificateCreateInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'NetworkToolTlsCertificateCreateInput',
        fields: [
            {
                name: 'host',
                kind: 'scalar',
                type: 'String',
                required: true,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'port',
                kind: 'scalar',
                type: 'Float',
                required: true,
                validation: [
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'max',
                        constraints: [65535],
                    },
                    {
                        type: 'min',
                        constraints: [1],
                    },
                ],
            },
            {
                name: 'timeoutMs',
                kind: 'scalar',
                type: 'Float',
                required: false,
                validation: [
                    {
                        type: 'max',
                        constraints: [60000],
                    },
                    {
                        type: 'min',
                        constraints: [1000],
                    },
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'unknown',
                        constraints: [null],
                    },
                ],
            },
            {
                name: 'region',
                kind: 'object',
                type: GraphQLInputTypes.GridRegionLevelsInput,
                required: true,
            },
        ],
    };

    export const NetworkToolPingCreateInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'NetworkToolPingCreateInput',
        fields: [
            {
                name: 'host',
                kind: 'scalar',
                type: 'String',
                required: true,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'count',
                kind: 'scalar',
                type: 'Float',
                required: true,
                validation: [
                    {
                        type: 'max',
                        constraints: [10],
                    },
                    {
                        type: 'min',
                        constraints: [1],
                    },
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'unknown',
                        constraints: [null],
                    },
                ],
            },
            {
                name: 'timeoutMs',
                kind: 'scalar',
                type: 'Float',
                required: false,
                validation: [
                    {
                        type: 'max',
                        constraints: [60000],
                    },
                    {
                        type: 'min',
                        constraints: [1000],
                    },
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'unknown',
                        constraints: [null],
                    },
                ],
            },
            {
                name: 'region',
                kind: 'object',
                type: GraphQLInputTypes.GridRegionLevelsInput,
                required: true,
            },
        ],
    };

    export const DnsRecordType: GraphQLInputEnumTypeMetadata = {
        kind: 'enum',
        type: 'DnsRecordType',
        values: ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'PTR', 'SRV', 'SOA'],
    };

    export const NetworkToolDnsCreateInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'NetworkToolDnsCreateInput',
        fields: [
            {
                name: 'domain',
                kind: 'scalar',
                type: 'String',
                required: true,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'types',
                kind: 'enum',
                type: GraphQLInputTypes.DnsRecordType,
                required: true,
            },
            {
                name: 'region',
                kind: 'object',
                type: GraphQLInputTypes.GridRegionLevelsInput,
                required: true,
            },
        ],
    };

    export const GridRegionLevelsInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'GridRegionLevelsInput',
        fields: [
            {
                name: 'region',
                kind: 'scalar',
                type: 'String',
                required: false,
            },
            {
                name: 'country',
                kind: 'scalar',
                type: 'String',
                required: false,
            },
            {
                name: 'division',
                kind: 'scalar',
                type: 'String',
                required: false,
            },
            {
                name: 'locality',
                kind: 'scalar',
                type: 'String',
                required: false,
            },
            {
                name: 'site',
                kind: 'scalar',
                type: 'String',
                required: false,
            },
        ],
    };

    export const NetworkToolPortCheckCreateInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'NetworkToolPortCheckCreateInput',
        fields: [
            {
                name: 'host',
                kind: 'scalar',
                type: 'String',
                required: true,
                validation: [
                    {
                        type: 'isNotEmpty',
                    },
                    {
                        type: 'isString',
                    },
                ],
            },
            {
                name: 'port',
                kind: 'scalar',
                type: 'Float',
                required: true,
                validation: [
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'max',
                        constraints: [65535],
                    },
                    {
                        type: 'min',
                        constraints: [1],
                    },
                ],
            },
            {
                name: 'timeoutMs',
                kind: 'scalar',
                type: 'Float',
                required: false,
                validation: [
                    {
                        type: 'max',
                        constraints: [60000],
                    },
                    {
                        type: 'min',
                        constraints: [1000],
                    },
                    {
                        type: 'isInt',
                    },
                    {
                        type: 'unknown',
                        constraints: [null],
                    },
                ],
            },
            {
                name: 'region',
                kind: 'object',
                type: GraphQLInputTypes.GridRegionLevelsInput,
                required: true,
            },
        ],
    };

    export const GridRegionLevel: GraphQLInputEnumTypeMetadata = {
        kind: 'enum',
        type: 'GridRegionLevel',
        values: ['Region', 'Country', 'Division', 'Locality', 'Site'],
    };

    export const GridRegionLevelsListInput: GraphQLInputObjectTypeMetadata = {
        kind: 'object',
        type: 'GridRegionLevelsListInput',
        fields: [
            {
                name: 'level',
                kind: 'enum',
                type: GraphQLInputTypes.GridRegionLevel,
                required: true,
                validation: [
                    {
                        type: 'isEnum',
                        constraints: [
                            {
                                Region: 'region',
                                Country: 'country',
                                Division: 'division',
                                Locality: 'locality',
                                Site: 'site',
                            },
                            ['region', 'country', 'division', 'locality', 'site'],
                        ],
                    },
                ],
            },
        ],
    };
}

export interface GraphQLOperationMetadata<DocumentType> {
    readonly operation: string;
    readonly operationType: 'query' | 'mutation' | 'subscription';
    readonly document: DocumentType;
    readonly parameters?: ReadonlyArray<GraphQLOperationParameterMetadata>;
}

export type GraphQLOperationParameterMetadata =
    | GraphQLOperationScalarParameterMetadata
    | GraphQLOperationUnitParameterMetadata
    | GraphQLOperationListParameterMetadata
    | GraphQLOperationScalarListParameterMetadata;

interface BaseGraphQLOperationParameterMetadata {
    readonly parameter: string;
    readonly required: boolean;
}

export interface GraphQLOperationScalarParameterMetadata extends BaseGraphQLOperationParameterMetadata {
    readonly kind: 'scalar';
    readonly type: string;
}

export interface GraphQLOperationUnitParameterMetadata extends BaseGraphQLOperationParameterMetadata {
    readonly kind: 'enum' | 'object';
    readonly type: GraphQLInputTypeMetadata;
}

interface BaseGraphQLOperationListParameterMetadata extends BaseGraphQLOperationParameterMetadata {
    readonly kind: 'list';
    readonly allowsEmpty: boolean;
}

export interface GraphQLOperationListParameterMetadata extends BaseGraphQLOperationListParameterMetadata {
    readonly itemKind: 'enum' | 'object';
    readonly type: GraphQLInputTypeMetadata;
}

export interface GraphQLOperationScalarListParameterMetadata extends BaseGraphQLOperationListParameterMetadata {
    readonly itemKind: 'scalar';
    readonly type: string;
}

export const GridRegionLevelsOperation: GraphQLOperationMetadata<typeof GridRegionLevelsDocument> = {
    operation: 'GridRegionLevels',
    operationType: 'query',
    document: GridRegionLevelsDocument,
    parameters: [
        {
            parameter: 'input',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.GridRegionLevelsListInput,
        },
    ],
};

export const NetworkToolPortCheckCreateOperation: GraphQLOperationMetadata<typeof NetworkToolPortCheckCreateDocument> =
    {
        operation: 'NetworkToolPortCheckCreate',
        operationType: 'mutation',
        document: NetworkToolPortCheckCreateDocument,
        parameters: [
            {
                parameter: 'input',
                required: true,
                kind: 'object',
                type: GraphQLInputTypes.NetworkToolPortCheckCreateInput,
            },
        ],
    };

export const NetworkToolDnsCreateOperation: GraphQLOperationMetadata<typeof NetworkToolDnsCreateDocument> = {
    operation: 'NetworkToolDnsCreate',
    operationType: 'mutation',
    document: NetworkToolDnsCreateDocument,
    parameters: [
        {
            parameter: 'input',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.NetworkToolDnsCreateInput,
        },
    ],
};

export const NetworkToolPingCreateOperation: GraphQLOperationMetadata<typeof NetworkToolPingCreateDocument> = {
    operation: 'NetworkToolPingCreate',
    operationType: 'mutation',
    document: NetworkToolPingCreateDocument,
    parameters: [
        {
            parameter: 'input',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.NetworkToolPingCreateInput,
        },
    ],
};

export const NetworkToolTlsCertificateCreateOperation: GraphQLOperationMetadata<
    typeof NetworkToolTlsCertificateCreateDocument
> = {
    operation: 'NetworkToolTlsCertificateCreate',
    operationType: 'mutation',
    document: NetworkToolTlsCertificateCreateDocument,
    parameters: [
        {
            parameter: 'input',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.NetworkToolTlsCertificateCreateInput,
        },
    ],
};

export const NetworkToolTracerouteCreateOperation: GraphQLOperationMetadata<
    typeof NetworkToolTracerouteCreateDocument
> = {
    operation: 'NetworkToolTracerouteCreate',
    operationType: 'mutation',
    document: NetworkToolTracerouteCreateDocument,
    parameters: [
        {
            parameter: 'input',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.NetworkToolTracerouteCreateInput,
        },
    ],
};

export const NetworkToolWhoisCreateOperation: GraphQLOperationMetadata<typeof NetworkToolWhoisCreateDocument> = {
    operation: 'NetworkToolWhoisCreate',
    operationType: 'mutation',
    document: NetworkToolWhoisCreateDocument,
    parameters: [
        {
            parameter: 'input',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.NetworkToolWhoisCreateInput,
        },
    ],
};

export const NetworkToolHistoryOperation: GraphQLOperationMetadata<typeof NetworkToolHistoryDocument> = {
    operation: 'NetworkToolHistory',
    operationType: 'query',
    document: NetworkToolHistoryDocument,
    parameters: [
        {
            parameter: 'input',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.NetworkToolHistoryInput,
        },
        {
            parameter: 'pagination',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.PaginationInput,
        },
    ],
};

export const FlowExecutionOperation: GraphQLOperationMetadata<typeof FlowExecutionDocument> = {
    operation: 'FlowExecution',
    operationType: 'query',
    document: FlowExecutionDocument,
    parameters: [
        {
            parameter: 'input',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.FlowExecutionInput,
        },
    ],
};

export const FlowExecutionHistoryOperation: GraphQLOperationMetadata<typeof FlowExecutionHistoryDocument> = {
    operation: 'FlowExecutionHistory',
    operationType: 'query',
    document: FlowExecutionHistoryDocument,
    parameters: [
        {
            parameter: 'input',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.FlowExecutionHistoryInput,
        },
        {
            parameter: 'pagination',
            required: true,
            kind: 'object',
            type: GraphQLInputTypes.PaginationInput,
        },
    ],
};
