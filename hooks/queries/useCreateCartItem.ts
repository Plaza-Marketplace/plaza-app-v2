import { createCartItem } from '@/services/crud/cartItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateCartItem = (product: Product, userId?: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createCartItem'],
    mutationFn: userId
      ? () =>
          createCartItem({
            userId: userId,
            productId: product.id,
            quantity: null,
          })
      : undefined,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['cartItems', userId],
        (old: CartItem[] | undefined) => {
          if (old) {
            return [...old, data];
          }
          return [data];
        }
      )
    }
  });
}

export default useCreateCartItem;
