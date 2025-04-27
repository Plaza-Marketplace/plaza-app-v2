import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlock } from './services';
import { LandingPage } from '@/screens/Inbox/LandingPage/models';
import { ChatScreen } from '@/screens/Chat/models';

export const useBlockUser = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['blockUser'],
    mutationFn: user
      ? async (blockedId: Id) => createBlock(user.id, blockedId)
      : async (blockedId: Id) => Promise.resolve({} as UserBlock),
    onMutate: async (blockId) => {
      queryClient.setQueryData(['blocked', user?.id, blockId], true);
      queryClient.setQueryData<LandingPage>(['inbox', user?.id], (oldData) => {
        if (!oldData) return oldData;

        const newData = {
          ...oldData,
          messages: oldData.messages.filter(
            (message) => message.userId !== blockId
          ),
        };

        return newData;
      });

      queryClient.setQueryData<ChatScreen>(
        ['chatScreen', blockId, user?.id],
        (oldData) => {
          if (!oldData) return oldData;

          const newData = {
            ...oldData,
            isBlocked: true,
          };

          return newData;
        }
      );
      queryClient.invalidateQueries({
        queryKey: ['exploreTab'],
      });
    },
  });
};
