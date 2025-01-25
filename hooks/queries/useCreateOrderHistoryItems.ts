import { createOrderHistoryItems } from '@/services/crud/orderHistoryItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateOrderHistoryItems = (productIds: Id[], userId?: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createorderHistory'],
    mutationFn: userId
      ? () => createOrderHistoryItems(userId, productIds)
      : undefined,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['orderHistory'],
        (old: OrderHistoryItem[] | undefined) => {
          if (old) {
            return [...old, data];
          }
          return [data];
        }
      )
    }
  });
}

export default useCreateOrderHistoryItems;
