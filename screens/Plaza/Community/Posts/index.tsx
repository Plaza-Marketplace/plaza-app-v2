import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import { router } from 'expo-router';
import PressableOpacity from '@/components/Buttons/PressableOpacity';
import { FontAwesome6 } from '@expo/vector-icons';
import Color from '@/constants/Color';
import Spacing from '@/constants/Spacing';
import { Tabs } from 'react-native-collapsible-tab-view';
import Post from '@/components/Community/Post';
import useGetPostsByCommunityId from './useGetPostsByCommunityId';

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

      <PressableOpacity
        style={styles.addButton}
        onPress={() =>
          router.navigate({
            pathname: '/add-post-modal',
            params: { communityId: communityId },
          })
        }
      >
        <FontAwesome6 name="pen-to-square" size={24} color={Color.GREY_100} />
      </PressableOpacity>
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
});
