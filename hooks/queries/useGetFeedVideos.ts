import { getVideos } from '@/services/video';
import { useInfiniteQuery } from '@tanstack/react-query';

const useGetFeedVideos = () =>
  useInfiniteQuery({
    queryKey: ['feedVideos'],
    queryFn: ({ pageParam }) => getVideos(pageParam === -1 ? null : pageParam),
    initialPageParam: -1,
    getNextPageParam: (lastPage) =>
      lastPage.length > 0 ? lastPage[lastPage.length - 1].id : null,
    staleTime: 1000 * 60 * 5,
  });

export default useGetFeedVideos;
