import { formatProduct } from '@/services/crud/product';
import { supabase } from '@/utils/supabase';

export const getProductById = async (id: Id): Promise<Product> => {
  const { data, error } = await supabase
    .from('product')
    .select('*, image_keys: product_image(image_key)')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return formatProduct(data, data.image_keys);
};
