import { supabase } from '@/utils/supabase';

export const addCartQuantity = async (cartItemId: Id) => {
  const { data, error } = await supabase.rpc('increment_cart_quantity', {
    item_id: cartItemId,
    increment_by: 1,
  });
  if (error) {
    console.log(error);
    throw new Error('Failed');
  }
  return;
};

export const removeCartQuantity = async (cartItemId: Id) => {
  const { data, error } = await supabase.rpc('increment_cart_quantity', {
    item_id: cartItemId,
    increment_by: -1,
  });

  if (error) {
    throw new Error('Failed');
  }
  return;
};
