import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Feed from '@/components/Feed';
import Loading from '@/components/Loading';
import Color from '@/constants/Color';
import {
  useGetExploreTab,
  useGetNextExploreTabVideos,
} from '@/hooks/routes/explore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ExploreTab = () => {
  const insets = useSafeAreaInsets();
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
    <>
      <Feed
        videos={data.videos}
        refreshing={refreshing}
        onRefresh={onRefresh}
        fetchNextPage={getNextExploreTabVideos}
      />
    </>
  );
};

export default ExploreTab;
