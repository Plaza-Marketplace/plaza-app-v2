import { supabase } from '@/utils/supabase';
import { ActivityTab } from './models';
import { PostType } from '@/models/communityPost';

export const getActivityTab = async (userId: Id): Promise<ActivityTab> => {
  const { data: groups, error: groupsError } = await supabase
    .from('community_member')
    .select(
      `
      community(
        id,
        name,
        description,
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
      poster: user(id, username),
      community(
        id, 
        name,
        member_count: community_member(count)
      ),
      product(
        *,
        image_keys: product_image(image_key),
        seller: user(
          id,
          username
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
      iconUrl: null,
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
      },
      community: {
        id: post.community.id,
        name: post.community.name,
        memberCount: post.community.member_count[0].count,
      },
      product: post.product
        ? {
            id: post.product.id,
            name: post.product.name,
            imageUrl: post.product.image_keys[0].image_key,
            seller: {
              id: post.product.seller.id,
              username: post.product.seller.username,
            },
          }
        : null,
    })),
  };
};
