import { useAuth } from '@/contexts/AuthContext';
import {
  getAnonymousExploreTab,
  getAnonymousNextVideos,
} from '@/services/route/anonymous-explore';
import {
  getExploreTab,
  getNextExploreTabVideos,
} from '@/services/route/explore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useGetExploreTab = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['exploreTab', user?.id],
    queryFn: user?.id
      ? () => getExploreTab(user.id)
      : () => getAnonymousExploreTab(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetNextExploreTabVideos = (videos?: ExploreTab['videos']) => {
  const [isFetching, setIsFetching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const paginate = async (userId: Id, videos: ExploreTab['videos']) => {
    if (!hasNextPage || isFetching) return;

    setIsFetching(true);
    const newVideos = await getNextExploreTabVideos(
      userId,
      videos[videos.length - 1].id
    );
    setIsFetching(false);

    if (newVideos.length === 0) {
      setHasNextPage(false);
      return;
    }

    queryClient.setQueryData(
      ['exploreTab', userId],
      (prev: ExploreTab | undefined) => ({
        videos: prev ? [...prev.videos, ...newVideos] : newVideos,
      })
    );
  };

  const anonymousPaginate = async (videos: ExploreTab['videos']) => {
    if (!hasNextPage || isFetching) return;

    setIsFetching(true);
    const newVideos = await getAnonymousNextVideos(
      videos[videos.length - 1].id
    );
    setIsFetching(false);

    if (newVideos.length === 0) {
      setHasNextPage(false);
      return;
    }

    queryClient.setQueryData(
      ['exploreTab'],
      (prev: ExploreTab | undefined) => ({
        videos: prev ? [...prev.videos, ...newVideos] : newVideos,
      })
    );
  };

  return user?.id && videos
    ? () => paginate(user.id, videos)
    : () => anonymousPaginate(videos);
};
