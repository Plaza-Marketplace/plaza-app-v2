import { FeedProductReview, ProductReview } from '@/models/review';
import { supabase } from '@/utils/supabase';

export const getProductReviewsByProductId = async (
  productId: Id
): Promise<FeedProductReview[]> => {
  const { data, error } = await supabase
    .from('product_review')
    .select(
      `*,
      reviewer: user(
        id,
        username,
        profile_image_url
      )
    `
    )
    .eq('product_id', productId);

  if (error) throw new Error(error.message);

  return data.map((review) => ({
    id: review.id,
    reviewer: {
      id: review.reviewer.id,
      username: review.reviewer.username,
      profileImageUrl: review.reviewer.profile_image_url,
    },
    rating: review.rating,
    description: review.description,
    createdAt: review.created_at,
  }));
};
