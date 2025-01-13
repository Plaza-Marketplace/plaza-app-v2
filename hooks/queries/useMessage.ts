import { getConversations, getMessages } from "@/services/message";
import { useQuery } from "@tanstack/react-query";

export const useGetMessages = (senderId: Id, recipientId: Id) => useQuery({
  queryKey: ['messages', senderId, recipientId],
  queryFn: async () => getMessages(senderId, recipientId),
  staleTime: Infinity
})

export const useGetConversations = (userId: Id) => useQuery({
  queryKey: ['conversations', userId],
  queryFn: async () => getConversations(userId),
  staleTime: Infinity
})

