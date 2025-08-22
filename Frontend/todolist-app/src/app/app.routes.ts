import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { LoginRedirectGuard } from './guards/login-redirect-guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [LoginRedirectGuard] },
  { path: 'dashboard', component: Dashboard }
];
