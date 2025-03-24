import { useGetChatterPosts } from '@/hooks/queries/useCommunityPosts';
import Explore from '@/screens/Plaza/Explore';
import { FlatList } from 'react-native';
import { View } from 'react-native';

const ExploreScreen = () => {
  const { data, error, isLoading } = useGetChatterPosts();

  if (error) return null;

  const posts = data ?? [];

  // return <FlatList data={posts} />;
  return <Explore />;
};

export default ExploreScreen;
