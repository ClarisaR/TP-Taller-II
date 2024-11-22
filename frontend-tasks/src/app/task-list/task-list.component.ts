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
  isEditModalOpen = false;
  selectedTask: Task;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openEditModal(task: Task): void {
    this.selectedTask = { ...task };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
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
    console.log('TASKID')
    console.log(taskId)
    this.taskService.deleteTask(taskId)
  }

  toggleComplete(task: Task){
    this.taskService.updateTask(task.id, {
      title: task.title,
      description: task.description,
      status: !task.status
    })
  }

  logout() {
    this.taskService.logout();
  }
}

