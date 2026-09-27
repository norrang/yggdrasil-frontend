import { Component, inject } from '@angular/core';
import { BackofficeApiClient } from '../../../backoffice-api-client';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OrderTable } from '../../../orders/order-table/order-table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatProgressSpinner, OrderTable, MatIconButton, MatIcon],
  selector: 'app-manage-orders-page',
  styleUrl: './manage-orders-page.css',
  templateUrl: './manage-orders-page.html',
})
export class ManageOrdersPage {
  protected readonly backofficeApiClient = inject(BackofficeApiClient);
  protected readonly orders = this.backofficeApiClient.getOrders();

  protected refreshOrders() {
    this.orders.reload();
  }
}
