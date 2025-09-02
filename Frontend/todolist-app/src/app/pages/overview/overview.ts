import { Component, inject, OnInit } from '@angular/core';
import { TopToolbar } from '../../components/top-toolbar/top-toolbar';
import { DataService } from '../../services/data-service';
import { Task } from '../../models/Task';
import { Table } from "../../components/table/table";
import { first, tap } from 'rxjs';
import { TableConfig } from '../../types/TableConfig';
import { TaskService } from '../../services/task-service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-overview',
  imports: [
    TopToolbar,
    Table
  ],
  templateUrl: './overview.html',
  styleUrl: './overview.scss'
})
export class Overview implements OnInit {

  readonly dialog = inject(MatDialog);

  dataService = inject(DataService);
  taskService = inject(TaskService);

  taskTable: TableConfig = {
    data: [],
    headers: ["Task ID", "Title", "Description", "Status", "Category", "Due Date"],
    entryActions: []
  };


  ngOnInit(): void {
    this.updateTable();
  }

  addTask() {
    this.taskService.addTask(() => { this.updateTable() });
  }

  transformData(data: Task[], headers: string[] = []) {
    const entries = data;
    const _table: string[][] = [];
    _table[0] = headers ? headers : Object.keys(entries[0]) as string[];
    for (const entry of entries) {
      delete entry.userId;
      delete entry.username;
      _table.push(Object.values(entry))
    }
    this.taskTable.entryActions = [
      {
        displayName: "",
        internalName: "edit",
        icon: "edit",
        onClick: (entry: unknown) => {
          this.onEditClick(entry as string[], () => { this.updateTable() });
        }
      },
      {
        displayName: "",
        internalName: "delete",
        icon: "delete",
        onClick: (entry: unknown) => {
          this.onDeleteClick(entry as string[], () => { this.updateTable() });
        }
      },
    ].map((action, i) => ({ ...action, id: i }))
    this.taskTable.data = _table;
  }

  onEditClick(entry: string[], onSuccess: () => unknown) {
    this.taskService.editTask(entry, onSuccess, true);
  }

  onDeleteClick(entry: string[], onSuccess: () => unknown) {
    this.taskService.deleteTask(entry, onSuccess);
  }

  updateTable() {
    return this.dataService.getAllTasks()
      .pipe(
        tap((res: Task[]) => {
          this.transformData(res, this.taskTable.headers);
        }),
        first()
      )
      .subscribe();
  }
}
