import { UpdateUser, User } from '@/models/user';
import { supabase } from '@/utils/supabase';

export const getUser = async (id: Id): Promise<User> => {
  return await supabase.from('user').select('*').eq('id', id);
};

export const getSellerInfo = async (sellerId: Id): Promise<Seller> => {
  const { data, error } = await supabase
    .from('user')
    .select(
      `
      id,
      username
    `
    )
    .eq('id', sellerId)
    .single();

  console.log(error);

  if (error) throw new Error(error.message);

  console.log(data);

  return {
    id: data.id,
    username: data.username,
    averageRating: 0,
  };
};

export const getUserByAuthId = async (authId: UUID): Promise<User> => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('auth_id', authId)
    .limit(1)
    .single();

  if (error) throw new Error(error.message);

  return {
    id: data.id,
    authId: data.auth_id,
    firstName: data.first_name,
    lastName: data.last_name,
    username: data.username,
    email: data.email,
    description: data.description,
    profileImageUrl: data.profile_image_url,
    createdAt: data.created_at,
  };
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

  return;
};

export const updateUser = async (
  updates: UpdateUser
): Promise<User> => {
  const { data, error } = await supabase
    .from('user')
    .update({
      first_name: updates.firstName,
      last_name: updates.lastName,
      description: updates.description,
    })
    .eq('id', updates.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if(!data) throw new Error('User not found');

  return {
    id: data.id,
    authId: data.auth_id,
    firstName: data.first_name,
    lastName: data.last_name,
    username: data.username,
    email: data.email,
    description: data.description,
    profileImageUrl: data.profile_image_url,
    createdAt: data.created_at,
  };;
};
