import { supabase } from '@/utils/supabase';
import { v4 as uuidv4 } from 'uuid';
import { decode } from 'base64-arraybuffer';

export const getVideos = async (): Promise<Video[]> => {
  const { data, error } = await supabase.from('video').select('*');

  if (error) throw new Error('Failed');

  if (!data) return [];

  return data.map((video) => ({
    id: video.id,
    posterId: video.poster_id,
    videoUrl: supabase.storage
      .from('videos')
      .getPublicUrl(`private/${video.video_key}`).data.publicUrl,
    description: video.description,
    createdAt: video.created_at,
  }));
};

export const createVideo = async (video: CreateVideo): Promise<Video> => {
  const key = uuidv4();
  const path = `private/${key}`;
  console.log('Creating');
  const { data, error } = await supabase.storage
    .from('videos')
    .upload(path, decode(video.base64Video), {
      contentType: 'video/quicktime',
    });
  console.log(error);
  if (error) throw new Error('Failed');

  const { data: uploadedVideo } = await supabase
    .from('video')
    .insert({
      poster_id: video.posterId,
      description: video.description,
      video_key: key,
    })
    .select();

  if (!uploadedVideo) throw new Error('Failed');

  return {
    id: uploadedVideo[0].id,
    posterId: uploadedVideo[0].poster_id,
    videoUrl: supabase.storage.from('videos').getPublicUrl(key).data.publicUrl,
    description: uploadedVideo[0].description,
    createdAt: uploadedVideo[0].created_at,
  };
};
