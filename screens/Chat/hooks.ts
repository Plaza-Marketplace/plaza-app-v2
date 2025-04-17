import { useAuth } from '@/contexts/AuthContext';
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createDmMessage,
  createFirstMessage,
  createMessage,
  getConversationScreen,
  getDirectMessageScreen,
  getUserInfo,
} from './services';
import { ChatScreen } from './models';

export const useGetConversationScreen = (conversationId?: Id) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['chatScreen', conversationId, user?.id],
    queryFn:
      user && conversationId
        ? () => getConversationScreen(conversationId, user.id)
        : skipToken,
    enabled: !!user && !!conversationId,
  });
};

export const useGetDirectMessageScreen = (userId?: Id) => {
  const { user: currentUser } = useAuth();

  return useQuery({
    queryKey: ['chatScreen', userId, currentUser?.id],
    queryFn:
      currentUser && userId
        ? () => getDirectMessageScreen(userId, currentUser.id)
        : skipToken,
    enabled: !!currentUser && !!userId,
  });
};

export const useSendMessage = (conversationId?: Id) => {
  const { user } = useAuth();

  return useMutation({
    mutationKey: ['sendMessage'],
    mutationFn:
      user && conversationId
        ? (content: string) => createMessage(conversationId, user.id, content)
        : () => Promise.resolve(),
  });
};

export const useSendDmMessage = (dmConversationId?: Id) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['sendDmMessage'],
    mutationFn:
      user && dmConversationId
        ? (content: string) =>
            createDmMessage(dmConversationId, user.id, content)
        : () => Promise.resolve(),
  });
};

export const useSendFirstMessage = (receiverId?: Id) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['sendFirstMessage'],
    mutationFn:
      user && receiverId
        ? (content: string) => createFirstMessage(user.id, receiverId, content)
        : undefined,
    onSuccess: (data) => {
      queryClient.setQueryData<ChatScreen>(
        ['chatScreen', receiverId, user?.id],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            id: data.id,
            messages: [
              {
                id: data.message.id,
                senderId: data.message.senderId,
                profileImageUrl: data.message.profileImageUrl,
                content: data.message.content,
                createdAt: data.message.createdAt,
              },
            ],
          };
        }
      );
    },
  });
};

export const useGetUserInfo = (userId?: Id) => {
  return useQuery({
    queryKey: ['userInfo', userId],
    queryFn: userId ? () => getUserInfo(userId) : skipToken,
  });
};
