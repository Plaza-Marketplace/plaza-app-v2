import { useLocalSearchParams } from 'expo-router';
import FullPost from '@/screens/FullPost';

const PostModal = () => {
  const params = useLocalSearchParams<{
    postId: string;
  }>();

  return <FullPost id={parseInt(params.postId)} />;
};

export default PostModal;
