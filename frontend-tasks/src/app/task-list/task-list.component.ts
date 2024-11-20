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


  toggleComplete(task: any) : void {
    task.status = 1; // Actualiza el estado en el frontend para evitar problemas de renderizado
    this.taskService.updateTask(task.id, { 
      title: task.title, 
      description: task.description, 
      status: 1
    }).subscribe({
      next: (res) => {
        console.log('Tarea actualizada correctamente:', res);
      },
      error: (err) => {
        console.error('Error al actualizar la tarea:', err);
        task.status = 0; // Revertir el estado en caso de error
      }
    });
    
  }
  

  logout() {
    this.taskService.logout(); // Llama al método de logout del servicio
  }
}

