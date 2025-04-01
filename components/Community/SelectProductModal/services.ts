import { supabase } from '@/utils/supabase';

export const createGroupCollectionItems = async (
  groupId: Id,
  productIds: Id[]
) => {
  const { error } = await supabase.from('community_collection_item').insert(
    productIds.map((productId) => ({
      community_id: groupId,
      product_id: productId,
    }))
  );
  console.log(error);
  if (error) {
    throw new Error(error.message);
  }
};
