import { FC } from 'react';
import FeedVideoButton from '../FeedVideoButton';
import useCreateVideoLike from '@/hooks/queries/useCreateVideoLike';
import useDeleteVideoLike from '@/hooks/queries/useDeleteVideoLike';
import { Event, track } from '@/analytics/utils';

interface LikeButtonProps {
  videoId: Id;
  isLiked: boolean;
  likeCount: number;
}

const LikeButton: FC<LikeButtonProps> = ({ videoId, isLiked, likeCount }) => {
  const { mutate: createLike } = useCreateVideoLike(videoId);
  const { mutate: deleteLike } = useDeleteVideoLike(videoId);

  const handleLike = async () => {
    if (isLiked) {
      deleteLike();
    } else {
      track(Event.LIKED_VIDEO, { videoId: videoId });
      createLike();
    }
  };

  return (
    <FeedVideoButton
      name="like"
      count={likeCount}
      onPress={handleLike}
      color={isLiked ? 'red' : 'white'}
    />
  );
};

export default LikeButton;
