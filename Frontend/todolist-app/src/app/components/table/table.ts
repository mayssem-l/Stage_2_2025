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

  handleCellFormatting(cell: string) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    if (dateRegex.test(cell)) {
      return new Date(cell).toLocaleString("fr-FR");
    }

    return cell.toString();
  }

  ngOnDestroy() {
  }
}
