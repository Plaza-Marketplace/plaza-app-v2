import { getImagePublicUrl } from '@/services/crud/storage';
import { supabase } from '@/utils/supabase';
import { Group } from './models';
import { PostType } from '@/models/communityPost';

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

export const getProductThumbnailUrl = async (
  productId: Id
): Promise<Url | null> => {
  const { data, error } = await supabase
    .from('product_image')
    .select('image_key')
    .eq('product_id', productId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.image_key ? getImagePublicUrl(data.image_key) : null;
};

export const createGroupPost = async (
  groupId: Id,
  userId: Id,
  title: string,
  description: string,
  productId: Id | null
) => {
  const { error } = await supabase.from('community_post').insert({
    community_id: groupId,
    poster_id: userId,
    post_type: productId ? PostType.SHOWCASE : PostType.POST,
    title,
    description,
    product_id: productId,
  });

  if (error) {
    throw new Error(error.message);
  }
};
