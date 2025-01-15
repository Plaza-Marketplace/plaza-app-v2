import { User } from "./user";

export type Video = {
  id: Id;

  poster: Pick<User, "id" | "username" | "profileImageUrl">;

  videoUrl: Url;

  products: Product[];

  likeCount: number;

  commentCount: number;

  reviewCount: number;

  description: string | null;

  createdAt: Timestamp;
};

export type CreateVideo = {
  posterId: Id;

  description: string | null;

  base64Video: Base64;

  products: Product[];
};
