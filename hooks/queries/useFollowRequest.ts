import { createFollowRequest, getFollowRequestsByRecipient, getFollowRequestsBySender, deleeteFollowRequest } from "@/services/follow_request";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetFollowRequestsByRecipient = (userId: Id) => useQuery({
  queryKey: ["follow-request-recipient", userId],
  queryFn: async () => getFollowRequestsByRecipient(userId),
  staleTime: Infinity
})

export const useGetFollowRequestsBySender = (userId: Id) => useQuery({
  queryKey: ["follow-request-sender", userId],
  queryFn: async () => getFollowRequestsBySender(userId),
  staleTime: Infinity
});

export const useCreateFollowRequest = () => useMutation({
  mutationFn: async (followRequest: CreateFollowRequest) => {
    return createFollowRequest(followRequest);
  },
})

export const useDeleteFollowRequest = () => useMutation({
  mutationFn: async (requestId: Id) => {
    return deleeteFollowRequest(requestId);
  },
})