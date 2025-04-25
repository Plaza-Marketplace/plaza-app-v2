export type Pin = {
  id: Id;

  name: string;

  products: {
    id: Id;

    name: string;

    price: number;

    thumbnailUrl: Url | null;

    seller: {
      id: Id;

      username: string | null;

      averageRating: number;

      profileImageUrl: Url | null;
    };
  }[];
};
