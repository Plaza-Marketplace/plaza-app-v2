type Video = {
  id: Id;

  posterId: Id;

  videoUrl: Url;

  products: Product[];

  likeCount: number;

  commentCount: number;

  reviewCount: number;

  description: string | null;

  createdAt: Timestamp;
};

type CreateVideo = {
  posterId: Id;

  description: string | null;

  base64Video: Base64;

  products: Product[];
};
