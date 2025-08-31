import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopToolbar } from './components/top-toolbar/top-toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Form } from './components/form/form';
import { Register } from './components/register/register';
import { DataService } from './services/data-service';
import { UserRole } from './enums/UserRoles';
import { Dashboard } from './pages/dashboard/dashboard';
import { Overview } from './pages/overview/overview';
import { AnimBg } from './components/anim-bg/anim-bg';
import { BgLogin } from './components/anim-bg/bg-login/bg-login';
import { AuthService } from './services/auth-service';
import { DialogForm } from './components/dialog-form/dialog-form';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TopToolbar,
    MatIconModule,
    Form,
    Register,
    Dashboard,
    Overview,
    AnimBg,
    BgLogin,
    DialogForm
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  protected title = 'todolist-app';
  protected isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.authService.validateToken();
  }

  redirectToPage(path: string) {
    return this.router.navigate([path]);
  }

}
