import { useAuth } from '@/contexts/AuthContext';
import { skipToken, useQuery } from '@tanstack/react-query';
import { getYourSalesScreen } from './services';

export const useGetYourSalesScreen = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['yourSales', user?.id],
    queryFn: user ? () => getYourSalesScreen(user.id) : skipToken,
    staleTime: 1000 * 60 * 5,
  });
};
