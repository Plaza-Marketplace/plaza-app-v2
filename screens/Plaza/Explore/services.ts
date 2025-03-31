import { supabase } from '@/utils/supabase';
import { ExploreTab, SearchGroup } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const searchGroups = async (
  searchTerm: string
): Promise<SearchGroup[]> => {
  searchTerm = searchTerm.trim().replace(/ /g, '+');

  const { data, error } = await supabase
    .from('community')
    .select(
      `
      id,
      name,
      icon_key
    `
    )
    .textSearch('name', `${searchTerm}`)
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((group) => ({
    id: group.id,
    name: group.name,
    iconUrl: group.icon_key ? getImagePublicUrl(group.icon_key) : null,
  }));
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
        banner_key
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
          icon_key,
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

      bannerUrl: group.banner_key ? getImagePublicUrl(group.banner_key) : null,
    })),
    featuredGroups: featuredGroups.map((group) => ({
      id: group.community.id,

      name: group.community.name,

      description: group.community.description,

      iconUrl: group.community.icon_key
        ? getImagePublicUrl(group.community.icon_key)
        : null,

      isMember: group.community.is_member[0].count === 1,
    })),
  };
};
