import { useAuth } from '@/contexts/AuthContext';
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createFollow, deleteFollow, getHeader } from './services';
import { Header } from './models';

export const useGetHeader = (userId: Id) => {
  const { user: currentUser } = useAuth();

  return useQuery({
    queryKey: ['profileHeader', userId],
    queryFn: currentUser ? () => getHeader(userId, currentUser.id) : skipToken,
    staleTime: 1000 * 60 * 5,
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
