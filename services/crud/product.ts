import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer';
import { getImagePublicUrls } from './storage';
import { Tables } from '@/database.types';

const supabaseToProduct = (supabaseProduct: any): Product => {
  return {
    id: supabaseProduct.id,
    sellerId: supabaseProduct.seller_id,
    name: supabaseProduct.name,
    description: supabaseProduct.description,
    price: supabaseProduct.price,
    quantity: supabaseProduct.quantity,
    createdAt: supabaseProduct.created_at,
    images: [],
    category: '',
    condition: '',
  };
};

export const formatProduct = (
  product: Tables<'product'>,
  imageKeys: { image_key: string }[]
): Product => {
  return {
    id: product.id,
    sellerId: product.seller_id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
    createdAt: product.created_at,
    imageUrls: getImagePublicUrls(
      imageKeys.map((imageKey) => imageKey.image_key)
    ),
    category: product.category,
    condition: product.condition,
    shippingPrice: product.shipping_price,
  };
};

export const getProductsBySellerId = async (
  sellerId: Id
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('product')
    .select(
      `*, 
      image_keys: product_image(image_key)
    `
    )
    .eq('seller_id', sellerId);

  if (error) throw new Error('Failed');

  return data.map((product) => ({
    id: product.id,
    sellerId: product.seller_id,
    name: product.name,
    description: product.description,
    price: product.price,
    shippingPrice: product.shipping_price,
    quantity: product.quantity,
    createdAt: product.created_at,
    category: product.category,
    condition: product.condition,
    imageUrls: getImagePublicUrls(
      product.image_keys.map((key) => key.image_key)
    ),
  }));
};

export const createProduct = async (
  product: CreateProduct
): Promise<Product> => {
  const keys = await Promise.all(
    product.base64Images.map(async (base64Image) => {
      const key = uuidv4();
      const path = `private/${key}`;

      await supabase.storage.from('images').upload(path, decode(base64Image), {
        contentType: 'image/jpeg',
      });

      return key;
    })
  );

  const { data, error } = await supabase
    .from('product')
    .insert({
      seller_id: product.sellerId,
      name: product.name,
      description: product.description,
      category: '',
      condition: '',
      price: product.price,
      shipping_price: product.shippingPrice,
      quantity: product.quantity ?? null,
      has_variants: product.hasVariants ?? false,
    })
    .select();

  if (!data || error) throw new Error('failed');

  const result = await Promise.all(
    keys.map(
      async (key) =>
        await supabase.from('product_image').insert({
          product_id: data[0].id,
          image_key: key,
        })
    )
  );

  if (error) {
    throw new Error(
      `The create product query for ${product.name} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The create product query ${product.name} failed for unknown reasons`
    );
  }

  return {
    id: data[0].id,
    sellerId: data[0].seller_id,
    name: data[0].name,
    description: data[0].description,
    category: data[0].category,
    condition: data[0].condition,
    price: data[0].price,
    shippingPrice: data[0].shipping_price,
    imageUrls: getImagePublicUrls(keys),
    quantity: data[0].quantity,
    createdAt: data[0].created_at,
  };
};

export const testUploadArrayBuffers = async (
  arrayOfArrayBuffers: ArrayBuffer[][]
): Promise<string[][]> => {
  const keys = await Promise.all(
    arrayOfArrayBuffers.map(async (arrayBuffers) => {
      return await Promise.all(
        arrayBuffers.map(async (arrayBuffer) => {
          const key = uuidv4();
          const path = `private/${key}`;

          const { data, error } = await supabase.storage
            .from('images')
            .upload(path, arrayBuffer, {
              contentType: 'image/jpeg',
            });

          if (error) {
            console.error(error);
            throw new Error(
              `The create product image query failed with exception ${error}`
            );
          }

          return key;
        })
      );
    })
  );

  return keys;
};

export const createProducts = async (
  products: CreateProduct[]
): Promise<Product[]> => {
  const keys = await Promise.all(
    products.map(async (product) => {
      if (product.arrayBufferImages) {
        return await Promise.all(
          product.arrayBufferImages.map(async (arrayBuffer) => {
            const key = uuidv4();
            const path = `private/${key}`;

            await supabase.storage.from('images').upload(path, arrayBuffer, {
              contentType: 'image/jpeg',
            });

            return key;
          })
        );
      } else {
        return await Promise.all(
          product.base64Images.map(async (base64Image) => {
            const key = uuidv4();
            const path = `private/${key}`;

            const { data, error } = await supabase.storage
              .from('images')
              .upload(path, decode(base64Image), {
                contentType: 'image/jpeg',
              });

            if (error) {
              console.error(error);
              throw new Error(
                `The create product image query failed with exception ${error}`
              );
            }

            return key;
          })
        );
      }
    })
  );

  const { data, error } = await supabase
    .from('product')
    .insert(
      products.map((product) => {
        return {
          seller_id: product.sellerId,
          name: product.name,
          description: product.description,
          category: '',
          condition: '',
          price: product.price,
          shipping_price: product.shippingPrice,
          quantity: product.quantity ?? null,
        };
      })
    )
    .select();

  if (error) {
    console.error(error);
    throw new Error(`The create products query failed with exception ${error}`);
  } else if (!data) {
    throw new Error(`The create products query failed for unknown reasons`);
  }

  const result = await Promise.all(
    data.map(async (product, index) => {
      return await Promise.all(
        keys[index].map(async (key) => {
          const { error } = await supabase.from('product_image').insert({
            product_id: product.id,
            image_key: key,
          });

          if (error) {
            console.error(error);
            throw new Error(
              `The create product image query failed with exception ${error}`
            );
          }
        })
      );
    })
  );

  return data.map((product, index) => {
    console.log(keys[index]);
    return {
      id: product.id,
      sellerId: product.seller_id,
      name: product.name,
      description: product.description,
      category: product.category,
      condition: product.condition,
      price: product.price,
      shippingPrice: product.shipping_price,
      imageUrls: getImagePublicUrls(keys[index]),
      quantity: product.quantity,
      createdAt: product.created_at,
    };
  });
};

export const getProduct = async (id: Id): Promise<Product> => {
  const { data, error } = await supabase
    .from('product')
    .select('*')
    .eq('id', id);

  if (error) {
    throw new Error(
      `The get product query for ${id} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(`The get product query ${id} failed for unknown reasons`);
  }

  return supabaseToProduct(data[0]);
};

export const updateProduct = async (
  product: UpdateProduct,
  id: Id
): Promise<Product> => {
  const { data, error } = await supabase
    .from('product')
    .update(product)
    .eq('id', id);

  if (error) {
    throw new Error(
      `The update product query for ${id} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The update product query ${id} failed for unknown reasons`
    );
  }

  return supabaseToProduct(data[0]);
};

export const deleteProduct = async (id: Id) => {
  const { data, error } = await supabase
    .from('product')
    .delete({})
    .eq('id', id);

  if (error) {
    throw new Error(
      `The delete product query for ${id} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The delete product query ${id} failed for unknown reasons`
    );
  }

  return supabaseToProduct(data[0]);
};
