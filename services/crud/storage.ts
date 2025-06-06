import { supabase } from '@/utils/supabase';

export const getImagePublicUrls = (keys: UUID[]): Url[] => {
  return keys.map(getImagePublicUrl);
};

export const getImagePublicUrl = (key: UUID): Url => {
  return supabase.storage.from('images').getPublicUrl(`private/${key}`).data
    .publicUrl;
};

export const getVideoPublicUrls = (keys: UUID[]): Url[] => {
  return keys.map(getVideoPublicUrl);
};

export const getVideoPublicUrl = (key: UUID): Url => {
  return supabase.storage.from('videos-mp4').getPublicUrl(`private/${key}`, {})
    .data.publicUrl;
};
