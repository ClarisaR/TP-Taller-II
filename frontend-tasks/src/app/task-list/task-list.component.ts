import { Component, OnInit } from '@angular/core';
import { Task } from '../models/Task';
import { TaskService } from '../services/tasks/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  taskList: Task[] = [];

  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks();
    this.taskService._taskList.subscribe(tasks => {
      this.taskList = tasks;
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.taskList = this.taskList.filter(task => task.id !== taskId);
      },
      error => {
        console.error('Error al eliminar la tarea', error);
      }
    );
  }

  logout() {
    this.taskService.logout(); // Llama al método de logout del servicio
  }
}

