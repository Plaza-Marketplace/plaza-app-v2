type CommunityCollectionItem = {
  id: Id;

  communityId: Id;

  product: Pick<Product, 'id' | 'name' | 'imageUrls'>;

  description: string | null;

  createdAt: Timestamp;
};

type CreateCommunityCollectionItem = {
  communityId: Id;

  productId: Id;

  description: string | null;
};
