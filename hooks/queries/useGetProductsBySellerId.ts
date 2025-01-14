import { getProductsBySellerId } from '@/services/product';
import { skipToken, useQuery } from '@tanstack/react-query';

const useGetProductsBySellerId = (id?: Id) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: id ? () => getProductsBySellerId(id) : skipToken,
  });

export default useGetProductsBySellerId;
