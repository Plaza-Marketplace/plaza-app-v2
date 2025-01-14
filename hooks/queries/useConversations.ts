import { createConversationByUserIds } from "@/services/conversation"
import { useMutation } from "@tanstack/react-query"

interface CreateConversationParams {
  conversation: CreateConversation
  userIds: Id[]
}

export const useCreateConversation = () => {
  return useMutation({
    mutationFn: ({conversation, userIds}: CreateConversationParams) => createConversationByUserIds(conversation, userIds),
    onSuccess: () => {
      // update cache
    }
  })
}
