import { getSellerInfo } from '@/services/crud/user';
import { useQuery } from '@tanstack/react-query';

const useGetSellerInfo = (sellerId: Id) =>
  useQuery({
    queryKey: ['seller', sellerId],
    queryFn: () => getSellerInfo(sellerId),
  });

export default useGetSellerInfo;
