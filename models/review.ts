import { User } from './user';

export type ProductReview = {
  id: number;
  seller: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
  reviewer: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
  rating: number;
  description: string;
  createdAt: Timestamp;
};

export type SellerReview = {
  id: number;
  seller: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
  reviewer: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
  rating: number;
  description: string;
  createdAt: string;
};

export type FeedProductReview = {
  id: Id;
  reviewer: Pick<User, 'id' | 'username' | 'profileImageUrl'>;
  description: string;
  rating: number;
  createdAt: Timestamp;
};

export type CreateSellerReview = {
  sellerId: Id;
  reviewerId: Id;
  rating: number;
  description: string;
};

export type UpdateSellerReview = {
  rating: number;
  description: string;
};

export type Review = ProductReview | SellerReview;
export type FeedReview = FeedProductReview;
