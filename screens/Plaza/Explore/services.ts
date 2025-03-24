import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';
import { ExploreGroup, ExploreTab } from './models';

const COMMUNITY_QUERY = `
  *,
  member_count: community_member(
    count
  ),
  is_member: community_member!inner(count)
`;

const formatExploreGroup = (
  group: Tables<'community'>,
  isMember: boolean,
  memberCount: number
) => ({
  id: group.id,
  name: group.name,
  description: group.description,
  member_count: memberCount,
  is_member: isMember,
});

export const searchGroups = async (
  searchTerm: string
): Promise<ExploreGroup[]> => {
  const { data, error } = await supabase
    .from('community')
    .select(COMMUNITY_QUERY)
    .textSearch('name', searchTerm)
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((group) =>
    formatExploreGroup(
      group,
      group.is_member[0].count === 1,
      group.member_count[0].count
    )
  );
};

export const getExploreTab = async (userId: Id): Promise<ExploreTab> => {
  const { data: mostPopularGroups, error: mostPopularGroupsError } =
    await supabase
      .from('community')
      .select(
        `
        id,
        name,
        description,
        banner_url,
        member_count: community_member(count)
      `
      )
      .order('community_member_count', { ascending: false })
      .limit(5);

  if (mostPopularGroupsError) {
    throw new Error(mostPopularGroupsError.message);
  }

  const { data: featuredGroups, error: featuredGroupsError } = await supabase
    .from('featured_community')
    .select(
      `
        community(
          id,
          name,
          description,
          is_member: community_member!inner(count)
        )
      `
    )
    .eq('community.is_member.user_id', userId);

  if (featuredGroupsError) {
    throw new Error(featuredGroupsError.message);
  }

  return {
    mostPopularGroups: mostPopularGroups.map((group) => ({
      id: group.id,

      name: group.name,

      description: group.description,

      bannerUrl: group.banner_url,
    })),
    featuredGroups: featuredGroups.map((group) => ({
      id: group.community.id,

      name: group.community.name,

      description: group.community.description,

      isMember: group.community.is_member[0].count === 1,
    })),
  };
};
