import { supabase } from '@/utils/supabase';
import { ProductModalProduct } from './models';
import { getImagePublicUrls } from '@/services/crud/storage';

export const getProductModalProduct = async (
  id: Id
): Promise<ProductModalProduct> => {
  const { data, error } = await supabase
    .from('product')
    .select(
      `
      id,
      name,
      description,
      price,
      created_at,
      image_keys: product_image (
        image_key
      ),
      seller: user (
        id,
        username,
        average_rating,
        seller_review!seller_id(
          id,
          rating,
          description,
          created_at,
          user!reviewer_id (
            id,
            username
          )
        )
      )  
    `
    )
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    imageUrls: getImagePublicUrls(
      data.image_keys.map((imageKey) => imageKey.image_key)
    ),
    createdAt: data.created_at,
    seller: {
      id: data.seller.id,
      username: data.seller.username,
      averageRating: data.seller.average_rating,
      reviews: data.seller.seller_review.map((review) => ({
        id: review.id,
        rating: review.rating,
        description: review.description,
        createdAt: review.created_at,
        user: {
          id: review.user.id,
          username: review.user.username,
        },
      })),
    },
  };
};
