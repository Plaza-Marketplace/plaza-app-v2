import { useAuth } from '@/contexts/AuthContext';
import { skipToken, useQuery } from '@tanstack/react-query';
import { getChatScreen } from './services';

export const useGetChatScreen = (conversationId: Id) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['chatScreen', conversationId, user?.id],
    queryFn: user ? () => getChatScreen(conversationId, user.id) : skipToken,
  });
};
