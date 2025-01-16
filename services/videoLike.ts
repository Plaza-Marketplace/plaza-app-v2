import { Video } from '@/models/video';
import { supabase } from '@/utils/supabase';
import { getImagePublicUrls, getVideoPublicUrl } from './storage';

const supabaseToVideo = (video: any): Video => {
  return {
    id: video.id,
    poster: {
      id: video.poster.id,
      username: video.poster.username,
      profileImageUrl: video.poster.profile_image_url,
    },
    videoUrl: getVideoPublicUrl(video.video_key),
    products: video.products.map((productObj): Product => {
      const product = productObj.product;
      const imageUrls = getImagePublicUrls(
        product.images.map((image) => image.image_key)
      );

      return {
        id: product.id,
        sellerId: video.poster_id,
        name: product.name,
        description: product.description,
        category: product.category,
        condition: product.condition,
        price: product.price,
        shippingPrice: product.shipping_price,
        imageUrls: imageUrls,
        quantity: product.quantity,
        createdAt: product.created_at,
      };
    }),
    description: video.description,
    createdAt: video.created_at,
    likeCount: video.like_count[0].count,
    commentCount: video.comment_count[0].count,
    reviewCount: video.seller_review_count.seller_review[0].count,
  };
};

export const getIsVideoLikedByUser = async (
  videoId: Id,
  userId: Id
): Promise<boolean> => {
  const { count, error } = await supabase
    .from('video_like')
    .select('*', { count: 'exact', head: true })
    .eq('video_id', videoId)
    .eq('liker_id', userId);
    
  if (error) {
    throw new Error(error.message);
  } else if (count === null) {
    return false;
  }

  return count > 0;
};

export const getVideosLikedByUserId = async (userId: Id): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('video_like')
    .select(
      `
      video:video_id(
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
            )
          )
        ),
        like_count: video_like(count),
        comment_count: video_comment(count),
        seller_review_count: user(
          seller_review!seller_id(
            count
          )
        ))`
    )
    .eq('liker_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((video) => supabaseToVideo(video.video));
};
