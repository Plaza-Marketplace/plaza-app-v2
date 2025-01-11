import { supabase } from '@/utils/supabase';

const  supabaseToCommunity = (supabaseCommunity: any): Community => {
  return {
    id: supabaseCommunity.id,
    name: supabaseCommunity.name,
    description: supabaseCommunity.description,
    iconUrl: supabaseCommunity.icon_url,
    backgroundUrl: supabaseCommunity.banner_url,
    createdAt: supabaseCommunity.created_at,
  };
}

export const createCommunity = async (community: CreateCommunity): Promise<Community> => {
  const { data, error } = await supabase
    .from('community')
    .insert(community)
    .select()

  if (error) {
    throw new Error(
      `The create community query for ${community.name} failed with exception ${error}`
    );
  }
  else if (!data) {
    throw new Error(
      `The create community query ${community.name} failed for unknown reasons`
    );
  }

  return supabaseToCommunity(data);
}

export const getCommunity = async (id: Id): Promise<Community> => {
  const { data, error } = await supabase
    .from('community')
    .select('*')
    .eq('id', id)

  if (error) {
    throw new Error(
      `The get community query for ${id} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(`The get community query ${id} failed for unknown reasons`);
  }

  return supabaseToCommunity(data[0]);
}

export const getAssociatedCommunities = async (userId: Id): Promise<Community[]> => {
  const { data, error } = await supabase
    .from('community')
    .select('*')
    .returns<Community[]>();

  if (error) {
    throw new Error(
      `The get associated communities query for ${userId} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The get associated communities query ${userId} failed for unknown reasons`
    );
  }

  return data.map(supabaseToCommunity);
}

export const updateCommunity = async (
  community: Partial<UpdateCommunity>,
  id: Id
): Promise<Community> => {
  const { data, error } = await supabase
    .from('community')
    .update(community)
    .eq('id', id)
    .returns<Community>();

  if (error) {
    throw new Error(
      `The update community query for ${id} failed with exception ${error}`
    );
  } else if (!data) {
    throw new Error(
      `The update community query ${id} failed for unknown reasons`
    );
  }

  return supabaseToCommunity(data);
}

export const deleteCommunity = async (id: Id): Promise<Community> => {
  const { data, error } = await supabase
    .from('community')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(
      `The delete community query for ${id} failed with exception ${error}`
    );
  }
  else if(!data){
    throw new Error(
      `The delete community query ${id} failed for unknown reasons`
    );
  }

  return supabaseToCommunity(data);
}