import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { share } from 'rxjs/operators';
import { Task } from 'src/app/models/Task';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList = new BehaviorSubject<Task[]>([])

  _taskList = this.taskList.asObservable()

  private baseURL: string = environment.apiURL + '/tasks'

  constructor(protected httpClient: HttpClient) { }

  getAllTasks(){
    console.log(this.baseURL)
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
}
