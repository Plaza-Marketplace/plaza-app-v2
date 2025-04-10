import { supabase } from '@/utils/supabase';

export const checkUsernameUnique = async (username: string) => {
  const { data, error } = await supabase
    .from('user')
    .select('username')
    .eq('username', username);

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data && data.length === 0;
};
