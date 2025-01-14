import { CreateFollowRequest, FollowRequest } from "@/models/follow_request";
import { supabase } from "@/utils/supabase";
import { doesFollowExist } from "./follow";

const supabaseToFollowRequest = (data: any): FollowRequest => {
  return {
    id: data.id,
    sender: {
      id: data.sender.id,
      username: data.sender.username,
      firstName: data.sender.first_name,
      lastName: data.sender.last_name,
      profileImageUrl: data.sender.profile_image_url,
    },
    recipient:{
      id: data.recipient.id,
      username: data.recipient.username,
      firstName: data.recipient.first_name,
      lastName: data.recipient.last_name,
      profileImageUrl: data.recipient.profile_image_url
    },
    createdAt: data.created_at,
  };
}

export const createFollowRequest = async (request: CreateFollowRequest): Promise<FollowRequest> => {
  
  const reqExist = await doesFollowRequestExist(request.senderId, request.recipientId);
  const followExist = await doesFollowExist(request.senderId, request.recipientId);

  if (reqExist || followExist) {
    throw new Error(
      `The follow request already exists for ${request.senderId} and ${request.recipientId}`
    );
  }

  const { data, error } = await supabase
    .from('follow_request')
    .insert({
      sender_id: request.senderId,
      recipient_id: request.recipientId,
    })
    .select(`
      id,
      created_at,
      sender:user!sender_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      ),
      recipient:user!recipient_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      )
      `)
    .single();
  if (error) {
    throw new Error(
      `The create follow request query for ${request} failed with exception ${error}`
    );
  }

  return supabaseToFollowRequest(data);
  }

export const getFollowRequest = async (requestId: Id): Promise<FollowRequest> => {
  const { data, error } = await supabase
    .from('follow_request')
    .select(`
      id,
      created_at,
      sender:user!sender_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      ),
      recipient:user!recipient_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      )
      `)
    .eq('id', requestId)
    .single();

  if (error) {
    throw new Error(
      `The get follow request query for ${requestId} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The get follow request query ${requestId} failed for unknown reasons`
    );
  }

  return supabaseToFollowRequest(data);
}

export const getFollowRequestsByRecipient = async (recipientId: Id): Promise<FollowRequest[]> => {
  const { data, error } = await supabase
    .from('follow_request')
    .select(`
      id,
      created_at,
      sender:user!sender_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      ),
      recipient:user!recipient_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      )
      `)
    .eq('recipient_id', recipientId);

  if (error) {
    throw new Error(
      `The get follow requests by recipient query for ${recipientId} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The get follow requests by recipient query ${recipientId} failed for unknown reasons`
    );
  }

  return data.map(supabaseToFollowRequest);
}

export const getFollowRequestsBySender = async (senderId: Id): Promise<FollowRequest[]> => {
  const { data, error } = await supabase
    .from('follow_request')
    .select(`
      id,
      created_at,
      sender:user!sender_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      ),
      recipient:user!recipient_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      )
      `)
    .eq('sender_id', senderId);

  if (error) {
    throw new Error(
      `The get follow requests by sender query for ${senderId} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The get follow requests by sender query ${senderId} failed for unknown reasons`
    );
  }

  return data.map(supabaseToFollowRequest);
}

export const deleteFollowRequest = async (requestId: Id): Promise<FollowRequest> => {
  const { data, error } = await supabase
    .from('follow_request')
    .delete()
    .eq('id', requestId)
    .select(`
      id,
      created_at,
      sender:user!sender_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      ),
      recipient:user!recipient_id(
        id,
        username,
        first_name,
        last_name,
        profile_image_url
      )
      `)
    .single();

  if (error) {
    throw new Error(
      `The delete follow request query for ${requestId} failed with exception ${error}`
    );
  }

  return supabaseToFollowRequest(data);
}

export const doesFollowRequestExist = async (senderId: Id, recipientId: Id): Promise<boolean> => {
  const { count, error } = await supabase
    .from('follow_request')
    .select('*', { count: 'exact', head: true })
    .eq('sender_id', senderId)
    .eq('recipient_id', recipientId)
    .limit(1);

  if (count == null || error) {
    throw new Error(
      `The does follow request exist query for ${senderId} and ${recipientId} failed with exception ${error}`
    );
  }

  return count > 0;
}
