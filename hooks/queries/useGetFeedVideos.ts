import { getVideos } from '@/services/video';
import { useQuery } from '@tanstack/react-query';

const useGetFeedVideos = () =>
  useQuery({
    queryKey: ['feedVideos'],
    queryFn: getVideos,
    staleTime: 1000 * 60 * 5,
  });

export default useGetFeedVideos;
