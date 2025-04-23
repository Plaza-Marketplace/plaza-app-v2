import Feed from '@/components/Feed';
import Loading from '@/components/Loading';
import { useAuth } from '@/contexts/AuthContext';
import {
  useGetExploreTab,
  useGetNextExploreTabVideos,
} from '@/hooks/routes/explore';
import { useState } from 'react';

const ExploreTab = () => {
  const { user } = useAuth();

  const { data, error, refetch, isLoading } = useGetExploreTab();
  const getNextExploreTabVideos = useGetNextExploreTabVideos(data?.videos);
  const [refreshing, setRefreshing] = useState(false);
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
