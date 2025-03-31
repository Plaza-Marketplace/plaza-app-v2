import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import { router } from 'expo-router';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { Tabs } from 'react-native-collapsible-tab-view';
import Post from '@/components/Community/Post';
import useGetPostsByCommunityId from './useGetPostsByCommunityId';
import PlazaButton from '@/components/Buttons/PlazaButton';

interface PostsProps {
  communityId: Id;
}

const Posts: FC<PostsProps> = ({ communityId }) => {
  const {
    data: communityPosts,
    error: postErrors,
    isLoading: postsLoading,
  } = useGetPostsByCommunityId(communityId);
  if (postsLoading) return <Text>Loading...</Text>;
  if (!communityPosts || postErrors)
    return <Text>{`${JSON.stringify(communityPosts)}`}</Text>;

  const handlePress = () => {
    router.push({ pathname: '/create-post', params: { groupId: communityId } });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Color.SURFACE_PRIMARY }}>
      <Tabs.FlatList
        data={communityPosts}
        renderItem={({ item }) => (
          <Post
            title={item.title}
            description={item.description}
            postType={item.postType}
            product={item.product}
            poster={item.poster}
            community={item.community}
            isOnCommunityPage
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      <PlazaButton
        title="Create a Post"
        style={styles.buttonContainer}
        onPress={handlePress}
      />
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: Spacing.SPACING_4,
    right: Spacing.SPACING_4,
    backgroundColor: Color.ICON_PRIMARY,
    padding: Spacing.SPACING_2,
    borderRadius: Spacing.SPACING_2XL,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 16,
    marginBottom: 8,
    alignSelf: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 30 }, // Shadow position
    shadowOpacity: 0.8, // Shadow transparency
    shadowRadius: 50, // Blur radius
  },
});
