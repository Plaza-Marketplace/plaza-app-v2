import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from './services';

export const useGetProductById = (productId: Id) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['cartProduct', productId],
    queryFn: () => getProductById(productId),
    enabled: !!user,
  });
};
