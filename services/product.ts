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
      category: product.category,
      condition: product.condition,
      price: product.price,
      shipping_price: product.shippingPrice,
      quantity: product.quantity ?? null,
    })
    .select();

  console.log(data, error);
  if (!data && error) {
    throw new Error(
      `The create product query for ${product.name} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The create product query ${product.name} failed for unknown reasons`
    );
  }

  console.log(data);

  return {
    id: data[0].id,
    sellerId: data[0].seller_id,
    name: data[0].name,
    description: data[0].description,
    category: data[0].category,
    condition: data[0].condition,
    price: data[0].price,
    shippingPrice: data[0].shipping_price,
    createdAt: data[0].created_at,
    quantity: data[0].quantity,
    images: [],
  };
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
  product: UpdateProduct,
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
