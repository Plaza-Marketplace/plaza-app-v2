import { skipToken, useQuery } from '@tanstack/react-query';
import { getExploreTab } from './services';
import { useAuth } from '@/contexts/AuthContext';

const useGetExploreTab = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['exploreTab'],
    queryFn: user ? () => getExploreTab(user.id) : skipToken,
    // staleTime: 1000 * 60 * 5,
  });
};

export default useGetExploreTab;
