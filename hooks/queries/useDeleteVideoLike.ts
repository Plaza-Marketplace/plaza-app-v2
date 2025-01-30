import { Video } from '@/models/video';
import { deleteVideoLike } from '@/services/crud/video';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteVideoLike = (videoId: Id, likerId?: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['videoLike', videoId, likerId],
    mutationFn: likerId
      ? () => deleteVideoLike({ videoId, likerId })
      : undefined,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['videoLikedByUserId', data.likerId],
        (old: VideoLike[] | undefined) => {
          if (old) {
            return old.filter((like) => like.likerId !== data.likerId);
          }
          return [];
        }
      );

      queryClient.setQueryData(
        ['isVideoLikedByUser', data.likerId, data.videoId],
        false
      );

      queryClient.setQueryData(['feedVideos'], (old: Video[][] | undefined) => {
        const videos = old?.flat();
        if (videos) {
          return videos.map((video) => {
            if (video.id === data.videoId) {
              return {
                ...video,
                likeCount: video.likeCount - 1,
              };
            }
            return video;
          });
        }
        return [];
      });
    },
  });
};

export default useDeleteVideoLike;
