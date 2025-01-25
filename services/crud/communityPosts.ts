import { Tables } from '@/database.types';
import {
  ChatterCommunityPost,
  CommunityPost,
  CreateCommunityPost,
  PostType,
  UpdateCommunityPost,
} from '@/models/communityPost';
import { supabase } from '@/utils/supabase';
import { getImagePublicUrls } from './storage';

const query = `
    *, 
    poster: user(
      id,
      username
    ),
    community(
      id,
      name
    ),
    product(
      *,
      image_keys: product_image(
        image_key
      ),
      seller: user(
        id,
        username,
        seller_review!seller_id(
          id,
          rating,
          description,
          created_at
        )
      ),
      product_review(
        id,
        rating,
        description,
        created_at
      )
    )
  `;

const supabaseToCommunityPost = (data: any): CommunityPost => {
  return {
    id: data.id,
    communityId: data.community_id,
    posterId: data.poster_id,
    title: data.title,
    description: data.description,
    postType: data.post_type,
    productId: data.product_id,
    imageUrl: data.image_url,
    productReviewId: data.product_review_id,
    sellerReviewId: data.seller_review_id,
    createdAt: data.created_at,
  };
};

const formatCommunityPost = (
  communityPost: Tables<'community_post'>,
  poster: Pick<Tables<'user'>, 'id' | 'username'>,
  community: Pick<Tables<'community'>, 'id' | 'name'>,
  product?: Tables<'product'>,
  productImageKeys?: UUID[],
  seller?: Pick<Tables<'user'>, 'id' | 'username'>,
  productReview?: Pick<
    Tables<'product_review'>,
    'id' | 'rating' | 'description' | 'created_at'
  >,
  sellerReview?: Pick<
    Tables<'seller_review'>,
    'id' | 'rating' | 'description' | 'created_at'
  >
): ChatterCommunityPost => {
  return {
    id: communityPost.id,
    community: {
      id: community.id,
      name: community.name,
    },
    poster: {
      id: poster.id,
      username: poster.username,
    },
    title: communityPost.title,
    description: communityPost.description,
    postType: communityPost.post_type as PostType,
    product: product
      ? {
          id: product.id,
          name: product.name,
          imageUrls: productImageKeys
            ? getImagePublicUrls(productImageKeys)
            : [],
          price: product.price,
          seller: seller
            ? {
                id: seller.id,
                username: seller.username,
              }
            : null,
          description: product.description,
          category: product.category,
          condition: product.condition,
          shippingPrice: product.shipping_price,
          quantity: product.quantity,
          createdAt: product.created_at,
        }
      : null,
    createdAt: communityPost.created_at,
    productReview: productReview
      ? {
          id: productReview.id,
          rating: productReview.rating,
          description: productReview.description,
          createdAt: productReview.created_at,
        }
      : null,
    sellerReview: sellerReview
      ? {
          id: sellerReview.id,
          rating: sellerReview.rating,
          description: sellerReview.description,
          createdAt: sellerReview.created_at,
        }
      : null,
  };
};

export const createCommunityPost = async (
  post: CreateCommunityPost
): Promise<CommunityPost> => {
  const { data, error } = await supabase
    .from('community_post')
    .insert({
      community_id: post.communityId,
      poster_id: post.posterId,
      title: post.title,
      description: post.description,
      post_type: post.postType,
      product_id: post.productId,
      image_url: post.imageUrl,
      product_review_id: post.productReviewId,
      seller_review_id: post.sellerReviewId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(
      `The create community post query for ${post} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The create community post query ${post} failed for unknown reasons`
    );
  }

  return supabaseToCommunityPost(data);
};

export const getCommunityPost = async (
  postId: Id
): Promise<ChatterCommunityPost> => {
  const { data, error } = await supabase
    .from('community_post')
    .select(
      `
    *, 
    poster: user(
      id,
      username
    ),
    community(
      id,
      name
    ),
    product(
      *,
      image_keys: product_image(
        image_key
      ),
      seller: user(
        id,
        username,
        seller_review!seller_id(
          id,
          rating,
          description,
          created_at
        )
      ),
      product_review(
        id,
        rating,
        description,
        created_at
      )
    )
  `
    )
    .eq('id', postId)
    .limit(1)
    .single();

  if (error) {
    throw new Error(
      `The get community post query for ${postId} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The get community post query ${postId} failed for unknown reasons`
    );
  }

  return formatCommunityPost(
    data,
    data.poster,
    data.community,
    data.product ?? undefined,
    data.product?.image_keys.map((key) => key.image_key),
    data.product?.seller,
    data.product?.product_review[0],
    data.product?.seller.seller_review[0]
  );
};

export const getChatterPosts = async (): Promise<ChatterCommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_post')
    .select(query)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);

  return data.map((post) =>
    formatCommunityPost(
      post,
      post.poster,
      post.community,
      post.product ?? undefined,
      post.product?.image_keys.map((key) => key.image_key),
      post.product?.seller,
      post.product?.product_review[0],
      post.product?.seller.seller_review[0]
    )
  );
};

export const getChatterPostsByCommunity = async (
  communityId: Id
): Promise<ChatterCommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_post')
    .select(query)
    .eq('community_id', communityId);

  if (error) throw new Error(error.message);

  return data.map((post) =>
    formatCommunityPost(
      post,
      post.poster,
      post.community,
      post.product ?? undefined,
      post.product?.image_keys.map((key) => key.image_key),
      post.product?.seller,
      post.product?.product_review[0],
      post.product?.seller.seller_review[0]
    )
  );
};

export const getCommunityPostsByCommunity = async (
  communityId: Id
): Promise<CommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_post')
    .select()
    .eq('community_id', communityId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(
      `The get community posts by community query for ${communityId} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The get community posts by community query ${communityId} failed for unknown reasons`
    );
  }

  return data.map(supabaseToCommunityPost);
};

export const updateCommunityPost = async (
  postId: Id,
  post: UpdateCommunityPost
): Promise<CommunityPost> => {
  const { data, error } = await supabase
    .from('community_post')
    .update({
      title: post.title,
      description: post.description,
      product_id: post.productId,
      image_url: post.imageUrl,
      product_review_id: post.productReviewId,
      seller_review_id: post.sellerReviewId,
    })
    .eq('id', postId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `The update community post query for ${postId} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The update community post query ${postId} failed for unknown reasons`
    );
  }

  return supabaseToCommunityPost(data);
};

export const deleteCommunityPost = async (
  postId: Id
): Promise<CommunityPost> => {
  const { data, error } = await supabase
    .from('community_post')
    .delete()
    .eq('id', postId)
    .single();

  if (error) {
    throw new Error(
      `The delete community post query for ${postId} failed with exception ${error}`
    );
  }

  return supabaseToCommunityPost(data);
};
