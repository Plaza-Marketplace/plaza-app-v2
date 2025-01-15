import { Tables } from '@/database.types';
import { supabase } from '@/utils/supabase';
import { formatUser } from './user';

const formatComment = (
  comment: Tables<'video_comment'>,
  poster: Tables<'user'>
): VideoComment => {
  return {
    id: comment.id,
    videoId: comment.video_id,
    poster: formatUser(poster),
    description: comment.description,
    createdAt: comment.created_at,
  };
};

export const getCommentsByVideoId = async (
  videoId: Id
): Promise<VideoComment[]> => {
  const { data, error } = await supabase
    .from('video_comment')
    .select(`*, poster: user(*)`)
    .eq('video_id', videoId);

  if (error) throw new Error(error.message);

  return data.map((comment) => formatComment(comment, comment.poster));
};

export const createComment = async (
  videoComment: CreateVideoComment
): Promise<void> => {
  const { data, error } = await supabase
    .from('video_comment')
    .insert({
      video_id: videoComment.videoId,
      poster_id: videoComment.posterId,
      description: videoComment.description,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
};
