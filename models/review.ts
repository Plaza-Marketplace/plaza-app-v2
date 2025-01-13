type ProductReview = {
  id: number;
  productId: Id;
  reviewerId: Id;
  rating: number;
  description: string;
  createdAt: Timestamp;
};

type SellerReview = {
  id: number;
  sellerId: Id;
  reviewerId: Id;
  rating: number;
  description: string;
  createdAt: Timestamp;
}