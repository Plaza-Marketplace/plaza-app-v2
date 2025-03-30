export type CollectionProduct = {
  id: Id;

  name: string;

  price: number;

  thumbnailUrl: Url | null;

  seller: {
    id: Id;

    username: string;

    profilePictureUrl: Url | null;

    averageRating: number;
  };
};
