import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  imports: [],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss'
})

export class Sidenav {
  @Input() categories: string[] = [];
}
