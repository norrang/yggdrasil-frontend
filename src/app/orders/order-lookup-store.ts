import { inject, Service, signal } from '@angular/core';
import { PublicApiClient } from '../public-api-client';
import { PublicOrderResponse } from './public-order-response';
import { firstValueFrom, tap } from 'rxjs';
import { CancelOrderRequest } from './cancel-order-request';

@Service()
export class OrderLookupStore {
  private readonly publicApiClient = inject(PublicApiClient);
  private _loadingOrderDetails = signal(false);
  private _storedOrderDetails = signal<PublicOrderResponse | null>(null);

  get loadingOrderDetails() {
    return this._loadingOrderDetails.asReadonly();
  }

  get storedOrderDetails() {
    return this._storedOrderDetails.asReadonly();
  }

  async lookupOrder(orderNumber: string, clearWhileLoading = false) {
    this._loadingOrderDetails.set(true);

    if (clearWhileLoading) {
      this._storedOrderDetails.set(null);
    }

    return firstValueFrom(
      this.publicApiClient
        .getOrderByOrderNumber(orderNumber)
        .pipe(tap((orderDetails) => this._storedOrderDetails.set(orderDetails))),
    ).finally(() => this._loadingOrderDetails.set(false));
  }

  async cancelOrder(orderNumber: string, cancelOrderRequest: CancelOrderRequest) {
    // The response is the updated order, so there is no need to look it up again
    return firstValueFrom(
      this.publicApiClient
        .cancelOrder(orderNumber, cancelOrderRequest)
        .pipe(tap((orderDetails) => this._storedOrderDetails.set(orderDetails))),
    );
  }
}
