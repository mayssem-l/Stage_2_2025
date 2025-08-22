import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfig } from '../../types/DialogConfig';
import { MatIconModule } from "@angular/material/icon";


@Component({
  selector: 'app-dialog',
  imports: [MatIconModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss'
})
export class Dialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogConfig,
    private dialogRef: MatDialogRef<Dialog>
  ) { }

  closeDialog() {
    this.dialogRef.close()
  }

}
