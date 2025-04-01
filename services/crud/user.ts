import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';

export const formatUser = (user: Tables<'user'>): User => {
  return {
    id: user.id,
    authId: user.auth_id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    email: user.email,
    description: user.description,
    profileImageUrl: user.profile_image_url,
    createdAt: user.created_at,
    stripeCustomerId: user.stripe_customer_id,
    stripeAccountId: user.stripe_account_id,
  };
};

export const getUser = async (id: Id): Promise<User> => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('User not found');

  return formatUser(data);
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

  if (error) throw new Error(error.message);

  return {
    id: data.id,
    username: data.username,
    averageRating: 0,
  };
};

export const getUserByAuthId = async (authId: UUID): Promise<User> => {
  const { data, error } = await supabase
    .from('user')
    .select(`*`)
    .eq('auth_id', authId)
    .limit(1)
    .single();

  if (error) throw new Error(error.message);

  return formatUser(data);
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
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return formatUser(data);
};

export const updateUser = async (updates: UpdateUser): Promise<User> => {
  const filteredData = Object.fromEntries(
    Object.entries(updates).filter(([_, v]) => v !== null && v !== undefined)
  );

  const { data, error } = await supabase
    .from('user')
    .update(filteredData)
    .eq('id', updates.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('User not found');

  return formatUser(data);
};
