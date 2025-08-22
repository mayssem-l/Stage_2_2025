import { Component, Inject, Input, OnInit } from '@angular/core';
import { DialogFormConfig, Field } from '../../types/DialogFormConfig';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-dialog-form',
  imports: [MatIconModule],
  templateUrl: './dialog-form.html',
  styleUrl: './dialog-form.scss'
})
export class DialogForm implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogFormConfig,
    private dialogRef: MatDialogRef<DialogForm>
  ) { }

  ngOnInit() {

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
