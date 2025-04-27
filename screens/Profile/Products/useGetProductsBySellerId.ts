import { useQuery } from '@tanstack/react-query';
import { getProductsBySellerId } from './services';

const useGetProductsBySellerId = (sellerId: Id) =>
  useQuery({
    queryKey: ['products', sellerId],
    queryFn: () => getProductsBySellerId(sellerId),
    staleTime: 1000 * 60 * 5,
  });

export default useGetProductsBySellerId;
