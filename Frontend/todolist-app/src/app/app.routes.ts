import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard';
import { UserList } from './components/user-list/user-list';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: 'user-list', component: UserList, canActivate: [AuthGuard] },
  { path: 'login', component: Login },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
