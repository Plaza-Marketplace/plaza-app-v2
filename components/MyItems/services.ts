import { supabase } from '@/utils/supabase';
import { MyItemsProduct } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getMyItemProducts = async (
  userId: Id
): Promise<MyItemsProduct[]> => {
  const { data, error } = await supabase
    .from('product')
    .select(
      `
        id,
        name,
        price,
        image_key: product_image(
          image_key
        )
      `
    )
    .order('created_at', { ascending: false })
    .eq('seller_id', userId)
    .limit(10);
  if (error) {
    throw new Error(error.message);
  }
  return data.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    thumbnailUrl:
      product.image_key.length > 0
        ? getImagePublicUrl(product.image_key[0].image_key)
        : null,
  }));
};

export const getNextMyItemsProducts = async (
  userId: Id,
  lastProductId: Id
): Promise<MyItemsProduct[]> => {
  const { data, error } = await supabase
    .from('product')
    .select(
      `
    id,
    name,
    price,
    image_key: product_image(
      image_key
    )
  `
    )
    .order('created_at', { ascending: false })
    .lt('id', lastProductId)
    .eq('seller_id', userId)
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    thumbnailUrl: product.image_key
      ? getImagePublicUrl(product.image_key[0].image_key)
      : null,
  }));
};
