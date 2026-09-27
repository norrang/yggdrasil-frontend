import { Component, inject, input } from '@angular/core';
import { BackofficeApiClient } from '../../../../backoffice-api-client';
import { OrderDetails } from '../../../../orders/order-details/order-details';
import { OrderView } from '../../../../orders/order-view';
import { MatDialog } from '@angular/material/dialog';
import { UpdateOrderStatusModal } from '../../../../orders/update-order-status-modal/update-order-status-modal';
import { OrderStatusModalData } from '../../../../orders/order-status-modal-data';

@Component({
  imports: [OrderDetails],
  selector: 'app-backoffice-order-details-page',
  styleUrl: './backoffice-order-details-page.css',
  templateUrl: './backoffice-order-details-page.html',
})
export class BackofficeOrderDetailsPage {
  id = input.required<string>();
  protected readonly backofficeApiClient = inject(BackofficeApiClient);
  protected orderDetails = this.backofficeApiClient.getOrderByIdSignal(this.id);
  protected readonly OrderView = OrderView;

  private readonly dialog = inject(MatDialog);

  updateStatus(modalData: OrderStatusModalData) {
    this.dialog
      .open(UpdateOrderStatusModal, {
        data: modalData,
      })
      .afterClosed()
      .subscribe({
        next: (shouldRefresh: boolean) => {
          if (shouldRefresh) {
            this.refreshOrderDetails();
          }
        },
      });
  }

  refreshOrderDetails() {
    this.orderDetails.reload();
  }
}
