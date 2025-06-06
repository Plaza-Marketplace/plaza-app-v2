import { FlatList, View } from 'react-native';
import FeedVideo from './Feed/FeedVideo';
import { MARKETPLACE_FEED_VIDEO_HEIGHT } from '@/constants/marketplace';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { FlashList } from '@shopify/flash-list';
import { ViewabilityTrackerFlashList } from './List/ViewabilityTrackerFlashList';

interface FeedProps {
  videos: Video[];
  refreshing: boolean;
  onRefresh: () => void;
  fetchNextPage: () => void;
}

const Feed: FC<FeedProps> = ({
  videos,
  refreshing,
  onRefresh,
  fetchNextPage,
}) => {
  const [visible, setVisible] = useState(false);
  const [currViewableIndex, setCurrViewableIndex] = useState(0);
  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length === 0) {
      return;
    }
    setCurrViewableIndex(viewableItems[0].index);
  }, []);

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <FeedVideo
          video={item}
          // visible={currViewableIndex === index && visible}
        />
      );
    },
    [currViewableIndex, visible]
  );

  useFocusEffect(
    useCallback(() => {
      setVisible(true);

      return () => {
        setVisible(false);
      };
    }, [])
  );

  return (
    <ViewabilityTrackerFlashList
      extraData={{ currViewableIndex }}
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={videos}
      renderItem={renderItem}
      onViewableItemsChanged={handleViewableItemsChanged}
      drawDistance={MARKETPLACE_FEED_VIDEO_HEIGHT}
      pagingEnabled
      snapToInterval={MARKETPLACE_FEED_VIDEO_HEIGHT}
      decelerationRate="fast"
      disableIntervalMomentum
      showsVerticalScrollIndicator={false}
      estimatedItemSize={MARKETPLACE_FEED_VIDEO_HEIGHT}
      keyExtractor={(item) => item.id.toString()}
      removeClippedSubviews
      onEndReachedThreshold={2}
      onEndReached={fetchNextPage}
    />
  );
};

export default Feed;
