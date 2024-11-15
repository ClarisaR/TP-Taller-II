import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { TaskService } from '../services/tasks/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

    taskList: Task[]
    constructor(protected taskService: TaskService) { }

    ngOnInit(): void {
      this.taskService._taskList.subscribe((value)=>{
        console.log(value)
        this.taskList = value
      })
      this.taskService.getAllTasks()
    }

}
