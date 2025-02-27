type CartItem = {
  id: Id;

  userId: Id;

  product: Product;

  quantity: number | null;

  createdAt: Timestamp;
};

type CreateCartItem = {
  userId: Id;

  productId: Id;

  quantity: number | null;
};
