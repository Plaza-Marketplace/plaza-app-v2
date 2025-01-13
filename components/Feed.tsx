import { FlatList } from 'react-native';
import FeedVideo from './Feed/FeedVideo';
import { MARKETPLACE_FEED_VIDEO_HEIGHT } from '@/constants/marketplace';
import { FC } from 'react';

interface FeedProps {
  videos: Video[];
}

const Feed: FC<FeedProps> = ({ videos }) => {
  return (
    <FlatList
      data={videos}
      renderItem={({ item }) => <FeedVideo video={item} />}
      pagingEnabled
      snapToInterval={MARKETPLACE_FEED_VIDEO_HEIGHT}
      decelerationRate="fast"
      disableIntervalMomentum
      showsVerticalScrollIndicator={false}
    />
  );
};

export default Feed;
