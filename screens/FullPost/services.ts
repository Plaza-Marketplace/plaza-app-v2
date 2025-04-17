import { supabase } from '@/utils/supabase';
import { FullPost } from './models';
import { PostType } from '@/models/communityPost';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getFullPost = async (id: Id): Promise<FullPost> => {
  const { data, error } = await supabase
    .from('community_post')
    .select(
      `
      id,
      title,
      description,
      post_type,
      created_at,
      poster: user(
        id,
        username,
        profile_image_key
      ),
      community (
        id,
        name,
        icon_key
      ),
      product (
        id,
        name,
        image_keys: product_image(
          image_key
        ),
        seller: user(
          id,
          username,
          profile_image_key,
          average_rating
        )
      )
    `
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    postType: data.post_type as PostType,
    createdAt: data.created_at,
    poster: {
      id: data.poster.id,
      username: data.poster.username,
      profilePictureUrl: data.poster.profile_image_key
        ? getImagePublicUrl(data.poster.profile_image_key)
        : null,
    },
    community: {
      id: data.community.id,
      name: data.community.name,
      iconUrl: data.community.icon_key
        ? getImagePublicUrl(data.community.icon_key)
        : null,
    },
    product: data.product
      ? {
          id: data.product.id,
          name: data.product.name,
          thumbnailUrl:
            data.product.image_keys.length > 0
              ? getImagePublicUrl(data.product.image_keys[0].image_key)
              : null,
          seller: {
            id: data.product.seller.id,
            username: data.product.seller.username,
            profilePictureUrl: data.product.seller.profile_image_key
              ? getImagePublicUrl(data.product.seller.profile_image_key)
              : null,
            averageRating: data.product.seller.average_rating,
          },
        }
      : null,
  };
};
