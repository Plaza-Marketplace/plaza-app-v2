import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';

export const anonymousLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
  router.replace('/onboarding/welcome');
  return true;
};
