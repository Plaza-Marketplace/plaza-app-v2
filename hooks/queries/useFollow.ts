import { createFollow, deleteFollow, getFollowsByDest, getFollowsBySource } from "@/services/follow";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetFollowing = (userId: Id) => useQuery({
  queryKey: ["follows", userId],
  queryFn: async () => getFollowsBySource(userId),
  staleTime: Infinity
})

export const useGetFollowers = (userId: Id) => useQuery({
  queryKey: ["follows", userId],
  queryFn: async () => getFollowsByDest(userId),
  staleTime: Infinity
})

export const useCreateFollow = () => useMutation({
  mutationFn: async (follow: CreateFollow) => {
    return createFollow(follow);
  },
})

export const useDeleteFollow = () => useMutation({
  mutationFn: async (followId: Id) => {
    return deleteFollow(followId);
  },
})