import { supabase } from '@/utils/supabase';
import { Pin } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getEventPin = async (id: Id): Promise<Pin> => {
  const { data, error } = await supabase
    .from('event_pin')
    .select(
      `
    id,
    name,
    event_product (
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
    )
  `
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    name: data.name,
    products: data.event_product.map((product) => ({
      id: product.product.id,
      name: product.product.name,
      price: product.product.price ?? NaN,
      thumbnailUrl:
        product.product.image_keys.length > 0
          ? getImagePublicUrl(product.product.image_keys[0].image_key)
          : null,
      seller: {
        id: product.product.seller.id,
        username: product.product.seller.username,
        averageRating: product.product.seller.average_rating,
        profileImageUrl: product.product.seller.profile_image_key
          ? getImagePublicUrl(product.product.seller.profile_image_key)
          : null,
      },
    })),
  };
};
