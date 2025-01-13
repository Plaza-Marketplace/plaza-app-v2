import { supabase } from "@/utils/supabase";

const supabaseToFollowRequest = (data: any): FollowRequest => {
  return {
    id: data.id,
    senderId: data.sender_id,
    recipientId: data.recipient_id,
    createdAt: data.created_at,
  };
}

export const createFollowRequest = async (request: CreateFollowRequest): Promise<FollowRequest> => {
  const { data, error } = await supabase
    .from('follow_request')
    .insert({
      sender_id: request.senderId,
      recipient_id: request.recipientId,
    })
    .select()
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
    .select()
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
    .select()
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
    .select()
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

export const deleeteFollowRequest = async (requestId: Id): Promise<FollowRequest> => {
  const { data, error } = await supabase
    .from('follow_request')
    .delete()
    .eq('id', requestId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `The delete follow request query for ${requestId} failed with exception ${error}`
    );
  }

  return supabaseToFollowRequest(data);
}