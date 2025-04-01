import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCatalogProducts, getNextCatalogProducts } from './services';
import { useState } from 'react';
import { CatalogProduct } from './models';

export const useGetCatalogProducts = (enabled: boolean) => {
  return useQuery({
    queryKey: ['catalogProducts'],
    queryFn: getCatalogProducts,
    staleTime: 1000 * 60 * 5,
    enabled,
  });
};

export const useGetNextCatalogProducts = (products?: CatalogProduct[]) => {
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const queryClient = useQueryClient();

  const paginate = async (products: CatalogProduct[]) => {
    if (!hasNextPage || isFetching) return;

    setIsFetching(true);
    const newProducts = await getNextCatalogProducts(
      products[products.length - 1].id
    );

    setIsFetching(false);

    if (newProducts.length === 0) {
      setHasNextPage(false);
      return;
    }

    queryClient.setQueryData<CatalogProduct[]>(['catalogProducts'], (prev) =>
      prev ? [...prev, ...newProducts] : newProducts
    );
  };

  return products ? () => paginate(products) : () => {};
};
