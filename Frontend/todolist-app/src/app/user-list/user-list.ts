import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {DataService} from '../../services/data-service';
import {UserForm} from '../user-form/user-form';


@Component({
  selector: 'app-user-list',
  imports: [
    UserForm
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList implements OnInit {

  users: User[] = [];
  selectedUser: User | null =null;
  isEditMode: boolean = false;
  showModal: boolean = false;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.dataService.getAllUsers()
      .subscribe({
        next: (res) => this.users = res,
        error: (err) => console.error("Error loading users", err)
      });
  }
  editUser(user: User) {
    this.selectedUser = {...user};
    this.isEditMode = true;
    this.showModal = true;
  }
  onUserSaved() {
    this.loadUsers();
    this.selectedUser = null;
    this.isEditMode = false;
    this.closeModal();
  }
  deleteUser(userId: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      this.dataService.deleteUser(userId)
        .subscribe({
          next: (res) => {
            console.log(res);
            console.log(userId);
            this.users = this.users.filter(user => user.userId !== userId);
          },
          error: (err) => {
            console.error("Erreur lors de la suppression de l'utilisateur", err);
          }
        });
    }
  }
  addNewUser(){
    this.selectedUser=null;
    this.isEditMode=false;
    this.showModal=true;
  }
  closeModal() {
    this.selectedUser = null;
    this.isEditMode = false;
    this.showModal = false;
  }


}


