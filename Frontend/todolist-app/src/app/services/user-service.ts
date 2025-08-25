import { Injectable } from '@angular/core';
import { DialogFormConfig, Field } from '../types/DialogFormConfig';
import { User } from '../models/User';
import { first, tap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { DialogService } from './dialog-service';
import { DataService } from './data-service';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private dataService: DataService,
    private dialogService: DialogService,
    private toaster: ToastrService
  ) { };

  addUserDialogConfig: DialogFormConfig = {
    title: "Add a User",
    fields: [
      { displayName: "First Name", internalName: "firstname", value: "" },
      { displayName: "Last Name", internalName: "lastname", value: "" },
      { displayName: "Username", internalName: "username", value: "" },
      { displayName: "E-mail", internalName: "email", value: "" },
      { displayName: "Password", internalName: "password", value: "" },
      { displayName: "Role", internalName: "role", value: "" },
    ].map((entry, i) => ({ ...entry, id: i })),
    actions: [
      { displayName: "Cancel", internalName: "cancel", onClick: () => { this.dialogService.closeDialog() } },
      { displayName: "Confirm", internalName: "confirm", onClick: () => { this.saveUser(this.addUserDialogConfig.fields) } }
    ].map((entry, i) => ({ ...entry, id: i }))
  }

  addUser(onSuccess?: () => unknown) {
    if (onSuccess) {
      this.addUserDialogConfig.actions[1].onClick = () => {
        this.saveUser(this.addUserDialogConfig.fields, onSuccess)
      }
    }
    this.dialogService.openDialogForm(this.addUserDialogConfig);
  }

  saveUser(fields: Field[], onSuccess?: () => unknown) {
    let user: User = {};
    for (const field of fields) {
      const key = field.internalName as keyof User;
      user = {
        ...user,
        [key]: field.value
      };
    }
    
    let method = this.dataService.saveUser(user);

    if (user.userId) {
      method = this.dataService.updateUser(user);
    }

    return method
      .pipe(
        tap(() => {
          this.dialogService.closeDialog("success");
          if (onSuccess) {
            onSuccess();
          }
          this.toaster.success("Operation executed successfully.");
        }),
        first()
      )
      .subscribe()
  }

  editUser(userDetails: string[], onSuccess?: () => unknown) {
    const dialogConfig = { ...this.addUserDialogConfig };

    dialogConfig.title = "Edit User";
    dialogConfig.fields = [
      { displayName: "User ID", internalName: "userId", value: "", readonly: true },
      ...dialogConfig.fields.filter(field => (field.internalName != "password"))
    ].map((field, i) => ({ ...field, id: i }))
    dialogConfig.actions[1].onClick = () => { this.saveUser(dialogConfig.fields, onSuccess) }

    userDetails.forEach((val, i) => {
      dialogConfig.fields[i].value = val;
    })
    this.dialogService.openDialogForm(dialogConfig);
  }

  deleteUser(userDetails: string[], onSuccess?: () => unknown) {
    this.dialogService.openDialog({
      title: "Delete User",
      message: "Are you sure you want to permanently delete this user?",
      actions: [
        {
          displayName: "Cancel",
          internalName: "cancel",
          onClick: () => {
            this.dialogService.closeDialog()
          }
        },
        {
          displayName: "Confirm",
          internalName: "confirm",
          onClick: () => {
            this.dataService.deleteUser(parseInt(userDetails[0]))
              .pipe(
                tap(() => {
                  this.dialogService.closeDialog("success");
                  if (onSuccess) {
                    onSuccess();
                  }
                  this.toaster.success("Operation executed successfully.");
                }),
                first()
              )
              .subscribe()
          }
        },
      ].map((action, i) => ({ ...action, id: i }))
    })
  }

}
