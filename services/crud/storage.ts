import { supabase } from '@/utils/supabase';

export const getImagePublicUrls = (keys: UUID[]): Url[] => {
  return keys.map(getImagePublicUrl);
};

export const getImagePublicUrl = (key: UUID): Url => {
  return supabase.storage
    .from('images')
    .getPublicUrl(`private/${key}`, { transform: { quality: 20 } }).data
    .publicUrl;
};

export const getVideoPublicUrls = (keys: UUID[]): Url[] => {
  return keys.map(getVideoPublicUrl);
};

export const getVideoPublicUrl = (key: UUID): Url => {
  return supabase.storage.from('videos').getPublicUrl(`private/${key}`, {}).data
    .publicUrl;
};
