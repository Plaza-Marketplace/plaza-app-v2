import { getOrderHistoryItemsByUserId } from '@/services/crud/orderHistoryItem';
import { skipToken, useQuery } from '@tanstack/react-query';

const useGetOrderHistoryItemsByUserId = (id?: Id) =>
  useQuery({
    queryKey: ['orderHistory'],
    queryFn: id ? () => getOrderHistoryItemsByUserId(id) : skipToken,
  });

export default useGetOrderHistoryItemsByUserId;
