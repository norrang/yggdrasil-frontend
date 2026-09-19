import { OrderStatus } from './order-status';
import { CommentResponse } from './comment-response';
import { OrderLineResponse } from './order-line-response';

export interface BackofficeOrderResponse {
  id: string;
  orderNumber: string;
  customerName: string;
  characterName: string;
  dropOffLocation: string;
  status: OrderStatus;
  orderedAt: Date;
  customerNote: string;
  lines: OrderLineResponse[];
  comments: CommentResponse[];
}
