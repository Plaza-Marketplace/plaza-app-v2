import { supabase } from '@/utils/supabase';
import { Group } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getGroups = async (
  userId: Id,
  productId: Id
): Promise<Group[]> => {
  const { data, error } = await supabase
    .from('community_member')
    .select(
      `
    community (
      id,
      name,
      icon_key,
      is_in_community: community_collection_item!inner(
        count
      )
    )
  `
    )
    .eq('user_id', userId)
    .eq('community.community_collection_item.product_id', productId);

  if (error) throw new Error(error.message);

  return data.map((group) => ({
    id: group.community.id,
    name: group.community.name,
    iconUrl: group.community.icon_key
      ? getImagePublicUrl(group.community.icon_key)
      : null,
    isInCollection: group.community.is_in_community[0].count > 0,
  }));
};

export const createGroupCollectionItem = async (groupId: Id, productId: Id) => {
  const { error } = await supabase.from('community_collection_item').insert({
    community_id: groupId,
    product_id: productId,
  });

  if (error) throw new Error(error.message);
};
