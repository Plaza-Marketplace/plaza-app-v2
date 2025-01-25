import { CreateFollowRequest, FollowRequest } from "@/models/followRequest";
import { createFollowRequest, getFollowRequestsByRecipient, getFollowRequestsBySender, deleteFollowRequest, doesFollowRequestExist, deleteFollowRequestBySenderAndRecipient } from "@/services/crud/followRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useDoesFollowRequestExist = (senderId: Id, recipientId: Id) => useQuery({
  queryKey: ["follow-request-exist", senderId, recipientId],
  queryFn: async () => doesFollowRequestExist(senderId, recipientId),
  staleTime: Infinity
})

export const useCreateFollowRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (followRequest: CreateFollowRequest) => {
      return createFollowRequest(followRequest);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["follow-request-recipient", data.recipient.id],
        (oldData: FollowRequest[] | undefined) => {
          return oldData ? [...oldData, data] : [data]
        }
      )
      queryClient.setQueryData(
        ["follow-request-exist", data.sender.id, data.recipient.id],
        true
      )
    }
  })
}

export const useDeleteFollowRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (requestId: Id) => {
      return deleteFollowRequest(requestId);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["follow-request-recipient", data.recipient.id],
        (oldData: FollowRequest[] | undefined) => {
          return oldData ? oldData.filter(request => request.id !== data.id) : []
        }
      )
      queryClient.setQueryData(
        ["follow-request-exist", data.sender.id, data.recipient.id],
        false
      )
    }
})}

export const useDeleteFollowRequestByRelation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (relation: CreateFollowRequest) => {
      return deleteFollowRequestBySenderAndRecipient(relation);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["follow-request-recipient", data.recipient.id],
        (oldData: FollowRequest[] | undefined) => {
          return oldData ? oldData.filter(request => request.id !== data.id) : []
        }
      )
      queryClient.setQueryData(
        ["follow-request-exist", data.sender.id, data.recipient.id],
        false
      )
    }
  })
}