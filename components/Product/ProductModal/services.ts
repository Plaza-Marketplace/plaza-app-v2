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
      *,
      image_keys: product_image (
        image_key
      ),
      seller: user (
        id,
        username,
        display_name,
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
      displayName: data.seller.display_name,
      averageRating: data.seller.average_rating,
      profilePictureUrl: data.seller.profile_image_key
        ? getImagePublicUrl(data.seller.profile_image_key)
        : null,
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
  quantity: Id,
  variantId?: Id | null
) => {
  let existingCount = 0;
  if (variantId) {
    const { count, error: countError } = await supabase
      .from('cart_item')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('variant_id', variantId);

    if (countError) {
      throw new Error(countError.message);
    }
    existingCount = count || 0;
  } else {
    const { count, error: countError } = await supabase
      .from('cart_item')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .is('variant_id', null);

    if (countError) {
      throw new Error(countError.message);
    }
    existingCount = count || 0;
  }

  if (existingCount > 0 && variantId) {
    const { error: updateError } = await supabase
      .from('cart_item')
      .update({ quantity: existingCount + quantity })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('variant_id', variantId ?? null);
    if (updateError) {
      throw new Error(updateError.message);
    }
    return;
  }
  if (existingCount > 0 && !variantId) {
    const { error: updateError } = await supabase
      .from('cart_item')
      .update({ quantity: existingCount + quantity })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .is('variant_id', null);
    if (updateError) {
      throw new Error(updateError.message);
    }
    return;
  }

  const { error } = await supabase.from('cart_item').insert([
    {
      product_id: productId,
      variant_id: variantId ?? null,
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
