import { getIsVideoLikedByUser, getVideosLikedByUserId } from "@/services/videoLike";
import { useQuery } from "@tanstack/react-query";

export const useGetVideosLikedByUserId = (userId: Id) => {
  return useQuery({
    queryKey: ['videosLikedByUserId', userId],
    queryFn: () => getVideosLikedByUserId(userId),
    staleTime: Infinity
  });
}

export const useGetIsVideoLikedByUser = (userId: Id, videoId: Id) => {
  return useQuery({
    queryKey: ['isVideoLikedByUser', userId, videoId],
    queryFn: () => {
      console.log("huh")
      return getIsVideoLikedByUser(videoId, userId)
    },
    staleTime: Infinity
  });
}