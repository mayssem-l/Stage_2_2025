import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-top-toolbar',
  imports: [MatIconModule, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './top-toolbar.html',
  styleUrl: './top-toolbar.scss'
})
export class TopToolbar {
  
  username = localStorage.getItem("username");


  viewProfile() {
    // Route or open modal with user profile
    console.log('Navigating to profile...');
    // this.router.navigate(['/profile']); // example
  }

  logout() {
    // Perform logout logic
    console.log('Logging out...');
  }

}
