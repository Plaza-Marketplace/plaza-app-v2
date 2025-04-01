import { supabase } from '@/utils/supabase';
import { OrderScreen } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getOrderScreen = async (orderId: Id): Promise<OrderScreen> => {
  const { data, error } = await supabase
    .from('order_history_item')
    .select(
      `
    seller: user!seller_id(
      id,
      username,
      profile_image_key
    ),
    product (
      id,
      name,
      image_key: product_image(
        image_key
      )
    ),
    final_price,
    address (
      id,
      addr_line1,
      addr_line2,
      country,
      city,
      state,
      zip_code
    )
  `
    )
    .eq('id', orderId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    seller: {
      id: data.seller.id,
      username: data.seller.username,
      profileImageUrl: data.seller.profile_image_key
        ? getImagePublicUrl(data.seller.profile_image_key)
        : null,
    },
    product: {
      id: data.product.id,
      name: data.product.name,
      finalPrice: data.final_price,
      thumbnailUrl:
        data.product.image_key.length > 0
          ? getImagePublicUrl(data.product.image_key[0].image_key)
          : null,
    },
    address: {
      id: data.address.id,
      addressLine1: data.address.addr_line1,
      addressLine2: data.address.addr_line2,
      country: data.address.country,
      city: data.address.city,
      state: data.address.state,
      zipCode: data.address.zip_code,
    },
  };
};
