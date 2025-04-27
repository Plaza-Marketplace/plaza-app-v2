export type CollectionProduct = {
  collectionId: Id;

  id: Id;

  name: string;

  price: number;

  thumbnailUrl: Url | null;

  seller: {
    id: Id;

    username: string;

    displayName: string | null;

    profilePictureUrl: Url | null;

    averageRating: number;
  };
};
