import { getVideosByUserId } from "@/services/video";
import { useQuery } from "@tanstack/react-query";

export const useGetVideosByUserId = (userId: Id) => useQuery({
  queryKey: ['videos', userId],
  queryFn: () => getVideosByUserId(userId),
  staleTime: Infinity
})