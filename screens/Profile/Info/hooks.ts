import { useAuth } from '@/contexts/AuthContext';
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createFollow,
  deleteBlock,
  deleteFollow,
  getHeader,
  getIsBlocked,
} from './services';
import { Header } from './models';

export const useGetHeader = (userId: Id) => {
  const { user: currentUser } = useAuth();

  return useQuery({
    queryKey: ['profileHeader', userId],
    queryFn: currentUser ? () => getHeader(userId, currentUser.id) : skipToken,
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetBlocked = (userId: Id) => {
  const { user: currentUser } = useAuth();
  return useQuery({
    queryKey: ['blocked', currentUser?.id, userId],
    queryFn: currentUser
      ? () => getIsBlocked(currentUser.id, userId)
      : skipToken,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUnblockUser = () => {
  const { user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['unblockUser'],
    mutationFn: currentUser
      ? (blockedId: Id) => deleteBlock(currentUser.id, blockedId)
      : undefined,
    onMutate: (blockedId: Id) => {
      queryClient.setQueryData(['blocked', currentUser?.id, blockedId], false);
    },
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  return useMutation({
    mutationKey: ['followUser'],
    mutationFn: currentUser
      ? (userId: Id) => createFollow(userId, currentUser.id)
      : undefined,
    onMutate: (userId: Id) => {
      queryClient.setQueryData<Header>(['profileHeader', userId], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          isFollowing: true,
          followerCount: oldData.followerCount + 1,
        };
      });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();
  const { user: currentUser } = useAuth();

  return useMutation({
    mutationKey: ['unfollowUser'],
    mutationFn: currentUser
      ? (userId: Id) => deleteFollow(userId, currentUser.id)
      : undefined,
    onMutate: (userId: Id) => {
      queryClient.setQueryData<Header>(['profileHeader', userId], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          isFollowing: false,
          followerCount: oldData.followerCount - 1,
        };
      });
    },
  });
};
