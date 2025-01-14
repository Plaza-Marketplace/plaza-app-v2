import { deleteVideoLike } from '@/services/video';
import { useMutation } from '@tanstack/react-query';

const useDeleteVideoLike = (videoId: Id, likerId?: Id) =>
  useMutation({
    mutationKey: ['videoLike', videoId, likerId],
    mutationFn: likerId
      ? () => deleteVideoLike({ videoId, likerId })
      : undefined,
  });

export default useDeleteVideoLike;
