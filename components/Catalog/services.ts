import { supabase } from '@/utils/supabase';
import { CatalogProduct } from './models';
import { getImagePublicUrl } from '@/services/crud/storage';

export const getCatalogProducts = async (): Promise<CatalogProduct[]> => {
  const { data, error } = await supabase
    .from('product')
    .select(
      `
        id,
        name,
        price,
        image_key: product_image(
          image_key
        ),
        seller: user(
          id,
          profile_image_key,
          username,
          average_rating
        )  
      `
    )
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    throw new Error(error.message);
  }

  return data.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    thumbnailUrl:
      product.image_key.length > 0
        ? getImagePublicUrl(product.image_key[0].image_key)
        : null,
    seller: {
      id: product.seller.id,
      username: product.seller.username,
      profileImageUrl: product.seller.profile_image_key
        ? getImagePublicUrl(product.seller.profile_image_key)
        : null,
      averageRating: product.seller.average_rating,
    },
  }));
};

export const getNextCatalogProducts = async (
  lastProductId: Id
): Promise<CatalogProduct[]> => {
  const { data, error } = await supabase
    .from('product')
    .select(
      `
    id,
    name,
    price,
    image_key: product_image(
      image_key
    ),
    seller: user(
      id,
      profile_image_key,
      username,
      average_rating
    )  
  `
    )
    .order('created_at', { ascending: false })
    .lt('id', lastProductId)
    .limit(10);
  console.log(error);
  if (error) {
    throw new Error(error.message);
  }

  return data.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    thumbnailUrl:
      product.image_key.length > 0
        ? getImagePublicUrl(product.image_key[0].image_key)
        : null,
    seller: {
      id: product.seller.id,
      username: product.seller.username,
      profileImageUrl: product.seller.profile_image_key
        ? getImagePublicUrl(product.seller.profile_image_key)
        : null,
      averageRating: product.seller.average_rating,
    },
  }));
};
