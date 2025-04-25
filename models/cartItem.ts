type CartItem = {
  id: Id;

  userId: Id;

  product: Product;

  quantity: number;

  createdAt: Timestamp;

  variant: {
    id: Id;

    price: number;

    options: {
      id: Id;

      value: {
        id: Id;

        name: string;

        type: {
          id: Id;

          name: string;
        };
      };
    }[];
  } | null;
};

type CreateCartItem = {
  userId: Id;

  productId: Id;

  quantity: number | null;
};
