import { OrderStatus } from '@/models/orderHistoryItem';

export type YourOrdersScreen = {
  pendingOrders: {
    id: Id;

    product: {
      id: Id;

      name: string;

      thumbnailUrl: Url | null;

      finalPrice: number;
    };

    status: OrderStatus;

    createdAt: Timestamp;
  }[];

  completedOrders: {
    id: Id;

    product: {
      id: Id;

      name: string;

      thumbnailUrl: Url | null;

      finalPrice: number;
    };

    status: OrderStatus;

    createdAt: Timestamp;
  }[];
};
