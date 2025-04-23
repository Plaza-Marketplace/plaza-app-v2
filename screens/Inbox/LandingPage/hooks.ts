import { useAuth } from '@/contexts/AuthContext';
import { skipToken, useQuery } from '@tanstack/react-query';
import { getLandingPage } from './services';

export const useGetLandingPage = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['inbox', user?.id],
    queryFn: user ? () => getLandingPage(user.id) : skipToken,
  });
};
