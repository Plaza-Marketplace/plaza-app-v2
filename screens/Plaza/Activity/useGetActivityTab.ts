import { skipToken, useQuery } from '@tanstack/react-query';
import { getActivityTab } from './services';
import { useAuth } from '@/contexts/AuthContext';

const useGetActivityTab = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['activityTab', user?.id],
    queryFn: user ? () => getActivityTab(user.id) : skipToken,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetActivityTab;
