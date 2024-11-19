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
  private authURL: string = environment.authURL; // Usar la authURL del environment.ts


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

  deleteTask(taskId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseURL}/${taskId}`, { withCredentials: true });
  }

  logout() {
    this.httpClient.post(`${this.authURL}/logout`, {}, { withCredentials: true }).subscribe(
      () => {
        // Aquí puedes realizar cualquier acción después de cerrar sesión, por ejemplo, redirigir a la página de login
        window.location.href = '/login';  // Redirigir al login
      },
      error => {
        console.log('Error al cerrar sesión', error);
      }
    );
  }
}
