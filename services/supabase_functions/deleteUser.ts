import { supabase } from '@/utils/supabase';

export const deleteAccount = async () => {
  const { data, error } = await supabase.functions.invoke('delete-user');

  if (error) {
    console.error('Error deleting account:', error);
    throw error;
  }

  supabase.auth.signOut();

  return data;
};
