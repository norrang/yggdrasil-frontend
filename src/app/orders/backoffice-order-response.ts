import { OrderStatus } from './order-status';
import { CommentResponse } from './comment-response';
import { OrderLineResponse } from './order-line-response';

export interface BackofficeOrderResponse {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string | null;
  characterName: string;
  dropOffLocation: string;
  status: OrderStatus;
  orderedAt: Date;
  customerNote: string | null;
  cancellationRequestedAt: Date | null;
  cancellationReason: string | null;
  lines: OrderLineResponse[];
  comments: CommentResponse[];
}
