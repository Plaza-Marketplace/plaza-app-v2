import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { createBlock } from './services';

export const useBlockUser = (blockedId: Id) => {
  const { user } = useAuth();

  return useMutation({
    mutationKey: ['blockUser'],
    mutationFn: user
      ? () => createBlock(user.id, blockedId)
      : () => Promise.resolve(),
  });
};
