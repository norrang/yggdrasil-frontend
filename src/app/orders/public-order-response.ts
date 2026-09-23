import { OrderStatus } from './order-status';
import { CommentResponse } from './comment-response';
import { OrderLineResponse } from './order-line-response';

export interface PublicOrderResponse {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  characterName: string;
  dropOffLocation: string;
  status: OrderStatus;
  orderedAt: Date;
  customerNote: string;
  lines: OrderLineResponse[];
  comments: CommentResponse[];
}
