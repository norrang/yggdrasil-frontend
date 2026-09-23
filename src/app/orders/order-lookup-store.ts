import { inject, Service, signal } from '@angular/core';
import { PublicApiClient } from '../public-api-client';
import { PublicOrderResponse } from './public-order-response';
import { firstValueFrom, tap } from 'rxjs';

@Service()
export class OrderLookupStore {
  private readonly publicApiClient = inject(PublicApiClient);
  private _orderDetails = signal<PublicOrderResponse | null>(null);

  get orderDetails() {
    return this._orderDetails.asReadonly();
  }

  async lookupOrder(orderNumber: string) {
    return firstValueFrom(
      this.publicApiClient
        .getOrderByOrderNumber(orderNumber)
        .pipe(tap((orderDetails) => this._orderDetails.set(orderDetails))),
    );
  }
}
