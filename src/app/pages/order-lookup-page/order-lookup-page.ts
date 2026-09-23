import { Component, inject, input, OnInit, signal } from '@angular/core';
import { OrderLookupStore } from '../../orders/order-lookup-store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderDetails } from '../../orders/order-details/order-details';

@Component({
  imports: [OrderDetails],
  selector: 'app-order-lookup-page',
  styleUrl: './order-lookup-page.css',
  templateUrl: './order-lookup-page.html',
})
export class OrderLookupPage implements OnInit {
  orderNumber = input.required<string>();

  protected orderLookupStore = inject(OrderLookupStore);
  protected loadingOrderDetails = signal(true);
  protected orderDetails = this.orderLookupStore.orderDetails;

  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    const orderNumber = this.orderNumber();
    if (
      orderNumber &&
      (this.orderDetails() === null || this.orderDetails()?.orderNumber !== orderNumber)
    ) {
      this.orderLookupStore.lookupOrder(orderNumber).catch((error) => {
        console.error('Error looking up order:', error);
        this.snackBar.open('Error looking up order', 'Dismiss', { duration: 10000 });
      });
    }

    this.loadingOrderDetails.set(false);
  }
}
