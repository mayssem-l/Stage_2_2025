import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import {Observable} from 'rxjs';
import {Task} from '../models/Task';
import {User} from '../models/User';
import {Response} from '../types/Response';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    console.log(this.apiUrl)
  }

  getAllTasks(){
    return this.httpClient.get(`${this.apiUrl}/task/getAll`) as Observable<Task[]>
  }

  getCategories(){
    return this.httpClient.get(`${this.apiUrl}/task/getCategories`) as Observable<string[]>
  }

  saveTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}/task/saveTask`, task);
  }
  deleteTask(taskId: number): Observable<Response> {
    return this.httpClient.delete<Response>(`${this.apiUrl}/task/deleteTask?id=${taskId}`);
  }

  getAllUsers() {
    return this.httpClient.get(`${this.apiUrl}/user/getAll`) as Observable<User[]>;
  }

  deleteUser(userId: number): Observable<Response> {
    return this.httpClient.delete<Response>(`${this.apiUrl}/user/deleteUser?id=${userId}`);
  }
  saveUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/user/saveUser`, user);
  }
}
