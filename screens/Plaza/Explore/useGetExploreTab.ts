import { useQuery } from '@tanstack/react-query';
import { getExploreTab } from './services';
import { QueryKey } from '@/constants/queryKey';

const useGetExploreTab = () => {
  return useQuery({
    queryKey: [QueryKey.PLAZA_EXPLORE_TAB],
    queryFn: getExploreTab,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetExploreTab;
