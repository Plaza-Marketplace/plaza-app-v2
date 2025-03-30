import { supabase } from '@/utils/supabase';
import { CollectionProduct } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getCollectionProducts = async (
  communityId: Id
): Promise<CollectionProduct[]> => {
  const { data, error } = await supabase
    .from('community_collection_item')
    .select(
      `
        product (
          id,
          name,
          price,
          image_keys: product_image (
            image_key
          ),
          seller: user (
            id,
            username,
            average_rating,
            profile_image_key
          )
        )
      `
    )
    .eq('community_id', communityId);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((item) => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    thumbnailUrl:
      item.product.image_keys.length > 0
        ? getImagePublicUrl(item.product.image_keys[0].image_key)
        : null,
    seller: {
      id: item.product.seller.id,
      username: item.product.seller.username,
      profilePictureUrl: item.product.seller.profile_image_key
        ? getImagePublicUrl(item.product.seller.profile_image_key)
        : null,
      averageRating: item.product.seller.average_rating,
    },
  }));
};
