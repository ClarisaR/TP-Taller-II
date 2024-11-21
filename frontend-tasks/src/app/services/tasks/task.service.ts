import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { Task } from 'src/app/models/Task';
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


  updateTask(id: number, updateData: Partial<Task>): Observable<Task> {
    return this.httpClient.put<Task>(`${this.baseURL}/${id}`, updateData, { withCredentials: true });
  }

  deleteTask(taskId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseURL}/${taskId}`, { withCredentials: true });
  }

  addTask(task: Omit<Task, 'id' | 'User_Id'>): Observable<Task> {
    return this.httpClient.post<Task>(this.baseURL, task, { withCredentials: true });
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
