import { Video } from '@/models/video';
import { createVideoLike } from '@/services/video';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateVideoLike = (videoId: Id, likerId?: Id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['videoLike', videoId, likerId],
    mutationFn: likerId
      ? () => createVideoLike({ videoId, likerId })
      : undefined,
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['videoLikedByUserId', data.likerId],
        (old: VideoLike[] | undefined) => {
          if (old) {
            return [...old, data];
          }
          return [data];
        }
      );
      queryClient.setQueryData(
        ['isVideoLikedByUser', data.likerId, data.videoId],
        true
      );

      queryClient.setQueryData(['feedVideos'], (old: Video[][] | undefined) => {
        const videos = old?.flat();
        console.log(old);
        if (videos) {
          return videos.map((video) => {
            if (video.id === data.videoId) {
              return {
                ...video,
                likeCount: video.likeCount + 1,
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

export default useCreateVideoLike;
