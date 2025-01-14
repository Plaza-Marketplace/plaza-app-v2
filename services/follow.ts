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

  const followExist = await doesFollowExist(follow.sourceId, follow.destId);

  if(followExist) {
    console.log("here")
    throw new Error(
      `The follow already exists for ${follow.sourceId} and ${follow.destId}`
    );
  }

  const { data, error } = await supabase
    .from('follow')
    .insert({
      source_id: follow.sourceId,
      dest_id: follow.destId,
    })
    .single();

  console.log(data)
  console.log(error)

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

export const getFollowingCounts = async (sourceId: Id): Promise<number> => {
  const { count, error } = await supabase
    .from('follow')
    .select('*', { count: 'exact', head: true })
    .eq('source_id', sourceId);

  if (count == null || error) {
    throw new Error(
      `The get follow count by source query for ${sourceId} failed with exception ${error}`
    );
  }

  return count;
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

export const getFollowerCounts = async (destId: Id): Promise<number> => {
  const { count, error } = await supabase
    .from('follow')
    .select('*', { count: 'exact', head: true })
    .eq('dest_id', destId);

  if (count == null || error) {
    throw new Error(
      `The get follow count by dest query for ${destId} failed with exception ${error}`
    );
  }

  return count;
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

export const doesFollowExist = async (sourceId: Id, destId: Id): Promise<boolean> => {
  const { count, error } = await supabase
    .from('follow')
    .select("*", { count: 'exact', head: true })
    .eq('source_id', sourceId)
    .eq('dest_id', destId)
    .limit(1);

  if (error || count == null) {
    throw new Error(
      `The does follow exist query for ${sourceId} and ${destId} failed with exception ${error}`
    );
  }

  return count > 0;
}