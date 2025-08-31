import { Component, inject } from '@angular/core';
import { Form } from "../../components/form/form";
import { AnimBg } from "../../components/anim-bg/anim-bg";
import { FormConfig } from '../../types/Form';
import { DataService } from '../../services/data-service';
import { AuthService } from '../../services/auth-service';
import { User } from '../../models/User';
import { animate, group, query, sequence, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    Form,
    AnimBg
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  dataService = inject(DataService);
  authService = inject(AuthService);
  toastr = inject(ToastrService);

  isNewUser = false;

  loginForm: FormConfig = {
    fields: [
      {
        displayName: "Username",
        internalName: "username",
        type: "text",
        value: "",
        isRequired: true,
        class: "form-control"
      },
      {
        displayName: "Password",
        internalName: "password",
        type: "password",
        value: "",
        isRequired: true,
        class: "form-control"
      }
    ].map((field, i) => ({ ...field, id: i })),
    actions: [
      {
        displayName: "Sign In",
        internalName: "singin",
        onClick: () => { this.logIn(); },
        class: "primary-button"
      },
      {
        displayName: "Register",
        internalName: "register",
        message: "Are you a new user? Register here.",
        onClick: () => { this.onRegisterNewUserClick(); },
        class: "secondary-button"
      }
    ].map((field, i) => ({ ...field, id: i })),
    onSubmit: () => { this.logIn(); }
  }

  registerForm: FormConfig = {
    fields: [
      {
        displayName: "First Name",
        internalName: "firstname",
        type: "text",
        value: "",
        isRequired: true,
        class: "form-control"
      },
      {
        displayName: "Last Name",
        internalName: "lastname",
        type: "text",
        value: "",
        isRequired: true,
        class: "form-control"
      },
      {
        displayName: "E-mail",
        internalName: "email",
        type: "email",
        value: "",
        isRequired: true,
        class: "form-control"
      },
      {
        displayName: "Username",
        internalName: "username",
        type: "text",
        value: "",
        isRequired: true,
        class: "form-control"
      },
      {
        displayName: "Password",
        internalName: "password",
        type: "password",
        value: "",
        isRequired: true,
        class: "form-control"
      }
    ].map((field, i) => ({ ...field, id: i })),
    actions: [
      {
        displayName: "Register",
        internalName: "register",
        onClick: () => { this.registerUser(); },
        class: "primary-button"
      },
      {
        displayName: "Sign In",
        internalName: "signin",
        message: "Already a user? Sign in here.",
        onClick: () => { this.isNewUser = false; },
        class: "secondary-button"
      }
    ].map((field, i) => ({ ...field, id: i })),
    onSubmit: () => { this.registerUser(); }
  }

  logIn() {
    return this.dataService.login(
      this.loginForm.fields[0].value,
      this.loginForm.fields[1].value,
    )
      .subscribe((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.userId)
        this.authService.validateToken();
      })
  }

  onRegisterNewUserClick() {
    this.isNewUser = true;
  }

  registerUser() {
    let user: User = {};
    for (const field of this.registerForm.fields) {
      const key = field.internalName as keyof User;
      user = {
        ...user,
        [key]: field.value
      };
    }
    return this.dataService.register(user)
      .subscribe(res => {
        this.toastr.info("Registration was successful. You can now log in using your credentials.");
        this.isNewUser = false;
      })
  }

}
