import { Component, inject } from '@angular/core';
import { RegisterOrderStateStore } from '../register-order-state-store';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  imports: [MatIcon, MatIconButton],
  selector: 'app-register-order-result',
  styleUrl: './register-order-result.css',
  templateUrl: './register-order-result.html',
})
export class RegisterOrderResult {
  protected readonly lastOrderResult = inject(RegisterOrderStateStore).lastOrderResult;
  private readonly clipboard = inject(Clipboard);

  protected copyOrderNumber(orderNumber: string) {
    this.clipboard.copy(orderNumber);
  }
}
