import { OrderStatus } from '@/models/orderHistoryItem';

export const StatusToString = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.SHIPPED:
      return 'Order is on the way';
    case OrderStatus.PENDING:
      return 'Order is being processed';
    case OrderStatus.DELIVERED:
      return 'Received on';
    case OrderStatus.CANCELED:
      return 'Order has been canceled';
    default:
      return 'Order has been confirmed';
  }
};
