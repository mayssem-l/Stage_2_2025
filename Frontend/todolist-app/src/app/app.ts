import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TopToolbar} from './top-toolbar/top-toolbar';
import {MatIconModule} from '@angular/material/icon';
import {TaskList} from './task-list/task-list';
import {UserList} from './user-list/user-list';
import {Login} from './login/login';
import {Register} from './register/register';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TopToolbar,
    MatIconModule,
    TaskList,
    UserList,
    Login,
    Register

  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'todolist-app';
  protected isAdmin = true;
}
