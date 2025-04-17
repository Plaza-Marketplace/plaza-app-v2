import { useQuery } from '@tanstack/react-query';
import { getFullPost } from './services';

export const useGetFullPost = (id: Id) =>
  useQuery({
    queryKey: ['fullPost', id],
    queryFn: () => getFullPost(id),
    staleTime: 1000 * 60 * 5,
  });
