import { useQuery } from '@tanstack/react-query';
import { getOrderScreen } from './services';

export const useGetOrderScreen = (orderId: Id) =>
  useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderScreen(orderId),
    staleTime: 1000 * 60 * 5,
  });
