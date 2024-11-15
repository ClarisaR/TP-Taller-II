import { TaskStatus } from "./TaskStatus";


export interface Task{
    id: number,
    userId: number,
    name: string,
    description: string,
    date: string,
    status: TaskStatus
}