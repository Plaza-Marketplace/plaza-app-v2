import { createFollow, deleteFollow, doesFollowExist, getFollowerCounts, getFollowingCounts, getFollowsByDest, getFollowsBySource } from "@/services/follow";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFollowing = (userId: Id) => useQuery({
  queryKey: ["following", userId],
  queryFn: async () => getFollowsBySource(userId),
  staleTime: Infinity
})

export const useGetFollowingCount = (userId: Id) => useQuery({
  queryKey: ["following-count", userId],
  queryFn: async () => getFollowingCounts(userId),
  staleTime: Infinity
})

export const useGetFollowers = (userId: Id) => useQuery({
  queryKey: ["follower", userId],
  queryFn: async () => getFollowsByDest(userId),
  staleTime: Infinity
})

export const useGetFollowerCount = (userId: Id) => useQuery({
  queryKey: ["follower-count", userId],
  queryFn: async () => getFollowerCounts(userId),
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
      queryClient.setQueryData(
        ["follow-exist", data.sourceId, data.destId],
        true
      )
    }
  })
}

export const useDeleteFollow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (follow: CreateFollow) => {
      return deleteFollow(follow);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["follower", data.sourceId],
        (oldData: Follow[] | undefined) => {
          return oldData ? oldData.filter(follow => follow.destId !== data.destId) : []
        }
      )
      queryClient.setQueryData(
        ["follow-exist", data.sourceId, data.destId],
        false
      )
    }
  })
}

