import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';
import { getImagePublicUrls, getVideoPublicUrl } from '../crud/storage';

const EXPLORE_TAB_VIDEO_QUERY = `
*,
poster: user(
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
isLiked: video_like!inner(count),
like_count: video_like(count),
comment_count: video_comment(count),
seller_review_count: user(
  seller_review!seller_id(
    count
  )
)
`;

export const formatExploreTabVideo = (
  video: Tables<'video'>,
  poster: Pick<Tables<'user'>, 'id' | 'username' | 'profile_image_url'>,
  products: Tables<'product'>[],
  productImageKeys: Tables<'product_image'>['image_key'][][],
  isLiked: boolean,
  likeCount: number,
  commentCount: number,
  reviewCount: number
): ExploreTab['videos'][0] => {
  return {
    id: video.id,
    poster: {
      id: poster.id,
      username: poster.username,
      profileImageUrl: poster.profile_image_url,
    },
    videoUrl: getVideoPublicUrl(video.video_key),
    products: products.map((product, index) => ({
      id: product.id,
      sellerId: product.seller_id,
      name: product.name,
      description: product.description,
      category: product.category,
      condition: product.condition,
      price: product.price,
      shippingPrice: product.shipping_price,
      imageUrls: getImagePublicUrls(productImageKeys[index]),
      createdAt: product.created_at,
      quantity: product.quantity,
    })),
    isLiked: isLiked,
    likeCount: likeCount,
    commentCount: commentCount,
    reviewCount: reviewCount,
    description: video.description,
    createdAt: video.created_at,
  };
};

export const getExploreTab = async (userId: Id): Promise<ExploreTab> => {
  const { data, error } = await supabase
    .from('video')
    .select(EXPLORE_TAB_VIDEO_QUERY)
    .eq('isLiked.liker_id', userId)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  return {
    videos: data.map((video) =>
      formatExploreTabVideo(
        video,
        video.poster,
        video.products.map((videoProduct) => videoProduct.product),
        video.products.map((videoProduct) =>
          videoProduct.product.images.map((image) => image.image_key)
        ),
        video.isLiked[0].count > 0,
        video.like_count[0].count,
        video.comment_count[0].count,
        video.seller_review_count.seller_review[0].count +
          video.products.reduce(
            (acc, product) =>
              acc + product.product.product_review_count[0].count,
            0
          )
      )
    ),
  };
};

export const getNextExploreTabVideos = async (
  userId: Id,
  lastVideoId: Id
): Promise<ExploreTab['videos']> => {
  const { data, error } = await supabase
    .from('video')
    .select(EXPLORE_TAB_VIDEO_QUERY)
    .eq('isLiked.liker_id', userId)
    .lt('id', lastVideoId)
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  return data.map((video) =>
    formatExploreTabVideo(
      video,
      video.poster,
      video.products.map((videoProduct) => videoProduct.product),
      video.products.map((videoProduct) =>
        videoProduct.product.images.map((image) => image.image_key)
      ),
      video.isLiked[0].count > 0,
      video.like_count[0].count,
      video.comment_count[0].count,
      video.seller_review_count.seller_review[0].count +
        video.products.reduce(
          (acc, product) => acc + product.product.product_review_count[0].count,
          0
        )
    )
  );
};
