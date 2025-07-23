import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  user = {
    username: '',
    password: '',
    loginError: false
  };
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.user.username, this.user.password).subscribe({
      next: response => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/app']); // adjust route as needed
      },
      error: () => {
        this.user.loginError = true;
      }
    });
  }

}
