import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data-service';
import { forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  userForm = {
    username: '',
    password: '',
  };

  constructor(
    private dataService: DataService,
  ) { }

  onLogin() {
    return this.dataService.login(
      this.userForm.username,
      this.userForm.password
    )
      .pipe(
        switchMap(response => {
          localStorage.setItem("token", response.token);
          return forkJoin({
            token: of(response),
            tasks: this.dataService.getAllTasks()
          })
        })
      )
      .subscribe((res) => {
        console.log(res);
      })
  }
}
