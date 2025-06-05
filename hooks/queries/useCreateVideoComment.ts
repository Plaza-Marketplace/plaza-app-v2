import { Event, track } from '@/analytics/utils';
import { useAuth } from '@/contexts/AuthContext';
import { createComment } from '@/services/crud/videoComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateVideoComment = (videoId: Id) => {
  const { user } = useAuth();

  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['createVideoComment', videoId],
    mutationFn: user?.id
      ? (description: string) =>
          createComment({
            videoId: videoId,
            posterId: user.id,
            description: description,
          })
      : undefined,
    onMutate: (description) => {
      if (!user) return;

      const newComment: VideoComment = {
        id: Math.random(),
        videoId: videoId,
        poster: user,
        description: description,
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData(
        ['exploreTab', user.id],
        (old: ExploreTab | undefined) => {
          if (old) {
            return {
              ...old,
              videos: old.videos.map((video) => {
                if (video.id === videoId) {
                  return {
                    ...video,
                    commentCount: video.commentCount + 1,
                  };
                }
                return video;
              }),
            };
          }
        }
      );

      queryClient.setQueryData(
        ['comments', videoId],
        (old: VideoComment[] | undefined) => {
          if (old) {
            return [...old, newComment];
          }
          return [newComment];
        }
      );
    },
    onSuccess: () => track(Event.COMMENTED_ON_VIDEO),
  });
};

export default useCreateVideoComment;
