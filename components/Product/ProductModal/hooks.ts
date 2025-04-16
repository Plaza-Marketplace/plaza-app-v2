import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createCartItem,
  deleteProduct,
  getProductModalProduct,
} from './services';
import { useAuth } from '@/contexts/AuthContext';

export const useGetProductModalProduct = (productId: Id, isOpen: boolean) =>
  useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductModalProduct(productId),
    staleTime: 1000 * 60 * 5,
    enabled: isOpen,
  });

export const useAddToCart = (productId: Id) => {
  const { user } = useAuth();

  return useMutation({
    mutationKey: ['addToCart'],
    mutationFn: user ? () => createCartItem(productId, user.id, 1) : undefined,
  });
};

export const useDeleteProduct = (productId: Id) => {
  return useMutation({
    mutationKey: ['deleteProduct'],
    mutationFn: () => deleteProduct(productId),
  });
};
