import { deleteCartItem } from '@/services/crud/cartItem';
import { addCartQuantity, removeCartQuantity } from '@/services/route/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddQuantity = (userId: Id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: Id) => {
      addCartQuantity(cartItemId);
    },
    onMutate: (cartItemId: Id) => {
      queryClient.setQueryData(['cartItems', userId], (old: any) => {
        if (old) {
          return old.map((item: any) => {
            if (item.id === cartItemId) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        }
        return old;
      });
    },
  });
};

export const useRemoveQuantity = (userId: Id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: Id) => {
      removeCartQuantity(cartItemId);
    },
    onMutate: (cartItemId: Id) => {
      queryClient.setQueryData(['cartItems', userId], (old: any) => {
        if (old) {
          return old.map((item: any) => {
            if (item.id === cartItemId) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
        }
        return old;
      });
    },
  });
};

export const useRemoveCartItem = (userId: Id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: Id) => {
      // Call the API to remove the cart item
      deleteCartItem(cartItemId);
    },
    onMutate: (cartItemId: Id) => {
      queryClient.setQueryData(['cartItems', userId], (old: any) => {
        if (old) {
          return old.filter((item: any) => item.id !== cartItemId);
        }
        return old;
      });
    },
  });
};
export default { useAddQuantity, useRemoveQuantity, useRemoveCartItem };
