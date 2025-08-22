import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { type TableConfig } from '../../types/TableConfig';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-table',
  imports: [MatIconModule],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})

export class Table implements OnInit, OnDestroy {
  @Input({ required: true }) table!: TableConfig;

  ngOnInit(): void {

  }

  ngOnDestroy() {
  }


  // tableHeader = this.data[0];
  // tableBody = this.data.splice(1);
}
