import { supabase } from '@/utils/supabase';
import { getImagePublicUrl } from '../crud/storage';

export const getCommunityPage = async (
  id: Id,
  userId: Id
): Promise<CommunityPage> => {
  const { data, error } = await supabase
    .from('community')
    .select(
      `
        *,
        member_count: community_member(
          count
        ),
        is_member: community_member!inner(count),
        event(
          id,
          name,
          city,
          state,
          icon_key
        )
      `
    )
    .eq('id', id)
    .eq('is_member.user_id', userId)
    .lte('event.start_date', new Date().toISOString())
    .gte('event.end_date', new Date().toISOString())
    .single();

  if (error) throw new Error(error.message);

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    memberCount: data.member_count[0].count,
    isMember: data.is_member[0].count > 0,
    createdAt: data.created_at,
    iconUrl: data.icon_key ? getImagePublicUrl(data.icon_key) : null,
    bannerUrl: data.banner_key ? getImagePublicUrl(data.banner_key) : null,
    ongoingEvent:
      data.event.length > 0
        ? {
            id: data.event[0].id,
            name: data.event[0].name,
            city: data.event[0].city,
            state: data.event[0].state,
            iconUrl: data.event[0].icon_key
              ? getImagePublicUrl(data.event[0].icon_key)
              : null,
          }
        : null,
  };
};
