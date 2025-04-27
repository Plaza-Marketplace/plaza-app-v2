import { supabase } from '@/utils/supabase';
import { YourSalesScreen } from './models';
import { OrderStatus } from '@/models/orderHistoryItem';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getYourSalesScreen = async (
  userId: Id
): Promise<YourSalesScreen> => {
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
    .eq('seller_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  const pendingSales = data.filter(
    (order) => order.status !== OrderStatus.DELIVERED
  );
  const completedSales = data.filter(
    (order) => order.status === OrderStatus.DELIVERED
  );

  return {
    pendingSales: pendingSales.map((order) => ({
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
    completedSales: completedSales.map((order) => ({
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
