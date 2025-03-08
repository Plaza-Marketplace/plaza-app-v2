export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export type OrderHistoryItem = {
  id: Id;

  buyer: Pick<User, 'id' | 'username' | 'profileImageUrl'>;

  seller: Pick<User, 'id' | 'username' | 'profileImageUrl'>;

  finalPrice: number;

  product: Product;

  status: OrderStatus;

  createdAt: Timestamp;

  shippingDate: Timestamp | null;

  deliveredDate: Timestamp | null;

  trackingNumber: string | null;

  shippingProvider: string | null;

  shippingAddress: string;
};

export type CreateOrderHistoryItem = {
  userId: Id;

  sellerId: Id;

  finalPrice: number;

  productId: Id;

  shippingAddress: string;
};

export type UpdateOrderHistoryItem = {
  status: OrderStatus;

  shippingDate: Timestamp | null;

  deliveredDate: Timestamp | null;

  trackingNumber: string | null;

  shippingProvider: string | null;
};
