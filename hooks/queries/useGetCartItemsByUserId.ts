import { getCartItemsByUserId } from '@/services/crud/cartItem';
import { skipToken, useQuery } from '@tanstack/react-query';

const useGetCartItemsByUserId = (id?: Id) =>
  useQuery({
    queryKey: ['cartItems', id],
    queryFn: id ? () => getCartItemsByUserId(id) : skipToken,
  });

export default useGetCartItemsByUserId;
