import { inject, Service } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { PublicItemTypeResponse } from './item-types/public-item-type-response';
import { PublicOrderResponse } from './orders/public-order-response';
import { CreateOrderRequest } from './orders/create-order-request';

@Service()
export class PublicApiClient {
  private readonly BASE_API_URL = `${environment.apiBaseUri}/api/public`;
  private readonly http = inject(HttpClient);

  public getItemTypes() {
    return httpResource<PublicItemTypeResponse[]>(() => `${this.BASE_API_URL}/item-types`);
  }

  public getOrderByOrderNumber(orderNumber: string) {
    return this.http.get<PublicOrderResponse>(`${this.BASE_API_URL}/orders/${orderNumber}`);
  }

  public placeOrder(createOrderRequest: CreateOrderRequest) {
    return this.http.post<PublicOrderResponse>(`${this.BASE_API_URL}/orders`, createOrderRequest);
  }
}
