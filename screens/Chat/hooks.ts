import { useAuth } from '@/contexts/AuthContext';
import { skipToken, useMutation, useQuery } from '@tanstack/react-query';
import { createMessage, getChatScreen } from './services';

export const useGetChatScreen = (conversationId: Id) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['chatScreen', conversationId, user?.id],
    queryFn: user ? () => getChatScreen(conversationId, user.id) : skipToken,
  });
};

export const useSendMessage = (conversationId: Id) => {
  const { user } = useAuth();

  return useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: user
      ? (content: string) => createMessage(conversationId, user.id, content)
      : undefined,
  });
};
