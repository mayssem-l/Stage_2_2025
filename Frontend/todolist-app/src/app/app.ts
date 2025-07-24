import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopToolbar } from './components/top-toolbar/top-toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TaskList } from './components/task-list/task-list';
import { UserList } from './components/user-list/user-list';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { DataService } from '../services/data-service';
import { UserRole } from '../enums/UserRoles';
import {Dashboard} from './pages/dashboard/dashboard';
import {Overview} from './pages/overview/overview';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TopToolbar,
    MatIconModule,
    TaskList,
    UserList,
    Login,
    Register,
    Dashboard,
    Overview

  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  protected title = 'todolist-app';
  protected isAdmin = false;

  constructor(
    private dataService: DataService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.dataService.validateToken()
      .subscribe({
        next: res => {
          if (res.roles.includes(UserRole.ADMIN)) {
            this.redirectToPage("/dashboard");
          } else if (res.roles.includes(UserRole.USER)) {
            this.redirectToPage("/overview");
          }
        },
        error: () => this.redirectToPage("/login")
      });
  }



  redirectToPage(path: string) {
    return this.router.navigate([path]);
  }

}
