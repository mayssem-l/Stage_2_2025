import { Component, Input, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { DataService } from '../../../services/data-service';
import {User} from '../../../models/User';
@Component({
  selector: 'app-user-form',
  imports: [
    FormsModule
  ],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm {
  @Input() user: User = this.getEmptyUser();
  @Input() isEditMode: boolean = false;
  @Output() onSave = new EventEmitter<void>();

  constructor(private dataService: DataService) {}

  getEmptyUser(): User {
    return {
      userId: 0,
      name: '',
      username: '',
      lastname: '',
      firstname: '',
      email: '',
      role: '',
      password: ''
    };
  }
  onSubmit(){
    this.dataService.saveUser(this.user).subscribe({
      next: () => {
        this.onSave.emit(); // notifie le parent
        this.user = this.getEmptyUser(); // réinitialiser si besoin
        this.isEditMode = false;
      },
      error: err => console.error('Erreur lors de la sauvegarde de l’utilisateur', err)
    });
  }


}
