import { getCommunity } from "@/services/communities"
import { useQuery } from "@tanstack/react-query"

const useGetCommunityById = (communityId: Id) => useQuery({
  queryKey: ['get-community', communityId],
  queryFn: () => getCommunity(communityId),
  staleTime: Infinity
})

export default useGetCommunityById