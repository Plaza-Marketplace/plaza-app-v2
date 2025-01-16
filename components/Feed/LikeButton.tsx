import FeedVideoButton from '../FeedVideoButton';
import { FC } from 'react';
import useCreateVideoLike from '@/hooks/queries/useCreateVideoLike';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useAuth } from '@/contexts/AuthContext';
import useDeleteVideoLike from '@/hooks/queries/useDeleteVideoLike';
import { useGetIsVideoLikedByUser } from '@/hooks/queries/useGetVideoLikes';
import { Event, track } from '@/analytics/utils';

interface LikeButtonProps {
  videoId: Id;
  likeCount: number;
}

const LikeButton: FC<LikeButtonProps> = ({ videoId, likeCount }) => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);
  const { data: isLiked } = useGetIsVideoLikedByUser(videoId, user?.id);

  const { mutate: createLike } = useCreateVideoLike(videoId, user?.id);
  const { mutate: deleteLike } = useDeleteVideoLike(videoId, user?.id);

  return (
    <FeedVideoButton
      name="like"
      count={likeCount}
      onPress={() => {
        if (isLiked) {
          deleteLike();
        } else {
          track(Event.LIKED_VIDEO, { videoId: videoId });
          createLike();
        }
      }}
      color={isLiked ? 'red' : 'white'}
    />
  );
};

export default LikeButton;
