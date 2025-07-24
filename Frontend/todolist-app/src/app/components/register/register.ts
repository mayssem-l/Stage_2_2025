import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../../../models/User';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit{
  registerForm!: FormGroup;
  registerError: boolean = false;
  passwordMismatch: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }
  onSubmit() {
    this.registerError = false;
    this.passwordMismatch = false;

    if (this.registerForm.invalid) {
      this.registerError = true;
      return;
    }

    const password = this.registerForm.get('password')!.value;
    const confirmPassword = this.registerForm.get('confirmPassword')!.value;

    if (password !== confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    const user: User = {
      firstname: this.registerForm.get('firstname')!.value,
      lastname: this.registerForm.get('lastname')!.value,
      username: this.registerForm.get('username')!.value,
      email: this.registerForm.get('email')!.value,
      password: password
    };
    console.log('User à enregistrer:', user);
  }

}
