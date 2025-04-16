import { useAuth } from '@/contexts/AuthContext';
import CreatePost from '@/screens/Plaza/CreatePost';
import { useLocalSearchParams } from 'expo-router';

const CreatePostScreen = () => {
  const { user } = useAuth();
  const { groupId } = useLocalSearchParams<{ groupId: string }>();

  return <CreatePost groupId={parseInt(groupId)} />;
};

export default CreatePostScreen;
