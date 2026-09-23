import { Component, computed, input, output } from '@angular/core';
import { PublicOrderResponse } from '../public-order-response';
import { DatePipe, JsonPipe, NgOptimizedImage } from '@angular/common';
import { MatChip } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
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
import { toObservable } from '@angular/core/rxjs-interop';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';

@Component({
  imports: [
    JsonPipe,
    MatChip,
    DatePipe,
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    NgOptimizedImage,
    MatCard,
    MatCardContent,
    MatCardHeader,
  ],
  selector: 'app-order-details',
  styleUrl: './order-details.css',
  templateUrl: './order-details.html',
})
export class OrderDetails {
  orderDetails = input.required<PublicOrderResponse>();
  refreshOrderDetails = output<void>();

  orderLines = toObservable(computed(() => this.orderDetails().lines));
  displayedColumns = ['image', 'name', 'quantity'];
}
