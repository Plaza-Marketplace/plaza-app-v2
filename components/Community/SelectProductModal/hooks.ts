import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createGroupCollectionItems } from './services';

export const useAddProductsToCollection = (groupId: Id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['addProductsToCollection'],
    mutationFn: (productIds: Id[]) =>
      createGroupCollectionItems(groupId, productIds),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['collectionProducts', groupId],
      }),
  });
};
