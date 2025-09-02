import { Injectable } from '@angular/core';
import { DialogFormConfig, Field } from '../types/DialogFormConfig';
import { DialogService } from './dialog-service';
import { Task } from '../models/Task';
import { DataService } from './data-service';
import { concatMap, first, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  constructor(
    private toaster: ToastrService,
    private dataService: DataService,
    private dialogService: DialogService
  ) { }

  addTaskDialogConfig: DialogFormConfig = {
    title: "Add a Task",
    fields: [
      { displayName: "Title", internalName: "title", value: "" },
      { displayName: "Description", internalName: "description", value: "" },
      { displayName: "Status", internalName: "status", value: "" },
      { displayName: "Category", internalName: "category", value: "" },
      { displayName: "Due Date", internalName: "dueDate", value: "", type: "datetime-local" },
    ].map((entry, i) => ({ ...entry, id: i })),
    actions: [
      { displayName: "Cancel", internalName: "cancel", onClick: () => { this.dialogService.closeDialog() } },
      { displayName: "Confirm", internalName: "confirm", onClick: () => { this.saveTask(this.addTaskDialogConfig.fields) } }
    ].map((entry, i) => ({ ...entry, id: i }))
  };

  addTask(onSuccess?: () => unknown) {
    if (onSuccess) {
      this.addTaskDialogConfig.actions[1].onClick = () => {
        this.saveTask(this.addTaskDialogConfig.fields, onSuccess);
      }
    }
    this.dialogService.openDialogForm(this.addTaskDialogConfig);
  }

  saveTask(fields: Field[], onSuccess?: () => unknown) {
    let task: Task = {
      title: "",
      description: "",
      category: "",
      status: "",
      dueDate: "",
      userId: parseInt(localStorage.getItem("userId")!)
    };

    for (const field of fields) {
      const key = field.internalName as keyof Task;
      task = {
        ...task,
        [key]: field.value
      };
    }

    let method = this.dataService.saveTask(task);

    method
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

  editTask(taskDetails: string[], onSuccess?: () => unknown, isUser?: boolean) {
    const dialogConfig = { ...this.addTaskDialogConfig };

    dialogConfig.title = "Edit Task";
    dialogConfig.fields = [
      { displayName: "Task ID", internalName: "taskId", value: "", readonly: true },
      ...dialogConfig.fields
    ].map((field, i) => ({ ...field, id: i }))

    if (isUser) {
      dialogConfig.fields = dialogConfig.fields.filter(field => (!["userId", "username"].includes(field.internalName)))
    }


    dialogConfig.actions[1].onClick = () => { this.saveTask(dialogConfig.fields, onSuccess) }


    taskDetails.slice(0, isUser ? undefined : -2).forEach((val, i) => {
      dialogConfig.fields[i].value = val;
    })
    this.dialogService.openDialogForm(dialogConfig);
  }

  deleteTask(taskDetails: string[], onSuccess?: () => unknown) {
    this.dialogService.openDialog({
      title: "Delete Task",
      message: "Are you sure you want to permanently delete this task?",
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
            this.dataService.deleteTask(parseInt(taskDetails[0]))
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
