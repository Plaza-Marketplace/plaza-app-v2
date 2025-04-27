import { useQuery } from '@tanstack/react-query';
import { getEvents } from './services';

const useGetEvents = () =>
  useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
    staleTime: 1000 * 60 * 5,
  });

export default useGetEvents;
