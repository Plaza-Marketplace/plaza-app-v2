import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Feed from '@/components/Feed';
import useGetFeedVideos from '@/hooks/queries/useGetFeedVideos';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ExploreTab = () => {
  const insets = useSafeAreaInsets();
  const { data, error, refetch } = useGetFeedVideos();
  const [refreshing, setRefreshing] = useState(false);

  if (!data || error) return null;

  const onRefresh = async () => {
    setRefreshing(true);

    const { data } = await refetch();

    console.log(data);

    setRefreshing(false);
  };

  return (
    <>
      <PressableOpacity
        onPress={() => router.push('/cart')}
        style={{ top: insets.top, right: 16, position: 'absolute', zIndex: 99 }}
      >
        <Ionicons name="cart" size={36} />
      </PressableOpacity>

      <Feed videos={data} refreshing={refreshing} onRefresh={onRefresh} />
    </>
  );
};

export default ExploreTab;
