import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {
  protected title = 'todolist-app';
  protected isAdmin = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.authService.validateToken();
  }

  redirectToPage(path: string) {
    return this.router.navigate([path]);
  }

}
