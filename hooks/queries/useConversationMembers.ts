import { createConversationMember, deleteConversationMember, getConversationMembersByConversationId, getConversationMembersByUserId } from "@/services/conversationMember";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetConversationMembers = (conversationId: Id) => useQuery({
  queryKey: ['conversationMembers', conversationId],
  queryFn: () => getConversationMembersByConversationId(conversationId),
  enabled: !!conversationId,
})

export const useCreateConversationMember = () => {
  return useMutation({
    mutationFn: createConversationMember,
    onSuccess: () => {
      // update cache
    }
  })
}

export const useDeleteConversationMember = () => {
  return useMutation({
    mutationFn: deleteConversationMember,
    onSuccess: () => {
      // update cache
    }
  })
}

export const useGetConversationMembersByUserId = (userId: Id) => useQuery({
  queryKey: ['conversationMembersByUserId', userId],
  queryFn: () => getConversationMembersByUserId(userId),
  enabled: !!userId,
})