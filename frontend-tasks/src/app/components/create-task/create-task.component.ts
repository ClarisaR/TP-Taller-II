import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  constructor() { }

  closeModal(): void {
    this.close.emit();
  }

  ngOnInit(): void {
  }

}
