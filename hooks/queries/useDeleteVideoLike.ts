import { useAuth } from '@/contexts/AuthContext';
import { deleteVideoLike } from '@/services/crud/video';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteVideoLike = (videoId: Id) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['videoLike', videoId, user?.id],
    mutationFn: user?.id
      ? () => deleteVideoLike({ videoId, likerId: user.id })
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
                isLiked: false,
                likeCount: video.likeCount - 1,
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

export default useDeleteVideoLike;
