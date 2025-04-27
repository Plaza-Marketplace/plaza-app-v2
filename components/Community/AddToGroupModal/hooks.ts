import { useAuth } from '@/contexts/AuthContext';
import {
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createGroupCollectionItem, getGroups } from './services';
import { Group } from './models';

export const useGetGroups = (productId: Id, enabled: boolean) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['groups', user?.id],
    queryFn: user ? () => getGroups(user.id, productId) : skipToken,
    enabled,
  });
};

export const useAddToGroupCollection = (productId: Id) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addToGroupCollection', productId],
    mutationFn: (groupId: Id) => createGroupCollectionItem(groupId, productId),
    onMutate: (groupId) => {
      queryClient.setQueryData<Group[]>(['groups', user?.id], (data) => {
        if (!data) return data;

        return data.map((group) => ({
          ...group,
          isInCollection: group.id === groupId ? true : group.isInCollection,
        }));
      });
    },
  });
};
