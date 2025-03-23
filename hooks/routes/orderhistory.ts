import { useAuth } from '@/contexts/AuthContext';
import { OrderHistoryItem } from '@/models/orderHistoryItem';
import {
  getPurchaseHistory,
  getSalesHistory,
} from '@/services/route/orderhistory';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetPurchases = () => {
  const { user } = useAuth();
  if (!user) {
    throw new Error('User not authenticated');
  }
  return useQuery({
    queryKey: ['purchases', user.id],
    queryFn: () => getPurchaseHistory(user.id),
    staleTime: Infinity,
  });
};

export const useGetSales = () => {
  const { user } = useAuth();
  if (!user) {
    throw new Error('User not authenticated');
  }
  return useQuery({
    queryKey: ['sales', user.id],
    queryFn: () => getSalesHistory(user.id),
    staleTime: Infinity,
  });
};

export const getOrderHistoryFromCache = (
  id: Id,
  side: 'purchases' | 'sales'
): OrderHistoryItem | undefined => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  if (!user) {
    throw new Error('User not authenticated');
  }
  const data: OrderHistoryItem[] | undefined = queryClient.getQueryData([
    side,
    user.id,
  ]);
  if (!data) {
    throw new Error(`No data found for ${side}?`);
  }
  const orderHistory = data.find((item: any) => item.id === id);
  return orderHistory;
};
