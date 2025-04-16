import { useAuth } from '@/contexts/AuthContext';
import { skipToken, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyItemProducts, getNextMyItemsProducts } from './services';
import { MyItemsProduct } from './models';
import { useState } from 'react';

export const useGetMyItemsProducts = (enabled: boolean) => {
  const { user } = useAuth();
  console.log('USER: ', user);
  return useQuery({
    queryKey: ['myItems', user?.id],
    queryFn: user ? () => getMyItemProducts(user.id) : skipToken,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};

export const useGetNextMyItemsProducts = (products?: MyItemsProduct[]) => {
  const { user } = useAuth();
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const queryClient = useQueryClient();

  const paginate = async (userId: Id, products: MyItemsProduct[]) => {
    if (!hasNextPage || isFetching) return;

    setIsFetching(true);
    const newProducts = await getNextMyItemsProducts(
      userId,
      products[products.length - 1].id
    );

    setIsFetching(false);

    if (newProducts.length === 0) {
      setHasNextPage(false);
      return;
    }

    queryClient.setQueryData<MyItemsProduct[]>(['myItems', user?.id], (prev) =>
      prev ? [...prev, ...newProducts] : newProducts
    );
  };

  return products && user ? () => paginate(user.id, products) : () => {};
};
