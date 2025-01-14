import { createCartItem } from '@/services/cartItem';
import { useMutation } from '@tanstack/react-query';

const useCreateCartItem = (product: Product, userId?: Id) =>
  useMutation({
    mutationKey: ['createCartItem'],
    mutationFn: userId
      ? () =>
          createCartItem({
            userId: userId,
            productId: product.id,
            quantity: null,
          })
      : undefined,
  });

export default useCreateCartItem;
