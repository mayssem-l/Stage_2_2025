import {Component, OnInit} from '@angular/core';
import {Task} from '../../../models/Task';
import {DataService} from '../../../services/data-service';
import {DatePipe} from '@angular/common';
import {TaskForm} from '../task-form/task-form';
import {Sidenav} from '../sidenav/sidenav';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  imports: [
    DatePipe,
    TaskForm,
    Sidenav
  ],
  styleUrls: ['./task-list.scss']
})
export class TaskList implements OnInit {
  tasks: Task[] = [];
  categories: string[] = [];
  selectedTask: Task | null = null;
  isEditMode: boolean = false;
  showModal: boolean = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadCategories();
    this.loadTasks();
  }

  loadCategories(){
    this.dataService.getCategories()
      .subscribe({
        next: (res) => this.categories = res,
        error: (err) => console.error("Error loading categories", err)
      })
  }

  loadTasks() {
    this.dataService.getAllTasks()
      .subscribe({
        next: (res) => this.tasks = res,
        error: (err) => console.error("Error loading tasks", err)
      });
  }

  editTask(task: Task) {
    this.selectedTask = {...task};
    this.isEditMode = true;
    this.showModal = true;
  }

  addNewTask() {
    this.selectedTask = null;
    this.isEditMode = false;
    this.showModal = true;
  }

  onTaskSaved() {
    this.loadTasks();
    this.selectedTask = null;
    this.isEditMode = false;
    this.closeModal();
  }

  deleteTask(taskId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      this.dataService.deleteTask(taskId).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(task => task.taskId !== taskId);
        },
        error: (err) => {
          console.error("Erreur lors de la suppression de la tâche", err);
        }
      });
    }
  }

  closeModal() {
    this.selectedTask = null;
    this.isEditMode = false;
    this.showModal = false;
  }
}
