import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
