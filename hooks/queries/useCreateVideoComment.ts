import { createComment } from '@/services/crud/videoComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateVideoComment = (videoId: Id, posterId?: Id) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createVideoComment', videoId],
    mutationFn: posterId
      ? (description: string) =>
          createComment({
            videoId: videoId,
            posterId: posterId,
            description: description,
          })
      : undefined,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['comments', videoId],
        (old: VideoComment[] | undefined) => {
          if (old) {
            return [...old, data];
          }
          return [data];
        }
      );
    }
  });
}

export default useCreateVideoComment;
