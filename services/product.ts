import { supabase } from '@/utils/supabase';

export const createProduct = async (
  product: CreateProduct
): Promise<Product> => {
  const { data, error } = await supabase
    .from('product')
    .insert({
      seller_id: product.sellerId,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    })
    .select()
    .returns<Product>();

  if (!data && error) {
    throw new Error(
      `The create product query for ${product.name} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The create product query ${product.name} failed for unknown reasons`
    );
  }

  return data;
};

export const getProduct = async (id: number): Promise<Product> => {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .eq('id', id)
    .returns<Product>();

  if (!data && error) {
    throw new Error(
      `The get product query for ${id} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(`The get product query ${id} failed for unknown reasons`);
  }

  return data;
};

export const updateProduct = async (
  product: Partial<UpdateProduct>,
  id: Id
): Promise<Product> => {
  const { data, error } = await supabase
    .from('product')
    .update(product)
    .eq('id', id)
    .returns<Product>();

  if (!data && error) {
    throw new Error(
      `The update product query for ${id} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The update product query ${id} failed for unknown reasons`
    );
  }

  return data;
};

export const deleteProduct = async (id: Id) => {
  const { data, error } = await supabase
    .from('product')
    .delete({})
    .eq('id', id);
};
