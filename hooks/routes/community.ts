import { useAuth } from '@/contexts/AuthContext';
import {
  createCommunityMember,
  deleteCommunityMember,
} from '@/services/crud/communityMember';
import { getCommunityPage } from '@/services/route/community';
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const useJoinCommunity = (id: Id) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['joinCommunity', id],
    mutationFn: user
      ? () => createCommunityMember({ communityId: id, userId: user.id })
      : undefined,
    onMutate: () => {
      queryClient.setQueryData<CommunityPage>(['community', id], (data) => {
        if (!data) return data;

        return {
          ...data,
          memberCount: data.memberCount + 1,
          isMember: true,
        };
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['activityTab', user?.id] }),
  });
};

export const useLeaveCommunity = (id: Id) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['leaveCommunity', id],
    mutationFn: user
      ? () => deleteCommunityMember({ communityId: id, userId: user.id })
      : undefined,
    onMutate: () => {
      queryClient.setQueryData<CommunityPage>(['community', id], (data) => {
        if (!data) return data;

        return {
          ...data,
          memberCount: data.memberCount - 1,
          isMember: false,
        };
      });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['activityTab', user?.id] }),
  });
};

export const useGetCommunityPage = (id: Id) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['community', id, user?.id],
    queryFn: user ? () => getCommunityPage(id, user.id) : skipToken,
    staleTime: 1000 * 60 * 5,
  });
};
