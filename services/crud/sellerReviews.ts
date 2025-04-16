import {
  CreateSellerReview,
  SellerReview,
  UpdateSellerReview,
} from '@/models/review';
import { supabase } from '@/utils/supabase';
import { getImagePublicUrl } from './storage';

const supabaseToSellerReview = (data: any): SellerReview => {
  return {
    id: data.id,
    seller: {
      id: data.seller.id,
      username: data.seller.username,
      profileImageUrl: getImagePublicUrl(data.seller.profile_image_key),
    },
    reviewer: {
      id: data.reviewer.id,
      username: data.reviewer.username,
      profileImageUrl: getImagePublicUrl(data.reviewer.profile_image_key),
    },
    rating: data.rating,
    description: data.description,
    createdAt: data.created_at,
  };
};

export const createSellerReview = async (
  review: CreateSellerReview
): Promise<SellerReview> => {
  const { data, error } = await supabase
    .from('seller_review')
    .insert({
      seller_id: review.sellerId,
      reviewer_id: review.reviewerId,
      rating: review.rating,
      description: review.description,
    })
    .select(
      `
      *,
      seller:user!seller_id(
        id,
        username,
        profile_image_key
      ),
      reviewer:user!reviewer_id(
        id,
        username,
        profile_image_key
      )
      `
    )
    .single();

  if (error) throw new Error('Failed');

  if (!data) throw new Error('Failed');

  return supabaseToSellerReview(data);
};

export const getSellerReviewsBySellerId = async (
  sellerId: Id
): Promise<SellerReview[]> => {
  const { data, error } = await supabase
    .from('seller_review')
    .select(
      `
      *,
      seller:user!seller_id(
        id,
        username,
        profile_image_key
      ),
      reviewer:user!reviewer_id(
        id,
        username,
        profile_image_key
      )
    `
    )
    .eq('seller_id', sellerId);

  console.log(error);
  console.log(data);
  if (error) throw new Error('Failed');

  if (!data) return [];

  return data.map(supabaseToSellerReview);
};

export const updateSellerReview = async (
  sellerId: Id,
  review: UpdateSellerReview
): Promise<SellerReview> => {
  const { data, error } = await supabase
    .from('seller_review')
    .update({
      rating: review.rating,
      description: review.description,
    })
    .eq('id', sellerId)
    .select(
      `
      *,
      seller:user!seller_id(
        id,
        username,
        profile_image_key
      ),
      reviewer:user!reviewer_id(
        id,
        username,
        profile_image_key
      )
    `
    )
    .single();

  if (error) throw new Error('Failed');

  if (!data) throw new Error('Failed');

  return supabaseToSellerReview(data);
};

export const deleteSellerReview = async (
  reviewId: Id
): Promise<SellerReview> => {
  const { data, error } = await supabase
    .from('seller_review')
    .delete()
    .eq('id', reviewId)
    .select(
      `
      *,
      seller:user!seller_id(
        id,
        username,
        profile_image_key
      ),
      reviewer:user!reviewer_id(
        id,
        username,
        profile_image_key
      )
    `
    )
    .single();

  if (error) throw new Error('Failed');

  if (!data) throw new Error('Failed');

  return supabaseToSellerReview(data);
};
