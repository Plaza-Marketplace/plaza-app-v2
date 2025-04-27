import { useAuth } from '@/contexts/AuthContext';
import {
  getIsVideoLikedByUser,
  getVideosLikedByUserId,
} from '@/services/crud/videoLike';
import { skipToken, useQuery } from '@tanstack/react-query';

export const useGetVideosLikedByUserId = () => {
  const { user } = useAuth();
  const userId = user.id;
  return useQuery({
    queryKey: ['videosLikedByUserId', userId],
    queryFn: () => getVideosLikedByUserId(userId),
  });
};

export const useGetIsVideoLikedByUser = (videoId: Id, userId?: Id) => {
  return useQuery({
    queryKey: ['isVideoLikedByUser', userId, videoId],
    queryFn: userId ? () => getIsVideoLikedByUser(videoId, userId) : skipToken,
  });
};
