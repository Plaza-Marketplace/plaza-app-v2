import { getProfileHeaderData } from "@/services/route/profile";
import { useQuery } from "@tanstack/react-query";

export const useGetProfileData = (userId: Id, currUserId: Id) => useQuery({
  queryKey: ['profile', userId],
  queryFn: () => getProfileHeaderData(userId, currUserId),
  staleTime: Infinity
})