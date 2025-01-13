import { createCommunity, getAssociatedCommunities, getCommunity } from "@/services/communities"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAssociatedCommunities = (userId: Id) => useQuery({
  queryKey: ['associated-communities', userId],
  queryFn: () => getAssociatedCommunities(userId),
  staleTime: Infinity
})

export const useGetCommunityById = (communityId: Id) => useQuery({
  queryKey: ['get-community', communityId],
  queryFn: () => getCommunity(communityId),
  staleTime: Infinity
})

export const useCreateCommunity = () => useMutation({
  mutationKey: ['createCommunity'],
  mutationFn: (community: CreateCommunity) => createCommunity(community),
})
