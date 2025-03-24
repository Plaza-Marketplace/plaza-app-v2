import { useQuery } from '@tanstack/react-query';
import { searchGroups } from './services';

const useSearchGroups = (searchTerm: string) =>
  useQuery({
    queryKey: ['searchGroups', searchTerm],
    queryFn: () => searchGroups(searchTerm),
  });

export default useSearchGroups;
