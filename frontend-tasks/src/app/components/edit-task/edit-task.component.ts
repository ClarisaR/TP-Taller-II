import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/tasks/task.service';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  @Input() task: Task;
  @Output() close = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.updateTask(this.task.id, this.task).subscribe(() => {
      this.close.emit();
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}