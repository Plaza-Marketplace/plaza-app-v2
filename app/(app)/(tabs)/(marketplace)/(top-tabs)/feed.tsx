import Feed from '@/components/Feed';
import Loading from '@/components/Loading';
import {
  useGetExploreTab,
  useGetNextExploreTabVideos,
} from '@/hooks/routes/explore';
import { useState } from 'react';

const ExploreTab = () => {
  const { data, error, refetch, isLoading } = useGetExploreTab();
  const getNextExploreTabVideos = useGetNextExploreTabVideos(data?.videos);
  const [refreshing, setRefreshing] = useState(false);
  console.log(error);
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
