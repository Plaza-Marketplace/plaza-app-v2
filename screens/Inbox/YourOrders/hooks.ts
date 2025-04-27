import { useAuth } from '@/contexts/AuthContext';
import { skipToken, useQuery } from '@tanstack/react-query';
import { getYourOrdersScreen } from './services';

export const useGetYourOrdersScreen = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['yourOrders', user?.id],
    queryFn: user ? () => getYourOrdersScreen(user.id) : skipToken,
    staleTime: 1000 * 60 * 5,
  });
};
