import { WebSocketEvent } from './WebSocketMessage';
import { TaskResultInterface } from './TaskResultInterface';

export interface TaskAssigned extends WebSocketEvent, NodeTaskInfo {
    type: 'taskAssigned';
}

export interface TaskCheckedOut extends WebSocketEvent, NodeTaskInfo {
    type: 'taskCheckedOut';
}

export interface TaskRunning extends WebSocketEvent, NodeTaskInfo {
    type: 'taskRunning';
}

export interface TaskCheckedIn extends WebSocketEvent, NodeTaskInfo {
    type: 'taskCheckedIn';
    result: TaskResultInterface;
}

export interface NodeTaskInfo {
    taskId: string;
    nodeId: string;
    region: string;
}
