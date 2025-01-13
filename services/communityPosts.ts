import { CommunityPost, CreateCommunityPost, UpdateCommunityPost } from "@/models/communityPost";
import { supabase } from "@/utils/supabase";

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
}

export const createCommunityPost = async (post: CreateCommunityPost): Promise<CommunityPost> => {
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
    .single()

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
}

export const getCommunityPost = async (postId: Id): Promise<CommunityPost> => {
  const { data, error } = await supabase
    .from('community_post')
    .select()
    .eq('id', postId)
    .single()

  if (error) {
    throw new Error(
      `The get community post query for ${postId} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The get community post query ${postId} failed for unknown reasons`
    );
  }

  return supabaseToCommunityPost(data);
}

export const getCommunityPostsByCommunity = async (communityId: Id): Promise<CommunityPost[]> => {
  const { data, error } = await supabase
    .from('community_post')
    .select()
    .eq('community_id', communityId)
    .order('created_at', { ascending: false })

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
}

export const updateCommunityPost = async (postId: Id, post: UpdateCommunityPost): Promise<CommunityPost> => {
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
    .single()

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
}

export const deleteCommunityPost = async (postId: Id): Promise<CommunityPost> => {
  const { data, error } = await supabase
    .from('community_post')
    .delete()
    .eq('id', postId)
    .single()

  if (error) {
    throw new Error(
      `The delete community post query for ${postId} failed with exception ${error}`
    );
  }

  return supabaseToCommunityPost(data);
}