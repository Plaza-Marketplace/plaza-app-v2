import { supabase } from '@/utils/supabase';
import { ActivityTab } from './models';
import { PostType } from '@/models/communityPost';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getActivityTab = async (userId: Id): Promise<ActivityTab> => {
  const { data: groups, error: groupsError } = await supabase
    .from('community_member')
    .select(
      `
      community(
        id,
        name,
        description,
        icon_key,
        member_count: community_member(count)
      )  
    `
    )
    .eq('user_id', userId);

  if (groupsError) {
    throw new Error(groupsError.message);
  }

  const { data: posts, error: postsError } = await supabase
    .from('community_post')
    .select(
      `
      *,
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
        image_keys: product_image(image_key),
        seller: user(
          id,
          username,
          profile_image_key,
          average_rating
        )
      )
    `
    )
    .in(
      'community_id',
      groups.map((group) => group.community.id)
    )
    .order('created_at', { ascending: false })
    .limit(10);

  if (postsError) {
    throw new Error(postsError.message);
  }

  return {
    yourGroups: groups.map((group) => ({
      id: group.community.id,
      name: group.community.name,
      memberCount: group.community.member_count[0].count,
      iconUrl: group.community.icon_key
        ? getImagePublicUrl(group.community.icon_key)
        : null,
    })),
    groupPostings: posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      postType: post.post_type as PostType,
      createdAt: post.created_at,
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
    })),
  };
};
