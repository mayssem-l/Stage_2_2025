import { Component, inject, Inject } from '@angular/core';
import { DialogFormConfig, Field } from '../../types/DialogFormConfig';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dialog-form',
  imports: [MatIconModule, MatSelectModule],
  templateUrl: './dialog-form.html',
  styleUrl: './dialog-form.scss'
})
export class DialogForm {

  private dialogRef = inject(MatDialogRef<DialogForm>)

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogFormConfig) {

  }

  closeDialog() {
    this.dialogRef.close()
  }

  onFieldValueChange(e: Event, field: Field) {
    const inputElement = e.target as HTMLInputElement;
    if (!field.readonly) {
      field.value = inputElement.value;
    } else {
      inputElement.value = field.value;
    }
  }
}
