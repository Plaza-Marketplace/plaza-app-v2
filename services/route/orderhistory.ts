import { Tables } from '@/database.types';
import { OrderHistoryItem, OrderStatus } from '@/models/orderHistoryItem';
import { supabase } from '@/utils/supabase';
import { getImagePublicUrls } from '../crud/storage';

// format data returned by supabase
const formatOrderHistoryData = (
  orderHistoryItem: Tables<'order_history_item'>,
  buyer: Pick<Tables<'user'>, 'id' | 'username' | 'profile_image_url'>,
  seller: Pick<Tables<'user'>, 'id' | 'username' | 'profile_image_url'>,
  product: Tables<'product'>,
  imageKeys: { image_key: string }[]
): OrderHistoryItem => {
  return {
    id: orderHistoryItem.id,
    buyer: {
      id: buyer.id,
      username: buyer.username,
      profileImageUrl: buyer.profile_image_url,
    },
    seller: {
      id: seller.id,
      username: seller.username,
      profileImageUrl: seller.profile_image_url,
    },
    finalPrice: orderHistoryItem.final_price,
    product: {
      id: product.id,
      sellerId: product.seller_id,
      name: product.name,
      price: product.price,
      imageUrls: getImagePublicUrls(
        imageKeys.map((imageKey) => imageKey.image_key)
      ),
      description: product.description,
      category: product.category,
      condition: product.condition,
      createdAt: product.created_at,
      shippingPrice: product.shipping_price,
      quantity: product.quantity,
    },
    status: orderHistoryItem.status as OrderStatus,
    createdAt: orderHistoryItem.created_at,
    shippingDate: orderHistoryItem.shipping_date,
    deliveredDate: orderHistoryItem.delivered_date,
    trackingNumber: orderHistoryItem.tracking_number,
    shippingProvider: orderHistoryItem.shipping_provider,
    shippingAddress: orderHistoryItem.shipping_address,
  };
};

const queryString = `
    *, 
    buyer: user!buyer_id(
      id,
      username,
      profile_image_url
    ),
    seller: user!seller_id(
      id,
      username,
      profile_image_url
    ),
    product: product!product_id(
      *,
      image_keys: product_image(image_key)
    )
  `;

// Get purchase history
export const getPurchaseHistory = async (
  userId: Id
): Promise<OrderHistoryItem[]> => {
  const { data, error } = await supabase
    .from('order_history_item')
    .select(queryString)
    .eq('buyer_id', userId);

  if (error) {
    console.log(error);
    throw new Error(
      `The get purchases query for ${userId} failed with exception ${error}`
    );
  }

  return data.map((item) =>
    formatOrderHistoryData(
      item,
      item.buyer,
      item.seller,
      item.product,
      item.product.image_keys
    )
  );
};

// Get sales history
export const getSalesHistory = async (
  userId: Id
): Promise<OrderHistoryItem[]> => {
  const { data, error } = await supabase
    .from('order_history_item')
    .select(queryString)
    .eq('seller_id', userId);

  if (error) {
    console.log(error);
    throw new Error(
      `The get sales query for ${userId} failed with exception ${error}`
    );
  }

  return data.map((item) =>
    formatOrderHistoryData(
      item,
      item.buyer,
      item.seller,
      item.product,
      item.product.image_keys
    )
  );
};
