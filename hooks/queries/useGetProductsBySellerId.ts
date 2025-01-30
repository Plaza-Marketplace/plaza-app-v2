import { getSalesCountBySellerId } from '@/services/crud/orderHistoryItem';
import { getProductsBySellerId } from '@/services/crud/product';
import { skipToken, useQuery } from '@tanstack/react-query';

export const useGetProductsBySellerId = (id?: Id) =>
  useQuery({
    queryKey: ['products', id],
    queryFn: id ? () => getProductsBySellerId(id) : skipToken,
  });

export const useGetSalesCountBySellerId = (id?: Id) =>
  useQuery({
    queryKey: ['sales', id],
    queryFn: id ? () => getSalesCountBySellerId(id) : skipToken,
  });
