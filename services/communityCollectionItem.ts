import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';
import { getImagePublicUrls } from './storage';

export const formatCommunityCollectionItem = (
  communityCollectionItem: Tables<'community_collection_item'>,
  product: Pick<Tables<'product'>, 'id' | 'name'>,
  productImageKeys: UUID[]
): CommunityCollectionItem => {
  return {
    id: communityCollectionItem.id,
    communityId: communityCollectionItem.community_id,
    product: {
      id: product.id,
      name: product.name,
      imageUrls: getImagePublicUrls(productImageKeys),
    },
    description: communityCollectionItem.description,
    createdAt: communityCollectionItem.created_at,
  };
};

export const getCommunityCollectionItemsByCommunityId = async (
  communityId: Id
) => {
  const { data, error } = await supabase
    .from('community_collection_item')
    .select(
      `
      *, 
      product(
        id,
        name,
        imageKeys: product_image(image_key)
      )
    `
    )
    .eq('community_id', communityId);

  if (error) throw new Error(error.message);

  return data.map((item) =>
    formatCommunityCollectionItem(
      item,
      item.product,
      item.product.imageKeys.map((key) => key.image_key)
    )
  );
};

export const createCommunityCollectionItem = async (
  communityCollectionItem: CreateCommunityCollectionItem
): Promise<CommunityCollectionItem> => {
  const { data, error } = await supabase.from('community_collection_item').insert({
    community_id: communityCollectionItem.communityId,
    product_id: communityCollectionItem.productId,
    description: communityCollectionItem.description,
  }).select(`
      *, 
      product(
        id,
        name,
        imageKeys: product_image(image_key)
      )
    `);

  if (error || !data) throw new Error(error.message);

  return formatCommunityCollectionItem(
    data[0],
    data[0].product,
    data[0].product.imageKeys.map((key) => key.image_key)
  );
};
