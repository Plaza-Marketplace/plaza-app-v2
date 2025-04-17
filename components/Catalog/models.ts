export type CatalogProduct = {
  id: Id;

  name: string;

  price: number | null;

  thumbnailUrl: Url | null;

  seller: {
    profileImageUrl: Url | null;

    username: string;

    averageRating: number;
  };
};
