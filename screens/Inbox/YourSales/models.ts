import { OrderStatus } from '@/models/orderHistoryItem';

export type YourSalesScreen = {
  pendingSales: {
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

  completedSales: {
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
