import { Component, inject, input } from '@angular/core';
import { BackofficeOrderResponse } from '../backoffice-order-response';
import { DatePipe } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { Router } from '@angular/router';

@Component({
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatNoDataRow,
    MatIcon,
    MatBadge,
  ],
  selector: 'app-order-table',
  styleUrl: './order-table.css',
  templateUrl: './order-table.html',
})
export class OrderTable {
  readonly orders = input.required<BackofficeOrderResponse[]>();
  protected displayedColumns = [
    'orderedAt',
    'orderNumber',
    'customerName',
    'characterName',
    'dropOffLocation',
    'status',
    'comments',
  ];

  private readonly router = inject(Router);

  openOrderDetails(id: string) {
    this.router.navigate(['backoffice/manage-orders/', id]);
  }
}
