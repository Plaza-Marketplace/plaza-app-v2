import { supabase } from '@/utils/supabase';
import { ReviewsTab } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getReviewsTab = async (userId: Id): Promise<ReviewsTab> => {
  const { data, error, count } = await supabase
    .from('seller_review')
    .select(
      `
      id,
      rating,
      description,
      reviewer: user!reviewer_id(
        id,
        username,
        profile_image_key
      )
    `,
      { count: 'estimated' }
    )
    .eq('seller_id', userId)
    .limit(10);

  if (error) throw new Error(error.message);

  return {
    reviewsCount: count ?? 0,
    reviews: data.map((review) => ({
      id: review.id,
      rating: review.rating,
      description: review.description,
      reviewer: {
        id: review.reviewer.id,
        username: review.reviewer.username,
        profileImageUrl: review.reviewer.profile_image_key
          ? getImagePublicUrl(review.reviewer.profile_image_key)
          : null,
      },
    })),
  };
};
