import PressableOpacity from '@/components/Buttons/PressableOpacity';
import Feed from '@/components/Feed';
import Color from '@/constants/Color';
import useGetFeedVideos from '@/hooks/queries/useGetFeedVideos';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ExploreTab = () => {
  const insets = useSafeAreaInsets();
  const { data, error, refetch, fetchNextPage } = useGetFeedVideos();
  const [refreshing, setRefreshing] = useState(false);

  if (!data || error) return null;

  const onRefresh = async () => {
    setRefreshing(true);

    const { data } = await refetch();

    setRefreshing(false);
  };

  return (
    <>
      <PressableOpacity
        onPress={() => router.push('/cart')}
        style={{
          top: insets.top,
          right: 16,
          position: 'absolute',
          zIndex: 99,
        }}
      >
        <Ionicons
          name="cart"
          size={36}
          color={Color.ICON_TERTIARY}
          style={{
            textShadowColor: 'black',
            textShadowOffset: { width: 0.5, height: 0.5 },
            textShadowRadius: 6,
          }}
        />
      </PressableOpacity>

      <Feed
        videos={data.pages.flat()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};

export default ExploreTab;
