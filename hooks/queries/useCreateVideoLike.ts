import { createVideoLike } from '@/services/video';
import { useMutation } from '@tanstack/react-query';

const useCreateVideoLike = (videoId: Id, likerId?: Id) =>
  useMutation({
    mutationKey: ['videoLike', videoId, likerId],
    mutationFn: likerId
      ? () => createVideoLike({ videoId, likerId })
      : undefined,
  });

export default useCreateVideoLike;
