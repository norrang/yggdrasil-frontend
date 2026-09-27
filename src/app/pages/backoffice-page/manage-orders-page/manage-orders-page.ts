import { Component, inject } from '@angular/core';
import { BackofficeApiClient } from '../../../backoffice-api-client';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { OrderTable } from '../../../orders/order-table/order-table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { InfoBox } from '../../../info-box/info-box';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [MatProgressSpinner, OrderTable, MatIconButton, MatIcon, InfoBox, JsonPipe],
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
