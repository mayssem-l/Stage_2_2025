import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { Response } from '../types/Response';
import { ValdiateResponse } from '../types/ValidateReponse';
import { LoginResponse } from '../types/LoginResponse';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private http: HttpClient = inject(HttpClient);


  validateToken() {
    return this.http.get<ValdiateResponse>(`/api/auth/validate`, {
      withCredentials: true
    })
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(
      `/api/auth/login`,
      { username, password }
    );
  }

  register(user: User) {
    return this.http.post<Response>(`/api/auth/register`, user);
  }

  getAllTasks() {
    return this.http.get(`/api/task/getAll`) as Observable<Task[]>
  }

  getCategories() {
    return this.http.get(`/api/task/getCategories`) as Observable<string[]>
  }
  
  getStatus() {
    return this.http.get(`/api/task/getStatus`) as Observable<string[]>
  }
  
  saveTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`/api/task/saveTask`, task);
  }

  deleteTask(taskId: number): Observable<Response> {
    return this.http.delete<Response>(`/api/task/deleteTask?id=${taskId}`);
  }

  getAllUsers() {
    return this.http.get(`/api/user/getAll`) as Observable<User[]>;
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(`/api/user/saveUser`, user);
  }

  updateUser(user: User) {
    return this.http.post<User>(`/api/user/update`, user);
  }

  deleteUser(userId: number): Observable<Response> {
    return this.http.delete<Response>(`/api/user/deleteUser?id=${userId}`);
  }
}
