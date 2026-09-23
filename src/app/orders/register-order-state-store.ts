import { Service, Signal, signal } from '@angular/core';
import { PublicOrderResponse } from './public-order-response';

@Service()
export class RegisterOrderStateStore {
  private _lastOrderResult = signal<PublicOrderResponse | null>(null);

  get lastOrderResult(): Signal<PublicOrderResponse | null> {
    return this._lastOrderResult.asReadonly();
  }

  set lastOrderResult(value: PublicOrderResponse) {
    this._lastOrderResult.set(value);
  }
}
