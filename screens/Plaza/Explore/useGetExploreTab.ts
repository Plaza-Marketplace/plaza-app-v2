import { skipToken, useQuery } from '@tanstack/react-query';
import { getExploreTab } from './services';
import { useAuth } from '@/contexts/AuthContext';
import { QueryKey } from '@/constants/queryKey';

const useGetExploreTab = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: [QueryKey.PLAZA_EXPLORE_TAB, user?.id],
    queryFn: user ? () => getExploreTab(user.id) : skipToken,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetExploreTab;
