import User from '@/models/user';
import { supabase } from '@/utils/supabase';

export const getUser = async (id: Id) => {
  return await supabase.from('user').select('*').eq('id', id);
};

export const createUser = async (
  user: Omit<User, 'id' | 'createdAt'>
): Promise<User> => {
  const { data, error } = await supabase
    .from('user')
    .insert({
      first_name: user.firstName,
      last_name: user.lastName,
      username: user.username,
      email: user.email,
      description: user.description,
      profile_image_url: user.profileImageUrl,
    })
    .select();

  console.log(data, error);
  return;
};
