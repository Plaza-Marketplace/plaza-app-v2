import { skipToken, useQuery } from '@tanstack/react-query';
import { getReviewsTab } from './services';

const useGetReviewsTab = (userId?: Id) =>
  useQuery({
    queryKey: ['reviewsTab', userId],
    queryFn: userId ? () => getReviewsTab(userId) : skipToken,
    staleTime: 1000 * 60 * 5,
  });

export default useGetReviewsTab;
