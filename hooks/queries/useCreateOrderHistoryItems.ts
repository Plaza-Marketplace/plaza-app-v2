import { Event, track } from '@/analytics/utils';
import {
  CreateOrderHistoryItem,
  OrderHistoryItem,
} from '@/models/orderHistoryItem';
import { createOrderHistoryItems } from '@/services/crud/orderHistoryItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateOrderHistoryItems = (items?: CreateOrderHistoryItem[]) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createorderHistory'],
    mutationFn: items ? () => createOrderHistoryItems(items) : undefined,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['purchases'],
        (old: OrderHistoryItem[] | undefined) => {
          if (old) {
            return [...old, data];
          }
          return [data];
        }
      );

      data.forEach((item) => {
        track(Event.PURCHASED_PRODUCT, { productId: item.product.id });
      });
    },
  });
};

export default useCreateOrderHistoryItems;
