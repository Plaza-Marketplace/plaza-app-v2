export enum PostType {
  POST = "POST",
  SHOWCASE = "SHOWCASE",
  REVIEW = "REVIEW",
}

export type CommunityPost = {
  id: number;
  communityId: number;
  posterId: number;
  title: string;
  description: string;
  postType: PostType
  productId: Id | null;
  imageUrl: string | null;
  productReviewId: Id | null;
  sellerReviewId: Id | null;
  createdAt: Timestamp;
}

export type CreateCommunityPost = {
  communityId: number;
  posterId: number;
  title: string;
  description: string;
  postType: PostType;
  productId?: Id;
  imageUrl?: string;
  productReviewId?: Id;
  sellerReviewId?: Id;
}

export type UpdateCommunityPost = {
  title?: string;
  description?: string;
  productId?: Id;
  imageUrl?: string;
  productReviewId?: Id;
  sellerReviewId?: Id;
}