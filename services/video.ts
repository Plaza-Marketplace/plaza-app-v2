import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer';

export const getVideos = async (): Promise<Video[]> => {
  const { data, error } = await supabase.from('video').select(
    `
        *,
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
        )
      `
  );

  if (error) throw new Error('Failed');

  if (!data) return [];

  return data.map((video) => ({
    id: video.id,
    posterId: video.poster_id,
    videoUrl: supabase.storage
      .from('videos')
      .getPublicUrl(`private/${video.video_key}`).data.publicUrl,
    products: video.products.map((productObj): Product => {
      const product = productObj.product;
      const imageUrls = product.images.map(
        (image) =>
          supabase.storage
            .from('images')
            .getPublicUrl(`private/${image.image_key}`).data.publicUrl
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
  }));
};

export const getVideosByUserId = async (userId: Id): Promise<Video[]> => {
  const { data, error } = await supabase.from('video').select(
    `
        *,
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
        )
      `
  )
  .eq('poster_id', userId);

  if (error) throw new Error('Failed');

  if (!data) return [];

  return data.map((video) => ({
    id: video.id,
    posterId: video.poster_id,
    videoUrl: supabase.storage
      .from('videos')
      .getPublicUrl(`private/${video.video_key}`).data.publicUrl,
    products: video.products.map((productObj): Product => {
      const product = productObj.product;
      const imageUrls = product.images.map(
        (image) =>
          supabase.storage
            .from('images')
            .getPublicUrl(`private/${image.image_key}`).data.publicUrl
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
  }));
};

export const createVideoLike = async (
  videoLike: CreateVideoLike
): Promise<VideoLike> => {
  const { data, error } = await supabase
    .from('video_like')
    .insert({
      video_id: videoLike.videoId,
      liker_id: videoLike.likerId,
    })
    .select();

  if (error) throw new Error('Failed');

  if (!data) throw new Error('Failed');

  return {
    id: data[0].id,
    videoId: data[0].video_id,
    likerId: data[0].liker_id,
    createdAt: data[0].created_at,
  };
};

export const deleteVideoLike = async (
  videoLike: DeleteVideoLike
): Promise<void> => {
  const { error } = await supabase
    .from('video_like')
    .delete()
    .eq('video_id', videoLike.videoId)
    .eq('liker_id', videoLike.likerId);

  if (error) throw new Error('Failed');

  return;
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
  console.log('Creating');
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(path, decode(video.base64Video), {
      contentType: 'video/quicktime',
    });
  console.log(error);
  if (error) throw new Error('Failed');

  const { data: uploadedVideo, error: uploadedVideoError } = await supabase
    .from('video')
    .insert({
      poster_id: video.posterId,
      description: video.description,
      video_key: key,
    })
    .select();

  if (uploadedVideoError) throw new Error('Failed');

  const { error: createVideoProductError } = await supabase
    .from('video_product')
    .insert(
      video.products.map((product) => ({
        video_id: uploadedVideo[0].id,
        product_id: product.id,
      }))
    );
  console.log('NO ERROR');
  if (createVideoProductError) throw new Error('Failed');
  console.log('WORKED');
  return {
    id: uploadedVideo[0].id,
    posterId: uploadedVideo[0].poster_id,
    videoUrl: supabase.storage.from('videos').getPublicUrl(key).data.publicUrl,
    description: uploadedVideo[0].description,
    products: video.products,
    createdAt: uploadedVideo[0].created_at,
    likeCount: 0,
    commentCount: 0,
    reviewCount: 0,
  };
};
