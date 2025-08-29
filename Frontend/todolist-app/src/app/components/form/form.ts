import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data-service';
import { forkJoin, of, switchMap } from 'rxjs';
import { Field } from '../../types/DialogFormConfig';
import { InputField } from '../../types/InputField';

@Component({
  selector: 'app-form',
  imports: [
    FormsModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class LoginForm {
  @Input() form: InputField[] = [];

  dataService = inject(DataService);
  authService = inject(AuthService);

  onLogin() {
    return this.dataService
      .login(
        this.form[0].value,
        this.form[1].value,
      )
      .subscribe((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.userId)
        this.authService.validateToken();
      })
  }
}
