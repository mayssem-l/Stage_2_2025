import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data-service';
import { forkJoin, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  userForm = {
    username: '',
    password: '',
  };

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  onLogin() {
    return this.dataService
      .login(
        this.userForm.username,
        this.userForm.password
      )
      .subscribe((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.userId)
        this.authService.validateToken();
      })
  }
}
