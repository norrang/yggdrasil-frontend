import { Component, computed, input, output } from '@angular/core';
import { PublicOrderResponse } from '../public-order-response';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
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
import { OrderView } from '../order-view';
import { BackofficeOrderResponse } from '../backoffice-order-response';
import { OrderStatusModalData } from '../order-status-modal-data';

@Component({
  imports: [
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
    MatButton,
  ],
  selector: 'app-order-details',
  styleUrl: './order-details.css',
  templateUrl: './order-details.html',
})
export class OrderDetails {
  orderDetails = input.required<PublicOrderResponse | BackofficeOrderResponse>();
  loadingOrderDetails = input<boolean>(false);
  orderView = input<OrderView>(OrderView.PUBLIC_DETAILS);
  refreshOrderDetails = output<void>();
  updateStatus = output<OrderStatusModalData>();

  orderLines = toObservable(computed(() => this.orderDetails().lines));
  displayedColumns = ['image', 'name', 'quantity'];
  protected readonly OrderView = OrderView;

  updateOrderStatus() {
    const orderDetails = this.orderDetails();
    if (!('id' in orderDetails)) {
      return;
    }

    this.updateStatus.emit({
      id: orderDetails.id,
      currentStatus: orderDetails.status,
    });
  }
}
