enum OrderStatus {
  PENDING = 'PENDING',
}

type OrderHistoryItem = {
  id: Id;

  userId: Id;

  product: Product;

  status: OrderStatus;

  createdAt: Timestamp;
};

type CreateOrderHistoryItem = {
  userId: Id;

  productId: Id;
};
