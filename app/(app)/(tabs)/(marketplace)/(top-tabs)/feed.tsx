import Feed from '@/components/Feed';
import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext';
import {
  useGetExploreTab,
  useGetNextExploreTabVideos,
} from '@/hooks/routes/explore';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';

const ExploreTab = () => {
  const { session } = useAuth();

  const { data, error, refetch, isLoading } = useGetExploreTab();
  const getNextExploreTabVideos = useGetNextExploreTabVideos(data?.videos);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      refetch();
    }, [])
  );

  if (isLoading) return <Loading />;

  if (!data || error) return null;

  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  };
  return (
    <Feed
      videos={data.videos}
      refreshing={refreshing}
      onRefresh={onRefresh}
      fetchNextPage={getNextExploreTabVideos}
    />
  );
};

export default ExploreTab;
