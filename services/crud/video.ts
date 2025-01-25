import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer';
import { CreateVideo, Video } from '@/models/video';
import { getImagePublicUrls, getVideoPublicUrl } from './storage';

const query = `
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
`;

const supabaseToVideo = (video: any): Video => {
  let productsReviewCount = 0;

  video.products.forEach(
    (product) =>
      (productsReviewCount += product.product.product_review_count[0].count)
  );

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
        sellerId: video.poster.id,
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
    reviewCount:
      video.seller_review_count.seller_review[0].count + productsReviewCount,
  };
};

export const getVideos = async (lastVideoId: Id | null): Promise<Video[]> => {
  const { data, error } = lastVideoId
    ? await supabase
        .from('video')
        .select(query)
        .lt('id', lastVideoId)
        .limit(5)
        .order('created_at', { ascending: false })
    : await supabase
        .from('video')
        .select(query)
        .limit(5)
        .order('created_at', { ascending: false });

  if (error) throw new Error('Failed');

  if (!data) return [];

  return data.map((video) => supabaseToVideo(video));
};

export const getVideosByUserId = async (userId: Id): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('video')
    .select(query)
    .eq('poster_id', userId);

  if (error) throw new Error('Failed');

  if (!data) return [];

  return data.map((video) => supabaseToVideo(video));
};

export const getVideoById = async (videoId: Id): Promise<Video> => {
  const { data, error } = await supabase
    .from('video')
    .select(query)
    .eq('id', videoId)
    .single();

  if (error) throw new Error('Failed');

  if (!data) throw new Error('Failed');

  return supabaseToVideo(data);
};

export const createVideoLike = async (
  videoLike: CreateVideoLike
): Promise<VideoLike> => {
  const isLiked = await getVideoIsLiked(videoLike.videoId, videoLike.likerId);

  if (isLiked) throw new Error('Already liked, failed');

  const { data, error } = await supabase
    .from('video_like')
    .insert({
      video_id: videoLike.videoId,
      liker_id: videoLike.likerId,
    })
    .select();

  if (error || !data) throw new Error('Failed');

  return {
    id: data[0].id,
    videoId: data[0].video_id,
    likerId: data[0].liker_id,
    createdAt: data[0].created_at,
  };
};

export const deleteVideoLike = async (
  videoLike: DeleteVideoLike
): Promise<VideoLike> => {
  const isLiked = await getVideoIsLiked(videoLike.videoId, videoLike.likerId);

  if (!isLiked) throw new Error('Already unliked, failed');

  const { data, error } = await supabase
    .from('video_like')
    .delete()
    .eq('video_id', videoLike.videoId)
    .eq('liker_id', videoLike.likerId)
    .select()
    .single();

  if (error || !data) throw new Error('Failed');

  return {
    id: data.id,
    videoId: data.video_id,
    likerId: data.liker_id,
    createdAt: data.created_at,
  };
};

export const getVideoIsLiked = async (
  videoId: Id,
  likerId: Id
): Promise<boolean> => {
  const { count, error } = await supabase
    .from('video_like')
    .select('*', { count: 'exact', head: true })
    .eq('video_id', videoId)
    .eq('liker_id', likerId)
    .limit(1);

  if (error) throw new Error('Failed');

  if (count === null) throw new Error('Failed');

  return count > 0;
};

export const createVideo = async (video: CreateVideo): Promise<Video> => {
  const key = uuidv4();
  const path = `private/${key}`;

  const { data, error } = await supabase.storage
    .from('videos')
    .upload(path, decode(video.base64Video), {
      contentType: 'video/quicktime',
    });

  if (error) throw new Error('Failed');

  const { data: uploadedVideo, error: uploadedVideoError } = await supabase
    .from('video')
    .insert({
      poster_id: video.posterId,
      description: video.description,
      video_key: key,
    })
    .select(query);

  if (uploadedVideoError) throw new Error('Failed');

  const { error: createVideoProductError } = await supabase
    .from('video_product')
    .insert(
      video.products.map((product) => ({
        video_id: uploadedVideo[0].id,
        product_id: product.id,
      }))
    );

  if (createVideoProductError) throw new Error('Failed');

  return {
    id: uploadedVideo[0].id,
    poster: {
      id: uploadedVideo[0].poster.id,
      username: uploadedVideo[0].poster.username,
      profileImageUrl: uploadedVideo[0].poster.profile_image_url,
    },
    videoUrl: getVideoPublicUrl(key),
    description: uploadedVideo[0].description,
    products: video.products,
    createdAt: uploadedVideo[0].created_at,
    likeCount: 0,
    commentCount: 0,
    reviewCount: 0,
  };
};
