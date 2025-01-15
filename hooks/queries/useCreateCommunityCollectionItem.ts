import { createCommunityCollectionItem } from '@/services/communityCollectionItem';
import { useMutation } from '@tanstack/react-query';

const useCreateCommunityCollectionItem = () =>
  useMutation({
    mutationKey: ['create-community-collection-item'],
    mutationFn: (communityCollectionItem: CreateCommunityCollectionItem) =>
      createCommunityCollectionItem(communityCollectionItem),
  });

export default useCreateCommunityCollectionItem;
