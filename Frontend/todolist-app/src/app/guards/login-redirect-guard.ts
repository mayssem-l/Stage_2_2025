import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Injectable({ providedIn: 'root' })
export class LoginRedirectGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      this.authService.validateToken();
      return false;
    }
    return true;
  }
}