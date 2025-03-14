import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';

const COMMUNITY_QUERY = `
  *,
  member_count: community_member(
    count
  ),
  is_member: community_member!inner(count)
`;

const formatCommunityPage = (
  community: Tables<'community'>,
  memberCount: number,
  isMember: boolean
): CommunityPage => {
  return {
    id: community.id,
    name: community.name,
    description: community.description,
    memberCount,
    isMember,
    createdAt: community.created_at,
    iconUrl: community.icon_url,
    bannerUrl: community.banner_url,
  };
};

export const getCommunityPage = async (id: Id): Promise<CommunityPage> => {
  const { data, error } = await supabase
    .from('community')
    .select(COMMUNITY_QUERY)
    .eq('id', id)
    .single();
  console.log(data);
  if (error) throw new Error(error.message);

  return formatCommunityPage(
    data,
    data.member_count[0].count,
    data.is_member[0].count === 1
  );
};
