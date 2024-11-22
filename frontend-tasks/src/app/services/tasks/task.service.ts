import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Task } from 'src/app/models/Task';
import { TaskApiResponse } from 'src/app/models/TaskApiResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList = new BehaviorSubject<Task[]>([])

  _taskList = this.taskList.asObservable()

  private baseURL: string = environment.apiURL + '/tasks';
  private authURL: string = environment.authURL;


  constructor(protected httpClient: HttpClient) { }

  getAllTasks(){

    this.httpClient
      .get<Task[]>(this.baseURL, {withCredentials: true})
      .pipe(share())
      .subscribe(
        value=>{
          this.taskList.next(value)
        },
        error=>{
          console.log("Error al obtener las tareas")
          this.taskList.next([])
        }
      )
  }


  updateTask(id: number, updateData: Partial<Task>){
    this.httpClient
      .put<TaskApiResponse>(`${this.baseURL}/${id}`, updateData, { withCredentials: true })
      .pipe(share())
      .subscribe(
        taskApiResponse => {
          const updatedTask = taskApiResponse.task
          const oldTaskList: Task[] = this.taskList.getValue()
          const updatedTaskList = oldTaskList.map(oldTask => oldTask.id === updatedTask.id ? updatedTask : oldTask)
          this.taskList.next(updatedTaskList)
        })
  }

  deleteTask(taskId: number) {
    return this.httpClient
      .delete<TaskApiResponse>(`${this.baseURL}/${taskId}`, { withCredentials: true })
      .subscribe(
        taskApiResponse => {
        const oldTaskList: Task[] = this.taskList.getValue()
        const updatedTaskList = oldTaskList.filter(oldTask => oldTask.id !== taskId)
        this.taskList.next(updatedTaskList)
      })
  }

  addTask(task: Omit<Task, 'id' | 'User_Id'>) {
    return this.httpClient
      .post<TaskApiResponse>(this.baseURL, task, { withCredentials: true })
      .subscribe(
        taskApiResponse => {
          console.log(taskApiResponse)
          const oldTaskList = this.taskList.getValue()
          oldTaskList.push(taskApiResponse.task)
          this.taskList.next(oldTaskList)
        }
      )
  }

  logout() {
    this.httpClient.post(`${this.authURL}/logout`, {}, { withCredentials: true }).subscribe(
      () => {

        window.location.href = '/login';
      },
      error => {
        console.log('Error al cerrar sesión', error);
      }
    );
  }
}
