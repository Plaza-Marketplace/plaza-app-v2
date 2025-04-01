import { supabase } from '@/utils/supabase';
import { SaleScreen } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getSaleScreen = async (saleId: Id): Promise<SaleScreen> => {
  const { data, error } = await supabase
    .from('order_history_item')
    .select(
      `
      buyer: user!buyer_id(
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
      tracking_number,
      address (
        id,
        addr_line1,
        addr_line2,
        country,
        city,
        state,
        zip_code
      ),
      created_at
    `
    )
    .eq('id', saleId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    buyer: {
      id: data.buyer.id,
      username: data.buyer.username,
      profileImageUrl: data.buyer.profile_image_key
        ? getImagePublicUrl(data.buyer.profile_image_key)
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
    trackingNumber: data.tracking_number,
    createdAt: data.created_at,
  };
};

export const updateTrackingNumber = async (
  saleId: Id,
  trackingNumber: string
): Promise<void> => {
  const { error } = await supabase
    .from('order_history_item')
    .update({ tracking_number: trackingNumber })
    .eq('id', saleId);

  if (error) {
    throw new Error(error.message);
  }
};
