import { ProductReview, SellerReview } from './review';

export enum PostType {
  POST = 'POST',
  SHOWCASE = 'SHOWCASE',
  REVIEW = 'REVIEW',
}

export type CommunityPost = {
  id: number;
  communityId: number;
  posterId: number;
  title: string;
  description: string;
  postType: PostType;
  productId: Id | null;
  imageUrl: string | null;
  productReviewId: Id | null;
  sellerReviewId: Id | null;
  createdAt: Timestamp;
};

export type ProductDetails = {
  id: Id;
  name: string;
  imageUrls: Url[];
  price: number;
  seller: {
    id: Id;
    username: string;
  } | null;
}

export type ChatterCommunityPost = {
  id: Id;
  community: Pick<Community, 'id' | 'name'>;
  poster: {
    id: Id;
    username: string;
  };
  title: string;
  description: string;
  postType: PostType;
  product: {
    id: Id;
    name: string;
    imageUrls: Url[];
    price: number;
    seller: {
      id: Id;
      username: string;
    } | null;
  } | null;
  productReview: {
    id: Id;
    rating: number;
    description: string;
    createdAt: Timestamp;
  } | null;
  sellerReview: {
    id: Id;
    rating: number;
    description: string;
    createdAt: Timestamp;
  } | null;
  createdAt: Timestamp;
};

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
};

export type UpdateCommunityPost = {
  title?: string;
  description?: string;
  productId?: Id;
  imageUrl?: string;
  productReviewId?: Id;
  sellerReviewId?: Id;
};
