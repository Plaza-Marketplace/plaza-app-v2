import { supabase } from '@/utils/supabase';
import { getImagePublicUrls } from '../storage';

export const getCartItemsByUserId = async (userId: Id): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from('cart_item')
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

  if (error) throw new Error('Failed');

  return data.map((item) => {
    const imageUrls = getImagePublicUrls(
      item.product.image_keys.map((key) => key.image_key)
    );

    return {
      id: item.id,
      userId: item.user_id,
      product: {
        id: item.product.id,
        sellerId: item.product.seller_id,
        name: item.product.name,
        description: item.product.description,
        price: item.product.price,
        shippingPrice: item.product.shipping_price,
        quantity: item.product.quantity,
        createdAt: item.product.created_at,
        imageUrls,
        category: item.product.category,
        condition: item.product.condition,
      },
      quantity: item.quantity,
      createdAt: item.created_at,
    };
  });
};

export const createCartItem = async (
  cartItem: CreateCartItem
): Promise<CartItem> => {
  const { data, error } = await supabase
    .from('cart_item')
    .insert({
      user_id: cartItem.userId,
      product_id: cartItem.productId,
      quantity: cartItem.quantity,
    })
    .select(`
      *,
      product(
        *
      )
    `)
    .single();

  if (error) throw new Error('Failed');
  if(!data) throw new Error('Failed');

  return {
    id: data.id,
    userId: data.user_id,
    product: {
      id: data.product.id,
      sellerId: data.product.seller_id,
      name: data.product.name,
      description: data.product.description,
      price: data.product.price,
      shippingPrice: data.product.shipping_price,
      quantity: data.product.quantity,
      createdAt: data.product.created_at,
      imageUrls: [],
      category: data.product.category,
      condition: data.product.condition,
    },
    quantity: data.quantity,
    createdAt: data.created_at,
  };
};
