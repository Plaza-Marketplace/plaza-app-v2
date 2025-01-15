import { FlatList } from 'react-native';
import FeedVideo from './Feed/FeedVideo';
import { MARKETPLACE_FEED_VIDEO_HEIGHT } from '@/constants/marketplace';
import { FC, useCallback, useState } from 'react';
import { Dimensions } from 'react-native';

interface FeedProps {
  videos: Video[];
}

const Feed: FC<FeedProps> = ({ videos }) => {
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
        length: Dimensions.get('window').width,
        offset: MARKETPLACE_FEED_VIDEO_HEIGHT * index,
        index,
      })}
      initialNumToRender={3}
    />
  );
};

export default Feed;
