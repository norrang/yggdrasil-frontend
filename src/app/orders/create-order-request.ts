import { OrderLineRequest } from './order-line-request';

export interface CreateOrderRequest {
  customerName: string;
  characterName: string;
  dropOffLocation: string;
  customerNote: string;
  lines: OrderLineRequest[];
}
