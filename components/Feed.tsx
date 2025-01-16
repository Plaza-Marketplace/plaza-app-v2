import { FlatList } from 'react-native';
import FeedVideo from './Feed/FeedVideo';
import { MARKETPLACE_FEED_VIDEO_HEIGHT } from '@/constants/marketplace';
import React, { FC, useCallback, useState } from 'react';
import { Video } from '@/models/video';

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
  const [currViewableIndex, setCurrViewableIndex] = useState(0);
  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length === 0) {
      return;
    }
    setCurrViewableIndex(viewableItems[0].index);
  }, []);

  const renderItem = useCallback(
    ({ item, index }) => {
      return <FeedVideo video={item} visible={currViewableIndex === index} />;
    },
    [currViewableIndex]
  );

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={onRefresh}
      data={videos}
      renderItem={renderItem}
      pagingEnabled
      snapToInterval={MARKETPLACE_FEED_VIDEO_HEIGHT}
      decelerationRate="fast"
      disableIntervalMomentum
      showsVerticalScrollIndicator={false}
      viewabilityConfig={{ itemVisiblePercentThreshold: 100 }}
      onViewableItemsChanged={handleViewableItemsChanged}
      getItemLayout={(data, index) => ({
        length: MARKETPLACE_FEED_VIDEO_HEIGHT,
        offset: MARKETPLACE_FEED_VIDEO_HEIGHT * index,
        index,
      })}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      keyExtractor={(item) => item.id.toString()}
      removeClippedSubviews
      onEndReachedThreshold={2}
      onEndReached={fetchNextPage}
    />
  );
};

export default Feed;
