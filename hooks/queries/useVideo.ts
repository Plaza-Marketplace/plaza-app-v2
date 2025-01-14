import { getVideoById, getVideosByUserId } from "@/services/video";
import { useQuery } from "@tanstack/react-query";

export const useGetVideosByUserId = (userId: Id) => useQuery({
  queryKey: ['videos', userId],
  queryFn: () => getVideosByUserId(userId),
  staleTime: Infinity
})

export const useGetVideoById = (videoId: Id) => useQuery({
  queryKey: ['video-id', videoId],
  queryFn: () => getVideoById(videoId),
  staleTime: Infinity
})