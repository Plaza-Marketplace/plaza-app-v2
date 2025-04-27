import { supabase } from '@/utils/supabase';
import { Header } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getHeader = async (
  userId: Id,
  currentUserId: Id
): Promise<Header> => {
  const { data, error } = await supabase
    .from('user')
    .select(
      `
        username,
        display_name,
        description,
        profile_image_key,
        average_rating,
        sales_count: order_history_item!seller_id(count),
        followers: follow!dest_id(count),
        following: follow!source_id(count),
        is_following: follow!dest_id!inner(count),
        dm_conversation1: dm_conversation!user1_id(id),
        dm_conversation2: dm_conversation!user2_id(id)
      `
    )
    .eq('id', userId)
    .eq('is_following.source_id', currentUserId)
    .eq('is_following.dest_id', userId)
    .eq('dm_conversation1.user2_id', currentUserId)
    .eq('dm_conversation2.user1_id', currentUserId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    username: data.username,
    displayName: data.display_name,
    description: data.description,
    profileImageUrl: data.profile_image_key
      ? getImagePublicUrl(data.profile_image_key)
      : null,
    averageRating: data.average_rating,
    salesCount: data.sales_count[0].count,
    followerCount: data.followers[0].count,
    followingCount: data.following[0].count,
    isFollowing: data.is_following[0].count > 0,
    dmConversationId:
      data.dm_conversation1.length > 0
        ? data.dm_conversation1[0].id
        : data.dm_conversation2.length > 0
        ? data.dm_conversation2[0].id
        : null,
  };
};

export const getIsBlocked = async (
  userId: Id,
  targetUserId: Id
): Promise<boolean> => {
  const { count, error } = await supabase
    .from('block')
    .select('*', { count: 'exact', head: true })
    .eq('blocker_id', userId)
    .eq('blocked_id', targetUserId);

  if (error) {
    throw new Error(error.message);
  }
  if (count == null) {
    throw new Error("Count returned null, this shouldn't happen");
  }
  return count > 0;
};

export const deleteBlock = async (userId: Id, blockedId: Id) => {
  console.log(userId, blockedId);
  const { error } = await supabase
    .from('block')
    .delete()
    .eq('blocker_id', userId)
    .eq('blocked_id', blockedId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const createFollow = async (userId: Id, currentUserId: Id) => {
  const { error } = await supabase.from('follow').insert({
    source_id: currentUserId,
    dest_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteFollow = async (userId: Id, currentUserId: Id) => {
  const { error } = await supabase
    .from('follow')
    .delete()
    .eq('source_id', currentUserId)
    .eq('dest_id', userId);

  if (error) {
    throw new Error(error.message);
  }
};
