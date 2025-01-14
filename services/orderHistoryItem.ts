import { supabase } from '@/utils/supabase';
import { formatProduct } from './product';

export const getOrderHistoryItemsByUserId = async (
  userId: Id
): Promise<OrderHistoryItem[]> => {
  const { data, error } = await supabase
    .from('order_history_item')
    .select(
      `
        *,
        product(
          *,
          image_keys: product_image(
            image_key
          )
        )
      `
    )
    .eq('user_id', userId);

  if (error) throw new Error(error.message);

  return data.map((item) => ({
    id: item.id,
    userId: item.user_id,
    status: item.status as OrderStatus,
    product: formatProduct(item.product, item.product.image_keys),
    createdAt: item.created_at,
  }));
};
