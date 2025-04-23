import { useAuth } from '@/contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlock } from './services';

export const useBlockUser = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['blockUser'],
    mutationFn: user
      ? async (blockedId: Id) => createBlock(user.id, blockedId)
      : async (blockedId: Id) => Promise.resolve({} as UserBlock),
    onMutate: async (blockId) => {
      console.log(blockId);
      console.log(user?.id);
      queryClient.setQueryData(['blocked', user?.id, blockId], true);
    },
  });
};
