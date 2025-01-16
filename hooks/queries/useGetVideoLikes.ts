import {
  getIsVideoLikedByUser,
  getVideosLikedByUserId,
} from '@/services/videoLike';
import { skipToken, useQuery } from '@tanstack/react-query';

export const useGetVideosLikedByUserId = (userId: Id) => {
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
