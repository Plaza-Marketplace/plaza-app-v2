export type ProductModalProduct = {
  id: Id;

  name: string;

  description: string;

  price: number;

  imageUrls: Url[];

  createdAt: Timestamp;

  seller: {
    id: Id;

    username: string;

    averageRating: number;

    reviews: {
      id: Id;

      rating: number;

      description: string;

      createdAt: Timestamp;

      user: {
        id: Id;

        username: string;
      };
    }[];
  };
};
