import { Component, signal } from '@angular/core';
import { RegisterOrderForm } from '../../orders/register-order-form/register-order-form';
import { RegisterOrderResult } from '../../orders/register-order-result/register-order-result';

enum RegisterOrderView {
  FORM,
  RESULT,
}

@Component({
  imports: [RegisterOrderForm, RegisterOrderResult],
  selector: 'app-register-order-page',
  styleUrl: './register-order-page.css',
  templateUrl: './register-order-page.html',
})
export class RegisterOrderPage {
  protected readonly registerOrderViewState = signal<RegisterOrderView>(RegisterOrderView.FORM);
  protected readonly RegisterOrderView = RegisterOrderView;

  protected moveToResult() {
    this.registerOrderViewState.set(RegisterOrderView.RESULT);
  }
}
