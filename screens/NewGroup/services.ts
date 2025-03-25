import { supabase } from '@/utils/supabase';
import { CreateGroup } from './models';

export const createGroup = async (group: CreateGroup) => {
  const { data, error } = await supabase
    .from('community')
    .insert({
      name: group.name,
      description: group.description ?? '',
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id;
};
