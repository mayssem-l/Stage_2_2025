import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '../components/dialog/dialog';
import { DialogForm } from '../components/dialog-form/dialog-form';
import { DialogFormConfig } from '../types/DialogFormConfig';
import { DialogConfig } from '../types/DialogConfig';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(){}
  
  readonly dialog = inject(MatDialog);

  dialogRef: MatDialogRef<Dialog | DialogForm> | null = null;

  openDialog(data: DialogConfig) {
    this.dialogRef = this.dialog.open(Dialog, {
      data: data
    })
  }

  openDialogForm(data: DialogFormConfig) {
    this.dialogRef = this.dialog.open(DialogForm, {
      width: "800px",
      data: data
    });
  }

  closeDialog(result?: string){
    return this.dialogRef?.close(result)
  }

  closeAllDialogs() {
    this.dialog.closeAll();
  }

}
