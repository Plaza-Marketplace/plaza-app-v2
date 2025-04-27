import { supabase } from '@/utils/supabase';
import { ProfileProduct } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getProductsBySellerId = async (
  id: Id
): Promise<ProfileProduct[]> => {
  const { data, error } = await supabase
    .from('product')
    .select(
      `
      id,
      name,
      price,
      image_keys: product_image(
        image_key
      )
    `
    )
    .eq('seller_id', id);

  if (error) throw new Error(error.message);

  return data.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    thumbnailUrl:
      product.image_keys.length > 0
        ? getImagePublicUrl(product.image_keys[0].image_key)
        : null,
  }));
};
