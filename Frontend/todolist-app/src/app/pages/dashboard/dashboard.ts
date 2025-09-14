import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { Table } from "../../components/table/table";
import { DataService } from '../../services/data-service';
import { DashboardContent } from '../../enums/DashboardContent';
import { Util } from '../../util/util';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { User } from '../../models/User';
import { first, Observable, of, tap } from 'rxjs';
import { Task } from '../../models/Task';
import { TableConfig } from '../../types/TableConfig';
import { UserService } from '../../services/user-service';
import { TaskService } from '../../services/task-service';
import { CookieService } from 'ngx-cookie-service';

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

    private dataService = inject(DataService);
    private userService = inject(UserService);
    private taskService = inject(TaskService);
    private cookieService = inject(CookieService);
  

  sidebarButtons = [
    { title: "Users", icon: "person", onclick: () => { this.onSidenavBtnClick(DashboardContent.USER_LIST) } },
    { title: "Tasks", icon: "list_alt", onclick: () => { this.onSidenavBtnClick(DashboardContent.TASK_LIST) } },
    { title: "Logout", icon: "logout", onclick: () => { this.onLogout() } }
  ]

  content: DashboardContent = DashboardContent.USER_LIST;

  table: TableConfig = {
    headers: [],
    data: [],
    entryActions: []
  };

  tableName = Util.capitalize(this.content.slice(0, this.content.indexOf("_"))) + "s";

  tableHeaders = {
    [DashboardContent.USER_LIST]: ["User ID", "First Name", "Last Name", "Username", "E-mail", "Role"],
    [DashboardContent.TASK_LIST]: ["Task ID", "Title", "Description", "Status", "Category", "Due Date", "Username", "User ID"]
  }

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
        this.taskService.addTask(() => { this.updateTable() });
        break;
      default:
        break;
    }
  }

  onEditClick(entry: string[], onSuccess: () => unknown) {
    switch (this.content) {
      case DashboardContent.USER_LIST:
        this.userService.editUser(entry, onSuccess);
        break;
      case DashboardContent.TASK_LIST:
        this.taskService.editTask(entry, onSuccess);
        break;
      default:
        break;
    }
  }

  onDeleteClick(entry: string[], onSuccess: () => unknown) {
    switch (this.content) {
      case DashboardContent.USER_LIST:
        this.userService.deleteUser(entry, onSuccess);
        break;
      case DashboardContent.TASK_LIST:
        this.taskService.deleteTask(entry, onSuccess);
        break;
      default:
        break;
    }
  }

  fetchData(content: DashboardContent): Observable<User[] | Task[]> {
    switch (content) {
      case DashboardContent.USER_LIST:
        return this.dataService.getAllUsers() as Observable<User[]>;
      case DashboardContent.TASK_LIST:
        return this.dataService.getAllTasks() as Observable<Task[]>;
      default:
        return of([]);
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

  onLogout() {
    this.cookieService.deleteAll();  
    localStorage.clear();
    window.location.reload();
    console.log('Logout clicked');
  }
}