import { Component, Input } from '@angular/core';
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-sidenav',
  imports: [
    DatePipe
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss'
})

export class Sidenav {
  @Input() categories: string[] = [];
}
