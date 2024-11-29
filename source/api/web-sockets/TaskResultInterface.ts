import { TaskResultType, Region } from '@project/source/api/GraphQlGeneratedCode';

export interface TaskResultInterface {
    /**
     * The type of this result. eg. Success, Failure, etc.
     */
    type: TaskResultType;
    /**
     * The id of the task that this result is for.
     */
    taskId: string;
    /**
     * The id of the Atlas node that this task will run on next.
     */
    gridNodeId: string | null;
    /**
     * The id of the cluster that this task was ran in.
     */
    clusterId: string | null;
    /**
     * The id of the region that this task was ran in.
     */
    regionId: string | null;
    /**
     * The region that this task was ran in.
     */
    region: Region | null;
    /**
     * The attempt number of this result.
     */
    attempt: number;
    /**
     * The time that this result was computed. In milliseconds.
     */
    duration: number;
    /**
     * The time that this result was completed.
     */
    ranAt: Date | null;
    /**
     * The actual result of running the task.
     * Use the procedureType of the task to determine the shape of this.
     */
    result: any;
    /**
     * Any additional meta data for the result.
     */
    meta: any;
    /**
     * The error (if any) that occurred while running the task.
     */
    error: any;
}
