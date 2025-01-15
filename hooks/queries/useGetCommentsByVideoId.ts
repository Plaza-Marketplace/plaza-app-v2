import { getCommentsByVideoId } from '@/services/videoComment';
import { useQuery } from '@tanstack/react-query';

const useGetCommentsByVideoId = (videoId: Id) =>
  useQuery({
    queryKey: ['comments', videoId],
    queryFn: () => getCommentsByVideoId(videoId),
  });

export default useGetCommentsByVideoId;
