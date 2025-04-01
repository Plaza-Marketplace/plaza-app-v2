import { useAuth } from '@/contexts/AuthContext';
import { createProducts } from '@/services/crud/product';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUploadProducts = () => {
  const { user } = useAuth();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (products: CreateProduct[]) => {
      if (user) {
        return createProducts(products);
      }
      return [];
    },
    onSuccess: (products) => {
      if (user) {
        queryClient.setQueryData(['products', user.id], (old: Product[]) => {
          if (old) {
            return old.concat(products);
          }
          return products;
        });
      }
    },
  });
};
