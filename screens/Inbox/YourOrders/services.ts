import { supabase } from '@/utils/supabase';
import { YourOrdersScreen } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';
import { OrderStatus } from '@/models/orderHistoryItem';

export const getYourOrdersScreen = async (
  userId: Id
): Promise<YourOrdersScreen> => {
  const { data, error } = await supabase
    .from('order_history_item')
    .select(
      `
        id,
        product (
          id,
          name,
          image_keys: product_image(
            image_key
          )
        ),
        status,
        final_price,
        created_at
      `
    )
    .eq('buyer_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  const pendingOrders = data.filter(
    (order) => order.status !== OrderStatus.DELIVERED
  );
  const completedOrders = data.filter(
    (order) => order.status === OrderStatus.DELIVERED
  );

  return {
    pendingOrders: pendingOrders.map((order) => ({
      id: order.id,
      product: {
        id: order.product.id,
        name: order.product.name,
        thumbnailUrl:
          order.product.image_keys.length > 0
            ? getImagePublicUrl(order.product.image_keys[0].image_key)
            : null,
        finalPrice: order.final_price,
      },
      status: order.status as OrderStatus,
      createdAt: order.created_at,
    })),
    completedOrders: completedOrders.map((order) => ({
      id: order.id,
      product: {
        id: order.product.id,
        name: order.product.name,
        thumbnailUrl:
          order.product.image_keys.length > 0
            ? getImagePublicUrl(order.product.image_keys[0].image_key)
            : null,
        finalPrice: order.final_price,
      },
      status: order.status as OrderStatus,
      createdAt: order.created_at,
    })),
  };
};
