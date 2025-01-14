import FeedVideoButton from '../FeedVideoButton';
import { FC } from 'react';
import useCreateVideoLike from '@/hooks/queries/useCreateVideoLike';
import useGetUserByAuthId from '@/hooks/queries/useGetUserByAuthId';
import { useAuth } from '@/contexts/AuthContext';
import useDeleteVideoLike from '@/hooks/queries/useDeleteVideoLike';

interface LikeButtonProps {
  videoId: Id;
  likeCount: number;
}

const LikeButton: FC<LikeButtonProps> = ({ videoId, likeCount }) => {
  const { session } = useAuth();
  const { data: user } = useGetUserByAuthId(session?.user.id);

  const { mutate } = useCreateVideoLike(videoId, user?.id);
  const { mutate: deleteLike } = useDeleteVideoLike(videoId, user?.id);

  return <FeedVideoButton name="like" count={likeCount} onPress={mutate} />;
};

export default LikeButton;
