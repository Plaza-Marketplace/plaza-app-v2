import { supabase } from '@/utils/supabase';

export const deleteAccount = async () => {
  console.log('Hello from Functions!');
  const { data, error } = await supabase.functions.invoke('delete-user');

  console.log(data);

  if (error) {
    console.error('Error deleting account:', error);
    throw error;
  }

  supabase.auth.signOut();

  return data;
};
