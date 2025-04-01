import { supabase } from '@/utils/supabase';
import { CommunityPost } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';
import { PostType } from '@/models/communityPost';

export const getPostsByCommunityId = async (
  communityId: Id
): Promise<CommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_post')
    .select(
      `
      id,
      title,
      description,
      post_type,
      poster: user(
        id,
        username,
        profile_image_key
      ),
      community(
        id,
        name,
        icon_key
      ),
      product(
        *,
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
    .eq('community_id', communityId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    postType: post.post_type as PostType,
    product: post.product
      ? {
          id: post.product.id,
          name: post.product.name,
          thumbnailUrl:
            post.product.image_keys.length > 0
              ? getImagePublicUrl(post.product.image_keys[0].image_key)
              : null,
          seller: {
            id: post.product.seller.id,
            username: post.product.seller.username,
            profilePictureUrl: post.product.seller.profile_image_key
              ? getImagePublicUrl(post.product.seller.profile_image_key)
              : null,
            averageRating: post.product.seller.average_rating,
          },
        }
      : null,
    poster: {
      id: post.poster.id,
      username: post.poster.username,
      profilePictureUrl: post.poster.profile_image_key
        ? getImagePublicUrl(post.poster.profile_image_key)
        : null,
    },
    community: {
      id: post.community.id,
      name: post.community.name,
      iconUrl: post.community.icon_key
        ? getImagePublicUrl(post.community.icon_key)
        : null,
    },
  }));
};
