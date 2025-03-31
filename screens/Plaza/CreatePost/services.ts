import { getImagePublicUrl } from '@/services/crud/storage';
import { supabase } from '@/utils/supabase';
import { Group } from './models';

export const getGroupInfo = async (groupId: Id): Promise<Group> => {
  const { data, error } = await supabase
    .from('community')
    .select(
      `
      id,
      name,
      icon_key
    `
    )
    .eq('id', groupId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    name: data.name,
    iconUrl: data.icon_key ? getImagePublicUrl(data.icon_key) : null,
  };
};
