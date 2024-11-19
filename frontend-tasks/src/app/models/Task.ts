import { TaskStatus } from "./TaskStatus";


export interface Task{
    id: number,
    User_Id: number,
    title: string,
    description: string,
    date: string,
    status: TaskStatus
}
