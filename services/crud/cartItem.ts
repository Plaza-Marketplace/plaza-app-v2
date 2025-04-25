import { supabase } from '@/utils/supabase';
import { getImagePublicUrls } from './storage';

const CART_QUERY = `
  *,
  product(
    *,
    image_keys: product_image(
      image_key
    )
  ),
  product_variant (
    id,
    price,
    product_variant_option (
      id,
      product_variant_value (
        id,
        name,
        product_variant_type (
          id,
          name
        )
      )
    )
  )
`;

export const getCartItemsByUserId = async (userId: Id): Promise<CartItem[]> => {
  const { data, error } = await supabase
    .from('cart_item')
    .select(CART_QUERY)
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
      variant: item.product_variant
        ? {
            id: item.product_variant.id,
            price: item.product_variant.price,
            options: item.product_variant.product_variant_option.map(
              (option) => ({
                id: option.id,
                value: {
                  id: option.product_variant_value.id,
                  name: option.product_variant_value.name,
                  type: {
                    id: option.product_variant_value.product_variant_type.id,
                    name: option.product_variant_value.product_variant_type
                      .name,
                  },
                },
              })
            ),
          }
        : null,
      quantity: item.quantity,
      createdAt: item.created_at,
    };
  });
};

export type PriceBreakdown = {
  subtotal: number;
  shipping: number;
  stripeProcessingFee: number;
  total: number;
};

export const calculatePriceBreakdown = (
  cartItems: CartItem[]
): PriceBreakdown => {
  let subtotal = 0;
  let shipping = 0;

  cartItems.forEach((item) => {
    if (item.variant) {
      subtotal += item.variant.price * item.quantity;
      shipping += item.product.shippingPrice;
    } else {
      subtotal += item.product.price ?? 0 * item.quantity;
      shipping += item.product.shippingPrice;
    }
  });

  const stripeProcessingFee =
    cartItems?.length === 0
      ? 0
      : Math.ceil((subtotal * 0.029 + 0.3) * 100) / 100;

  return {
    subtotal,
    shipping,
    stripeProcessingFee,
    total: subtotal + shipping + stripeProcessingFee,
  };
};

export const createCartItem = async (
  cartItem: CreateCartItem
): Promise<CartItem> => {
  const { data, error } = await supabase
    .from('cart_item')
    .insert({
      user_id: cartItem.userId,
      product_id: cartItem.productId,
      quantity: cartItem.quantity || 1,
    })
    .select(CART_QUERY)
    .single();

  if (error) throw new Error('Failed');
  if (!data) throw new Error('Failed');

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

export const deleteCartItem = async (cartItemId: Id): Promise<CartItem> => {
  const { data, error } = await supabase
    .from('cart_item')
    .delete()
    .eq('id', cartItemId)
    .select(CART_QUERY)
    .single();

  if (error) throw new Error('Failed');
  if (!data) throw new Error('Failed');

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
