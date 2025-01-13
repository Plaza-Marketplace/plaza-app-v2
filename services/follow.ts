import { supabase } from "@/utils/supabase";

const supabaseToFollow = (data: any): Follow => {
  return {
    id: data.id,
    sourceId: data.source_id,
    destId: data.dest_id,
    createdAt: data.created_at,
  };
}

export const createFollow = async (follow: CreateFollow): Promise<Follow> => {
  const { data, error } = await supabase
    .from('follow')
    .insert({
      source_id: follow.sourceId,
      dest_id: follow.destId,
    })
    .single();

  if (error) {
    throw new Error(
      `The create follow query for ${follow} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The create follow query ${follow} failed for unknown reasons`
    );
  }

  return supabaseToFollow(data);
}

export const getFollow = async (followId: Id): Promise<Follow> => {
  const { data, error } = await supabase
    .from('follow')
    .select()
    .eq('id', followId)
    .single();

  if (error) {
    throw new Error(
      `The get follow query for ${followId} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The get follow query ${followId} failed for unknown reasons`
    );
  }

  return supabaseToFollow(data);
}

export const getFollowsBySource = async (sourceId: Id): Promise<Follow[]> => {
  const { data, error } = await supabase
    .from('follow')
    .select()
    .eq('source_id', sourceId);

  if (error) {
    throw new Error(
      `The get follows by source query for ${sourceId} failed with exception ${error}`
    );
  }

  return data.map(supabaseToFollow);
}

export const getFollowsByDest = async (destId: Id): Promise<Follow[]> => {
  const { data, error } = await supabase
    .from('follow')
    .select()
    .eq('dest_id', destId);

  if (error) {
    throw new Error(
      `The get follows by dest query for ${destId} failed with exception ${error}`
    );
  }

  return data.map(supabaseToFollow);
}

export const deleteFollow = async (followId: Id): Promise<Follow> => {
  const { data, error } = await supabase
    .from('follow')
    .delete()
    .eq('id', followId)
    .select()
    .single();

  if (error) {
    throw new Error(
      `The delete follow query for ${followId} failed with exception ${error}`
    );
  }

  return supabaseToFollow(data);
}