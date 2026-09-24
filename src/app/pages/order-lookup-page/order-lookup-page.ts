import { Component, inject, input, OnInit, signal } from '@angular/core';
import { OrderLookupStore } from '../../orders/order-lookup-store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderDetails } from '../../orders/order-details/order-details';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [OrderDetails, JsonPipe],
  selector: 'app-order-lookup-page',
  styleUrl: './order-lookup-page.css',
  templateUrl: './order-lookup-page.html',
})
export class OrderLookupPage implements OnInit {
  orderNumber = input.required<string>();

  protected readonly orderLookupStore = inject(OrderLookupStore);
  protected readonly HttpStatusCode = HttpStatusCode;

  protected loadingOrderDetails = this.orderLookupStore.loadingOrderDetails;
  protected orderDetails = this.orderLookupStore.storedOrderDetails;
  protected orderDetailsError = signal<HttpErrorResponse | null>(null);

  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    const orderNumber = this.orderNumber();
    // If the page is opened through, for example, a link, we want to lookup the order details
    if (
      orderNumber &&
      (this.orderDetails() === null || this.orderDetails()?.orderNumber !== orderNumber)
    ) {
      this.orderLookupStore.lookupOrder(orderNumber).catch((error) => {
        this.handleOrderLookupError(error);
      });
    }
  }

  refreshOrderDetails() {
    if (!this.orderLookupStore.loadingOrderDetails()) {
      this.orderLookupStore.lookupOrder(this.orderNumber()).catch((error) => {
        this.handleOrderLookupError(error);
      });
    }
  }

  private handleOrderLookupError(error: HttpErrorResponse) {
    console.error('Error looking up order:', error);
    this.orderDetailsError.set(error);

    if (error.status !== HttpStatusCode.NotFound) {
      this.snackBar.open('Error looking up order', 'Dismiss', { duration: 10000 });
    }
  }
}
