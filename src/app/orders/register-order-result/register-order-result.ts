import { Component, inject } from '@angular/core';
import { RegisterOrderStateStore } from '../register-order-state-store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import { OrderDetails } from '../order-details/order-details';
import { OrderView } from '../order-view';

@Component({
  imports: [MatIcon, MatIconButton, OrderDetails],
  selector: 'app-register-order-result',
  styleUrl: './register-order-result.css',
  templateUrl: './register-order-result.html',
})
export class RegisterOrderResult {
  protected readonly lastOrderResult = inject(RegisterOrderStateStore).lastOrderResult;
  protected readonly OrderView = OrderView;
  private readonly clipboard = inject(Clipboard);

  protected copyOrderNumber(orderNumber: string) {
    this.clipboard.copy(orderNumber);
  }
}
