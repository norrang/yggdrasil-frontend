import { OrderStatus } from './order-status';

export interface CancelOrderModalData {
  orderNumber: string;
  currentStatus: OrderStatus;
}
