import { createFollow, deleteFollow, doesFollowExist, getFollowsByDest, getFollowsBySource } from "@/services/follow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFollowing = (userId: Id) => useQuery({
  queryKey: ["following", userId],
  queryFn: async () => getFollowsBySource(userId),
  staleTime: Infinity
})

export const useGetFollowers = (userId: Id) => useQuery({
  queryKey: ["follower", userId],
  queryFn: async () => getFollowsByDest(userId),
  staleTime: Infinity
})

export const useDoesFollowExist = (sourceId: Id, destId: Id) => useQuery({
  queryKey: ["follow-exist", sourceId, destId],
  queryFn: async () => doesFollowExist(sourceId, destId),
  staleTime: Infinity
})

export const useCreateFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (follow: CreateFollow) => {
      return createFollow(follow);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["follower", data.sourceId],
        (oldData: Follow[] | undefined) => {
          return oldData ? [data, ...oldData] : [data]
        }
      )
    }
  })
}

export const useDeleteFollow = () => useMutation({
  mutationFn: async (followId: Id) => {
    return deleteFollow(followId);
  },
})

