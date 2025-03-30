import { supabase } from '@/utils/supabase';
import { Video } from './models';
import { getVideoPublicUrl } from '@/services/crud/storage';

export const getVideosByUserId = async (userId: Id): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('video')
    .select(
      `
      id,
      video_key  
    `
    )
    .eq('poster_id', userId);

  if (error) throw new Error('Failed');

  return data.map((video) => ({
    id: video.id,
    videoUrl: getVideoPublicUrl(video.video_key),
  }));
};
