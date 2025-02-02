import { useAuth } from '@/contexts/AuthContext';
import { createVideoLike } from '@/services/crud/video';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateVideoLike = (videoId: Id) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['videoLike', videoId, user?.id],
    mutationFn: user?.id
      ? () => createVideoLike({ videoId, likerId: user.id })
      : undefined,
    onMutate: () => {
      queryClient.setQueryData(
        ['exploreTab'],
        (old: ExploreTab | undefined) => {
          if (!old) return;

          const newVideos = old.videos.map((video) => {
            if (video.id === videoId) {
              return {
                ...video,
                isLiked: true,
                likeCount: video.likeCount + 1,
              };
            }
            return video;
          });

          return {
            ...old,
            videos: newVideos,
          };
        }
      );
    },
  });
};

export default useCreateVideoLike;
