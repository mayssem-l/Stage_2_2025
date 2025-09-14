import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-top-toolbar',
  imports: [MatIconModule, MatMenu, MatMenuTrigger, MatMenuItem],
  templateUrl: './top-toolbar.html',
  styleUrl: './top-toolbar.scss'
})
export class TopToolbar {

  public cookieService = inject(CookieService);
  username = localStorage.getItem("username");


  viewProfile() {
    // Route or open modal with user profile
    console.log('Navigating to profile...');
    // this.router.navigate(['/profile']); // example
  }

  logout() {
    // Perform logout logic
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    this.cookieService.deleteAll(); // optional: clear all cookies

    // 2. Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // // 3. Redirect to login page
    // this.router.navigate(['/login']);
    const name= localStorage.getItem("username");
    console.log(name);
    console.log('Logging out...');
    window.location.reload();
   
  }

}
