import { useQuery } from '@tanstack/react-query';
import { getEvent } from './services';

const useGetEvent = (id: Id) =>
  useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
    staleTime: 1000 * 60 * 5,
  });

export default useGetEvent;
