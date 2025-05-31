import { Event, track } from '@/analytics/utils';
import { useAuth } from '@/contexts/AuthContext';
import { createVideo } from '@/services/crud/video';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useVideoUpload = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (video: CreateVideo) => createVideo(video),
    onSuccess: async (data) => {
      queryClient.setQueryData(
        ['videos', user?.id],
        (oldVideos: Video[] | undefined) => {
          return oldVideos ? [...oldVideos, data] : [data];
        }
      );

      track(Event.POSTED_VIDEO, { videoId: data.id });

      return data;
    },
  });
};
