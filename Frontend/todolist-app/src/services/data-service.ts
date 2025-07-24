import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { Response } from '../types/Response';
import { AuthResponse } from '../types/AuthReponse';

@Injectable({
  providedIn: 'root'
})

export class DataService {


  constructor(private httpClient: HttpClient) {
  }

  validateToken() {
    return this.httpClient.get<AuthResponse>(`/api/auth/validate`, { withCredentials: true })
  }

  login(username: string, password: string) {
    return this.httpClient.post<{ token: string }>(
      `/api/auth/login`,
      { username, password }
    );
  }

  getAllTasks() {
    return this.httpClient.get(`/api/task/getAll`) as Observable<Task[]>
  }

  getCategories() {
    return this.httpClient.get(`/api/task/getCategories`) as Observable<string[]>
  }

  saveTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`/api/task/saveTask`, task);
  }
  deleteTask(taskId: number): Observable<Response> {
    return this.httpClient.delete<Response>(`/api/task/deleteTask?id=${taskId}`);
  }

  getAllUsers() {
    return this.httpClient.get(`/api/user/getAll`) as Observable<User[]>;
  }

  deleteUser(userId: number): Observable<Response> {
    return this.httpClient.delete<Response>(`/api/user/deleteUser?id=${userId}`);
  }
  saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`/api/user/saveUser`, user);
  }
}
