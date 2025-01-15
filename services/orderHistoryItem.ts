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

export const createOrderHistoryItems = async (
  userId: Id,
  productIds: Id[]
): Promise<void> => {
  console.log('HELLO?');
  const { data, error } = await supabase
    .from('order_history_item')
    .insert(
      productIds.map((productId) => ({
        user_id: userId,
        product_id: productId,
      }))
    )
    .select();

  console.log(error);
  if (error) throw new Error(error.message);

  return;
};

export const getSalesCountBySellerId = async (sellerId: Id): Promise<number> => {
  const { count, error } = await supabase
    .from('order_history_item')
    .select(`
        *,
        soldProduct:product!product_id(
          *
        )
      `, { 'count': 'exact', head: true })
    .eq('soldProduct.seller_id', sellerId);

  if (error) throw new Error(error.message);
  else if (count == null) throw new Error('Count is null');

  return count;
}