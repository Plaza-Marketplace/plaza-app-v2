type CommunityCollectionItem = {
  id: Id;

  communityId: Id;

  product: Product;

  description: string | null;

  createdAt: Timestamp;
};

type CreateCommunityCollectionItem = {
  communityId: Id;

  productId: Id;

  description: string | null;
};
