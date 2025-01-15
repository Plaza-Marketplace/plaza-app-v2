import { createCommunityCollectionItem } from '@/services/communityCollectionItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateCommunityCollectionItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-community-collection-item'],
    mutationFn: (communityCollectionItem: CreateCommunityCollectionItem) =>
      createCommunityCollectionItem(communityCollectionItem),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['community-collection-items', data.communityId],
        (old: CommunityCollectionItem[] | undefined) => {
          if (old) {
            return [...old, data];
          }
          return [data];
        }
      );
    }
  });
}

export default useCreateCommunityCollectionItem;
