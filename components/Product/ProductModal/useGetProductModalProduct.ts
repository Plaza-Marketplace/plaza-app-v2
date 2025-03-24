import { useQuery } from '@tanstack/react-query';
import { getProductModalProduct } from './services';

const useGetProductModalProduct = (productId: Id, isOpen: boolean) =>
  useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductModalProduct(productId),
    staleTime: 1000 * 60 * 5,
    enabled: isOpen,
  });

export default useGetProductModalProduct;
