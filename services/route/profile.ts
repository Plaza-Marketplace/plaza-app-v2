import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';

type ProfileHeaderData = {
  user: User;
  followerCount: number;
  followingCount: number;
  isTryingToFollow: boolean;
  isFollow: boolean;
  salesCount: number;
};

const formatProfileHeaderData = (
  profileUser: Tables<'user'>,
  followerCount: number,
  followingCount: number,
  isTryingToFollow: boolean,
  isFollow: boolean,
  salesCount: number
): ProfileHeaderData => {
  return {
    user: {
      id: profileUser.id,
      firstName: profileUser.first_name,
      lastName: profileUser.last_name,
      profileImageUrl: profileUser.profile_image_url,
      authId: profileUser.auth_id,
      email: profileUser.email,
      username: profileUser.username,
      description: profileUser.description,
      createdAt: profileUser.created_at,
    },
    followerCount,
    followingCount,
    isTryingToFollow,
    isFollow,
    salesCount,
  };
};

export const getProfileHeaderData = async (
  profileUserId: Id,
  currentUserId: Id
): Promise<ProfileHeaderData> => {
  const { data, error } = await supabase
    .from('user')
    .select(
      `
    *,
    followers: follow!source_id(
      count
    ),
    following: follow!dest_id(
      count
    ),
    isTryingToFollow: follow_request!recipient_id!inner(count),
    isFollow: follow!source_id!inner(count),
    sales: product!seller_id(
      order_history_item (
        count
        
      )
    )
    `
    )
    .eq('id', profileUserId)
    .eq('isTryingToFollow.sender_id', currentUserId)
    .eq('isTryingToFollow.recipient_id', profileUserId)
    .eq('isFollow.source_id', currentUserId)
    .eq('isFollow.dest_id', profileUserId)
    .single();

  if (error) {
    console.log(error);
    throw new Error(
      `The get profile header data query for ${profileUserId} failed with exception ${error}`
    );
  }

  return formatProfileHeaderData(
    data,
    data.followers[0].count,
    data.following[0].count,
    data.isTryingToFollow[0].count > 0,
    data.isFollow[0].count > 0,
    data.sales.reduce((acc, curr) => acc + curr.order_history_item[0].count, 0)
  );
};
