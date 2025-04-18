import { supabase } from '@/utils/supabase';
import { formatProduct } from './product';
import {
  CreateOrderHistoryItem,
  OrderHistoryItem,
  OrderStatus,
  UpdateOrderHistoryItem,
} from '@/models/orderHistoryItem';
import { Tables } from '@/database.types';
import { getImagePublicUrl } from './storage';

// format data returned by supabase
const formatOrderHistoryData = (
  orderHistoryItem: Tables<'order_history_item'>,
  buyer: Pick<Tables<'user'>, 'id' | 'username' | 'profile_image_key'>,
  seller: Pick<Tables<'user'>, 'id' | 'username' | 'profile_image_key'>,
  product: Tables<'product'>,
  imageKeys: { image_key: string }[]
): OrderHistoryItem => {
  return {
    id: orderHistoryItem.id,
    buyer: {
      id: buyer.id,
      username: buyer.username,
      profileImageUrl: getImagePublicUrl(buyer.profile_image_key),
    },
    seller: {
      id: seller.id,
      username: seller.username,
      profileImageUrl: getImagePublicUrl(seller.profile_image_key),
    },
    finalPrice: orderHistoryItem.final_price,
    product: formatProduct(product, imageKeys),
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
      profile_image_key
    ),
    seller: user!seller_id(
      id,
      username,
      profile_image_key
    ),
    product: product!product_id(
      *,
      image_keys: product_image(image_key)
    )
  `;

export const getOrderHistoryItemsById = async (
  id: Id
): Promise<OrderHistoryItem> => {
  const { data, error } = await supabase
    .from('order_history_item')
    .select(queryString)
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  return formatOrderHistoryData(
    data,
    data.buyer,
    data.seller,
    data.product,
    data.product.image_keys
  );
};

// Add new order history
export const createOrderHistoryItem = async (
  item: CreateOrderHistoryItem
): Promise<OrderHistoryItem> => {
  const { data, error } = await supabase
    .from('order_history_item')
    .insert({
      buyer_id: item.userId,
      seller_id: item.sellerId,
      final_price: item.finalPrice,
      product_id: item.productId,
      shipping_address: item.shippingAddress,
    })
    .select(queryString)
    .single();

  if (error) {
    throw new Error(
      `The create order history item query for ${item.userId} failed with exception ${error}`
    );
  }

  return formatOrderHistoryData(
    data,
    data.buyer,
    data.seller,
    data.product,
    data.product.image_keys
  );
};

// Add new order history
export const createOrderHistoryItems = async (
  items: CreateOrderHistoryItem[]
): Promise<OrderHistoryItem[]> => {
  const { data, error } = await supabase
    .from('order_history_item')
    .insert(
      items.map((item) => ({
        buyer_id: item.userId,
        seller_id: item.sellerId,
        final_price: item.finalPrice,
        product_id: item.productId,
        shipping_address_id: item.shippingAddress,
      }))
    )
    .select(queryString);

  console.error(error);

  if (error) {
    console.error(error);
    throw new Error(
      `The create order history items query failed with exception ${error}`
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

export const getSalesCountBySellerId = async (
  sellerId: Id
): Promise<number> => {
  const { count, error } = await supabase
    .from('order_history_item')
    .select(
      `
        *,
        soldProduct:product!inner(
          *
        )
      `,
      { count: 'exact', head: true }
    )
    .eq('soldProduct.seller_id', sellerId);

  if (error) throw new Error(error.message);
  else if (count == null) throw new Error('Count is null');

  return count;
};

export const updateOrderHistoryItem = async (
  id: Id,
  item: UpdateOrderHistoryItem
) => {};
