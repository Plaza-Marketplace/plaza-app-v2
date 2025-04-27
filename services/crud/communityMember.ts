import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';

export const formatCommunityMember = (
  communityMember: Tables<'community_member'>
): CommunityMember => {
  return {
    id: communityMember.id,
    userId: communityMember.user_id,
    communityId: communityMember.community_id,
    createdAt: communityMember.created_at,
    role: communityMember.member_role as CommunityMemberRole,
  };
};

export const createCommunityMember = async (
  communityMember: CreateCommunityMember
): Promise<CommunityMember> => {
  const { data, error } = await supabase
    .from('community_member')
    .insert({
      user_id: communityMember.userId,
      community_id: communityMember.communityId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(
      `The create community member query failed with exception ${error}`
    );
  }

  return formatCommunityMember(data);
};

export const deleteCommunityMember = async (
  communityMember: DeleteCommunityMember
) => {
  const { error } = await supabase
    .from('community_member')
    .delete()
    .eq('user_id', communityMember.userId)
    .eq('community_id', communityMember.communityId);

  if (error) {
    throw new Error(
      `The delete community member query failed with exception ${error}`
    );
  }
};
