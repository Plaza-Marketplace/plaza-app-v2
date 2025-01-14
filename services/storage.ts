import { supabase } from '@/utils/supabase';

export const getImagePublicUrls = (keys: UUID[]): Url[] => {
  return keys.map(
    (key) =>
      supabase.storage.from('images').getPublicUrl(`private/${key}`).data
        .publicUrl
  );
};

export const getImagePublicUrl = (key: UUID): Url => {
  return supabase.storage.from('images').getPublicUrl(`private/${key}`).data
    .publicUrl;
};
