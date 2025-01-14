import { createOrderHistoryItems } from '@/services/orderHistoryItem';
import { useMutation } from '@tanstack/react-query';

const useCreateOrderHistoryItems = (productIds: Id[], userId?: Id) =>
  useMutation({
    mutationKey: ['createorderHistory'],
    mutationFn: userId
      ? () => createOrderHistoryItems(userId, productIds)
      : undefined,
  });

export default useCreateOrderHistoryItems;
