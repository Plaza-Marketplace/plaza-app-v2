import { supabase } from '@/utils/supabase';
import { ProductModalProduct } from './models';
import { getImagePublicUrl, getImagePublicUrls } from '@/services/crud/storage';

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
        profile_image_key,
        average_rating,
        seller_review!seller_id(
          id,
          rating,
          description,
          created_at,
          poster: user!reviewer_id (
            id,
            username,
            profile_image_key
          )
        )
      ),
      has_variants,
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
      ),
      product_variant_type (
        id,
        name,
        product_variant_value (
          id,
          name
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
    hasVariants: data.has_variants,
    variants: data.product_variant_type.reduce((acc, variantType) => {
      acc[variantType.name] = variantType.product_variant_value.map(
        (variantValue) => variantValue.name
      );
      return acc;
    }, {} as Record<string, string[]>),
    variantInfo: data.product_variant.map((variant) => ({
      id: variant.id,
      selectedVariants: variant.product_variant_option.reduce((acc, option) => {
        acc[option.product_variant_value.product_variant_type.name] =
          option.product_variant_value.name;
        return acc;
      }, {} as Record<string, string>),
      price: variant.price,
    })),
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
        poster: {
          id: review.poster.id,
          username: review.poster.username,
          profileImageUrl: review.poster.profile_image_key
            ? getImagePublicUrl(review.poster.profile_image_key)
            : null,
        },
      })),
    },
  };
};

export const createCartItem = async (
  productId: Id,
  userId: Id,
  quantity: Id
) => {
  const { error } = await supabase.from('cart_item').insert([
    {
      product_id: productId,
      user_id: userId,
      quantity,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
};

export const deleteProduct = async (productId: Id) => {
  const { error } = await supabase.from('product').delete().eq('id', productId);

  if (error) {
    throw new Error(error.message);
  }
};
