import { useQuery } from '@tanstack/react-query';
import { getVideosByUserId } from './services';

export const useGetVideosByUserId = (userId: Id) =>
  useQuery({
    queryKey: ['videos', userId],
    queryFn: () => getVideosByUserId(userId),
    staleTime: 1000 * 60 * 5,
  });
