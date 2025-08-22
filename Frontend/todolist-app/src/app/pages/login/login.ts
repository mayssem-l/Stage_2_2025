import { Component } from '@angular/core';
import { LoginForm } from "../../components/login-form/login-form";
import { AnimBg } from "../../components/anim-bg/anim-bg";

@Component({
  selector: 'app-login',
  imports: [
    LoginForm,
    AnimBg
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

}
