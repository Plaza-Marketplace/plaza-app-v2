import { supabase } from "@/utils/supabase";

type ExploreTab = {
  videos: Video[];
}

export const formatExploreTab = (): ExploreTab => {
  
}

export const getExploreTab = (): Promise<ExploreTab> => {
  const { data, error } = await supabase
    .from('video')
    .select(`
      *,
      poster: user!poster_id(
        id,
        username,
        profile_image_url
      ),
      products: video_product(
        product(
          *,
          images: product_image(
            image_key
          ),
          product_review_count: product_review(
            count
          )
        )
      ),
      like_count: video_like(count),
      comment_count: video_comment(count),
      seller_review_count: user(
        seller_review!seller_id(
          count
        )
      )
    `);

  if (error) throw new Error(error.message);

  data
};