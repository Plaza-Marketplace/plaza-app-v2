import { getAssociatedCommunities } from "@/services/communities"
import { useQuery } from "@tanstack/react-query"

const useGetAssociatedCommunities = (userId: Id) => useQuery({
  queryKey: ['associated-communities', userId],
  queryFn: () => getAssociatedCommunities(userId),
  staleTime: Infinity
})

export default useGetAssociatedCommunities