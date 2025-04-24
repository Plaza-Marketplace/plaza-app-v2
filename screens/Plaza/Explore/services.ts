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
  const { data: featuredGroups, error: featuredGroupsError } = await supabase
    .from('featured_community')
    .select(
      `
        community(
          id,
          name,
          description,
          banner_key
        )
      `
    )
    .limit(5);

  if (featuredGroupsError) {
    console.error('Error fetching featured groups:', featuredGroupsError);
    throw new Error(featuredGroupsError.message);
  }

  const { data: allGroups, error: allGroupsError } = await supabase
    .from('community')
    .select(
      `
        id,
        name,
        description,
        icon_key,
        is_member: community_member!inner(count)
      `
    );

  if (allGroupsError) {
    console.error('Error fetching all groups:', allGroupsError);
    throw new Error(allGroupsError.message);
  }

  console.log('Featured Groups:', featuredGroups);
  console.log('All Groups:', allGroups);

  return {
    featuredGroups: featuredGroups.map((group) => ({
      id: group.community.id,

      name: group.community.name,

      description: group.community.description,

      bannerUrl: group.community.banner_key
        ? getImagePublicUrl(group.community.banner_key)
        : null,
    })),
    allGroups: allGroups.map((group) => ({
      id: group.id,

      name: group.name,

      description: group.description,

      iconUrl: group.icon_key ? getImagePublicUrl(group.icon_key) : null,

      isMember: group.is_member[0].count === 1,
    })),
  };
};
