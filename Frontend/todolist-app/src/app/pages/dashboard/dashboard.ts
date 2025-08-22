import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { Table } from "../../components/table/table";
import { DialogForm } from '../../components/dialog-form/dialog-form';
import { DataService } from '../../services/data-service';
import { DashboardContent } from '../../enums/DashboardContent';
import { Util } from '../../util/util';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogFormConfig, Field } from '../../types/DialogFormConfig';
import { User } from '../../models/User';
import { concatMap, first, Observable, of, tap } from 'rxjs';
import { Task } from '../../models/Task';
import { TableConfig } from '../../types/TableConfig';
import { DialogConfig } from '../../types/DialogConfig';
import { Dialog } from '../../components/dialog/dialog';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatIconModule,
    MatDialogModule,
    Table
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})


export class Dashboard implements OnInit {

  readonly dialog = inject(MatDialog);

  constructor(
    private dataService: DataService,
    private userService: UserService
  ) { }

  sidebarButtons = [
    { title: "Users", icon: "person", onclick: () => { this.onSidenavBtnClick(DashboardContent.USER_LIST) } },
    { title: "Tasks", icon: "list_alt", onclick: () => { this.onSidenavBtnClick(DashboardContent.TASK_LIST) } }
  ]

  content: DashboardContent = DashboardContent.USER_LIST;

  table: TableConfig = {
    data: [],
    entryActions: []
  };

  tableName = Util.capitalize(this.content.slice(0, this.content.indexOf("_"))) + "s";

  tableHeaders = {
    [DashboardContent.USER_LIST]: ["User ID", "First Name", "Last Name", "Username", "E-mail", "Role"],
    [DashboardContent.TASK_LIST]: ["Task ID", "Title", "Description", "Status", "Category", "Due Date", "Username"]
  }

  addTaskDialogConfig: DialogFormConfig = {
    title: "Add a Task",
    fields: [
      { displayName: "Title", internalName: "title", value: "" },
      { displayName: "Description", internalName: "description", value: "" },
      { displayName: "Category", internalName: "category", value: "" },
      { displayName: "Status", internalName: "status", value: "" },
      { displayName: "Due Date", internalName: "dueDate", value: "" },
    ].map((entry, i) => ({ ...entry, id: i })),
    actions: [
      { displayName: "Cancel", internalName: "cancel", onClick: () => { this.closeDialog() } },
      { displayName: "Confirm", internalName: "confirm", onClick: () => { this.addTask() } }
    ].map((entry, i) => ({ ...entry, id: i }))
  };

  ngOnInit(): void {
    this.updateTable();
  }

  onSidenavBtnClick(content: DashboardContent) {
    this.content = content;
    this.tableName = Util.capitalize(this.content.slice(0, this.content.indexOf("_"))) + "s";
    this.updateTable();
  }

  onAddBtnClick() {
    switch (this.content) {
      case DashboardContent.USER_LIST:
        this.userService.addUser(() => { this.updateTable() });
        break;
      case DashboardContent.TASK_LIST:
        break;
      default:
        break;
    }
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  fetchData(content: DashboardContent): Observable<any> {
    switch (content) {
      case DashboardContent.USER_LIST:
        return this.dataService.getAllUsers()
      case DashboardContent.TASK_LIST:
        return this.dataService.getAllTasks()
      default:
        return of(null);
    }
  }

  transformData(data: User[] | Task[], headers: string[] = []) {
    const entries = data;
    const _table: string[][] = [];
    _table[0] = headers ? headers : Object.keys(entries[0]) as string[];
    for (const entry of entries) {
      _table.push(Object.values(entry))
    }
    this.table.entryActions = [
      {
        displayName: "",
        internalName: "edit",
        icon: "edit",
        onClick: (entry: unknown) => {
          this.userService.editUser(entry as string[], () => { this.updateTable() });
        }
      },
      {
        displayName: "",
        internalName: "delete",
        icon: "delete",
        onClick: (entry: unknown) => {
          this.userService.deleteUser(entry as string[], () => { this.updateTable() });
        }
      },
    ].map((action, i) => ({ ...action, id: i }))
    this.table.data = _table;
  }

  updateTable() {
    return this.fetchData(this.content)
      .pipe(
        tap((res: User[] | Task[]) => {
          this.transformData(res, this.tableHeaders[this.content]);
        }),
        first()
      )
      .subscribe();
  }

  addTask() {
    let task: Task = {
      title: "",
      description: "",
      category: "",
      status: "",
      dueDate: "",
      userId: parseInt(localStorage.getItem("userId")!)
    };

    for (const field of this.addTaskDialogConfig.fields) {
      const key = field.internalName as keyof User;
      task = {
        ...task,
        [key]: field.value
      };
    }
    this.dataService.saveTask(task)
      .pipe(
        concatMap(() => {
          this.fetchData(this.content);
          return of(null);
        })
      )
      .subscribe({
        next: () => {
          this.closeDialog();
        }
      })
  }


  onLogout() {
    console.log('Logout clicked');
  }
}