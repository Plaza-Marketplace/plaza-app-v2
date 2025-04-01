export type CatalogProduct = {
  id: Id;

  name: string;

  price: number;

  thumbnailUrl: Url | null;

  seller: {
    profileImageUrl: Url | null;

    username: string;

    averageRating: number;
  };
};
