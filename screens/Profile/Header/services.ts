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
        description,
        profile_image_key,
        average_rating,
        sales_count: order_history_item!seller_id(count),
        followers: follow!dest_id(count),
        following: follow!source_id(count),
        is_following: follow!dest_id!inner(count)
      `
    )
    .eq('id', userId)
    .eq('is_following.source_id', currentUserId)
    .eq('is_following.dest_id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    username: data.username,
    description: data.description,
    profileImageUrl: data.profile_image_key
      ? getImagePublicUrl(data.profile_image_key)
      : null,
    averageRating: data.average_rating,
    salesCount: data.sales_count[0].count,
    followerCount: data.followers[0].count,
    followingCount: data.following[0].count,
    isFollowing: data.is_following[0].count > 0,
  };
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
