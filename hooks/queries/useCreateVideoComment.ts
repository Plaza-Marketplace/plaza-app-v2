import { createComment } from '@/services/videoComment';
import { useMutation } from '@tanstack/react-query';

const useCreateVideoComment = (videoId: Id, posterId?: Id) =>
  useMutation({
    mutationKey: ['createVideoComment', videoId],
    mutationFn: posterId
      ? (description: string) =>
          createComment({
            videoId: videoId,
            posterId: posterId,
            description: description,
          })
      : undefined,
  });

export default useCreateVideoComment;
