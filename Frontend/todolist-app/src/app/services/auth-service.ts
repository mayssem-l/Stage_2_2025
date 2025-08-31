import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { UserRole } from '../enums/UserRoles';
import { DataService } from './data-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  validateToken() {
    return this.dataService.validateToken()
      .subscribe({
        next: res => {
          if (!localStorage.getItem("username")) {
            localStorage.setItem("username", res.username);
          }
          this.redirectByRole(res.roles);
        },
        error: (error) => {

        }
      });
  }

  redirectByRole(roles: string[]) {
    if (roles.includes(UserRole.ADMIN)) {
      this.router.navigate(["/dashboard"]);
    }
    else if (roles.includes(UserRole.USER)) {
      this.router.navigate(["/overview"]);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }
}
