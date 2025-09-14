import { inject, Injectable } from '@angular/core';
import { DialogFormConfig, Field } from '../types/DialogFormConfig';
import { DialogService } from './dialog-service';
import { Task } from '../models/Task';
import { DataService } from './data-service';
import { first, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private toaster = inject(ToastrService);
  private dataService = inject(DataService);
  private dialogService = inject(DialogService);


  addTaskDialogConfig: DialogFormConfig = {
    title: "Add a Task",
    fields: [
      { displayName: "Title", internalName: "title", value: "" },
      { displayName: "Description", internalName: "description", value: "" },
      { displayName: "Status", internalName: "status", value: "", type: "select", options: [] },
      { displayName: "Category", internalName: "category", value: "", type: "select", options: [] },
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
    this.getCategories()
      .subscribe(categories => {
        const categoryField = this.addTaskDialogConfig.fields.find(field => field.internalName === "category");
        categories.forEach(category=>{          
          categoryField!.options!.push({displayName: category, value: category})
        })        
        this.dialogService.openDialogForm(this.addTaskDialogConfig);
      })
    this.getStatus()
    .subscribe(status => {
      const statusField = this.addTaskDialogConfig.fields.find(field => field.internalName === "status");
      status.forEach(status => {
        statusField!.options!.push({displayName: status, value: status})
      })
      this.dialogService.openDialogForm(this.addTaskDialogConfig);
    })
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

    const method = this.dataService.saveTask(task);

    method
      .pipe(
        tap(() => {
          this.dialogService.closeDialog();
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
                  this.dialogService.closeDialog();
                
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

  getCategories() {
    return this.dataService.getCategories();
  }
  getStatus() {
    return this.dataService.getStatus();
  }

}
