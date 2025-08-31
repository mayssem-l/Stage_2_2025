import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data-service';
import { forkJoin, of, switchMap } from 'rxjs';
import { Field } from '../../types/DialogFormConfig';
import { InputField } from '../../types/InputField';
import { FormConfig } from '../../types/Form';

@Component({
  selector: 'app-form',
  imports: [
    FormsModule
  ],
  templateUrl: './form.html',
  styleUrl: './form.scss'
})
export class Form {
  @Input() form: FormConfig = {} as FormConfig;

  onEnterPress(e: KeyboardEvent) {
    if (e.key == "Enter") {
      this.form.onSubmit();
    }
  }
}
