import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

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
  onLogin(){};

}
