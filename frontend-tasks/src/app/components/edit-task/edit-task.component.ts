import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from '../../services/tasks/task.service';
import { Task } from '../../models/Task';
import { TaskApiResponse } from 'src/app/models/TaskApiResponse';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  @Input() task: Task;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() updateEvent = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.updateTask(this.task.id, this.task)
    this.updateEvent.emit()
  }

  onClose(): void {
    this.closeEvent.emit();
  }

}
