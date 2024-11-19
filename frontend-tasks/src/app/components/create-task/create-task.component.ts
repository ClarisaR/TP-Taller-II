import { Component, EventEmitter, Output } from '@angular/core';
import { TaskService } from '../../services/tasks/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  @Output() close = new EventEmitter<void>();

  task: Omit<Task, 'id' | 'User_Id'> = {
    title: '',
    description: '',
    status: false,
    date: new Date().toISOString()
  };

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.addTask(this.task).subscribe(() => {
      this.close.emit();
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}