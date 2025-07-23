import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/Task';
import { DataService } from '../../services/data-service';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss'
})
export class TaskForm {
  @Input() task: Task = this.getEmptyTask();
  @Input() isEditMode: boolean = false;
  @Output() onSave = new EventEmitter<void>();

  constructor(private dataService: DataService) {}

  getEmptyTask(): Task {
    return {
      taskId: 0,
      title: '',
      description: '',
      status: 'TODO',
      category: 'WORK',
      dueDate: ''
    };
  }

  onSubmit() {
    this.dataService.saveTask(this.task).subscribe({
      next: () => {
        this.onSave.emit(); // notify parent to refresh
        this.task = this.getEmptyTask();
        this.isEditMode = false;
      },
      error: err => console.error('Error saving task', err)
    });
  }

}
