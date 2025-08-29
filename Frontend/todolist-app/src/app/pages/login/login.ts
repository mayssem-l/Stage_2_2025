import { Component } from '@angular/core';
import { LoginForm } from "../../components/form/form";
import { AnimBg } from "../../components/anim-bg/anim-bg";
import { Field } from '../../types/DialogFormConfig';
import { InputField } from '../../types/InputField';

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
  loginForm: InputField[] = [
    { internalName: "username", displayName: 'Username', type: 'text', value: '', isRequired: true, class: 'form-control' },
    { internalName: 'password', displayName: 'Password', type: 'password', value: '', isRequired: true, class: 'form-control' },
  ].map((field, i)=>({ ...field, id: i }));

  
}
