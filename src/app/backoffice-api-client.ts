import { inject, Service, Signal } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, httpResource } from '@angular/common/http';
import { ItemTypeResponse } from './item-types/item-type-response';
import { BackofficeOrderResponse } from './orders/backoffice-order-response';
import { CreateOrUpdateItemTypeRequest } from './item-types/create-or-update-item-type-request';
import { OrderStatus } from './orders/order-status';
import { UpdateOrderStatusRequest } from './orders/update-order-status-request';
import { CommentResponse } from './orders/comment-response';
import { AddCommentRequest } from './orders/add-comment-request';
import { TestEmailRequest } from './mail-settings/test-email-request';
import { StaffSubscriptionResponse } from './mail-settings/staff-subscription-response';
import { StaffSubscriptionRequest } from './mail-settings/staff-subscription-request';

@Service()
export class BackofficeApiClient {
  private readonly BASE_API_URL = `${environment.apiBaseUri}/api/backoffice`;
  private readonly http = inject(HttpClient);

  // Item Types
  public getItemTypes() {
    return httpResource<ItemTypeResponse[]>(() => `${this.BASE_API_URL}/item-types`);
  }

  public getItemTypeById(id: string) {
    return httpResource<ItemTypeResponse>(() => `${this.BASE_API_URL}/item-types/${id}`);
  }

  public createItemType(createItemTypeRequest: CreateOrUpdateItemTypeRequest) {
    return this.http.post<ItemTypeResponse>(
      `${this.BASE_API_URL}/item-types`,
      createItemTypeRequest,
    );
  }

  public updateItemType(id: string, itemType: CreateOrUpdateItemTypeRequest) {
    return this.http.put<ItemTypeResponse>(`${this.BASE_API_URL}/item-types/${id}`, itemType);
  }

  public deleteItemType(id: string) {
    return this.http.delete<ItemTypeResponse>(`${this.BASE_API_URL}/item-types/${id}`);
  }

  // Orders
  public getOrders() {
    return httpResource<BackofficeOrderResponse[]>(() => `${this.BASE_API_URL}/orders`);
  }

  public getOrderByIdSignal(id: Signal<string>) {
    return httpResource<BackofficeOrderResponse>(() => `${this.BASE_API_URL}/orders/${id()}`);
  }

  public updateOrderStatus(orderId: string, orderStatus: OrderStatus) {
    return this.http.patch<OrderStatus>(`${this.BASE_API_URL}/orders/${orderId}`, {
      status: orderStatus,
    } as UpdateOrderStatusRequest);
  }

  public postComment(orderId: string, comment: string, isPrivateComment: boolean) {
    return this.http.post<CommentResponse>(`${this.BASE_API_URL}/orders/${orderId}/comments`, {
      body: comment,
      private: isPrivateComment,
    } as AddCommentRequest);
  }

  // Staff subscriptions
  public sendTestEmail(testEmailRequest: TestEmailRequest) {
    return this.http.post<void>(`${this.BASE_API_URL}/mail/test`, testEmailRequest);
  }

  public getUsersStaffEmailSubscription() {
    return httpResource<StaffSubscriptionResponse>(() => `${this.BASE_API_URL}/mail/subscription`);
  }

  public createOrReplaceUsersStaffEmailSubscription(
    staffSubscriptionRequest: StaffSubscriptionRequest,
  ) {
    return this.http.put<StaffSubscriptionResponse>(
      `${this.BASE_API_URL}/mail/subscription`,
      staffSubscriptionRequest,
    );
  }

  public deleteUsersStaffEmailSubscription() {
    return this.http.delete<StaffSubscriptionResponse>(`${this.BASE_API_URL}/mail/subscription`);
  }
}
