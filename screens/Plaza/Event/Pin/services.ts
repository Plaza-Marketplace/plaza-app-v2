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
        event_seller (
          booth_name,
          user (
            id,
            username,
            display_name,
            profile_image_key,
            event_product (
              product (
                id, 
                name,
                price,
                image_keys: product_image (
                  image_key
                )
              )
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
    sellers: data.event_seller.map((seller) => ({
      id: seller.user.id,
      boothName: seller.booth_name,
      username: seller.user.username,
      displayName: seller.user.display_name,
      profileImageUrl: seller.user.profile_image_key
        ? getImagePublicUrl(seller.user.profile_image_key)
        : null,
      products: seller.user.event_product.map((product) => ({
        id: product.product.id,
        name: product.product.name,
        price: product.product.price,
        thumbnailUrl:
          product.product.image_keys?.length > 0
            ? getImagePublicUrl(product.product.image_keys[0].image_key)
            : null,
      })),
    })),
  };
};
